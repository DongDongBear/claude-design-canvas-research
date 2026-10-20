"""本机只读发布物 + 隔离项目写入；本次研究新增，不属于 Claude 发布物。"""
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit, unquote
import argparse, base64, hashlib, json, mimetypes, os, tempfile, threading

ROOT = Path(__file__).resolve().parent
EDITOR = ROOT / 'editor'
STATE = ROOT / 'state'
LOCK = threading.RLock()
if STATE.is_symlink():
    raise RuntimeError('拒绝链接形式的回放状态目录')
STATE.mkdir(exist_ok=True)
MANIFEST = STATE / 'state.json'
if MANIFEST.is_symlink():
    raise RuntimeError('拒绝链接形式的回放状态清单')
STORED = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {'seq': 0, 'files': {}, 'deleted': []}
CSP = "default-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; connect-src 'self' blob: data:; img-src 'self' blob: data:; font-src 'self' data:; frame-src 'self' blob: data:; worker-src 'self' blob:; media-src 'self' blob: data:; base-uri 'self'; form-action 'self'; object-src 'none'"

def project_path(name):
    if not isinstance(name, str) or '\\' in name or '\x00' in name:
        raise ValueError('非法路径')
    parts = PurePosixPath(name).parts
    if len(parts) < 2 or parts[0] != 'project' or any(x in ('..', '.', '') for x in name.split('/')):
        raise ValueError('只允许 project/ 内的普通相对路径')
    if name.startswith('/') or len(name) > 300:
        raise ValueError('非法路径')
    return name

def current_bytes(name):
    if name in STORED['deleted']:
        return None
    p = state_path(name) if name in STORED['files'] else EDITOR / name
    return p.read_bytes() if p.is_file() else None

def digest(data):
    return hashlib.sha256(data).hexdigest()

def state_path(name):
    project_path(name)
    target = STATE / name
    cursor = STATE
    for part in PurePosixPath(name).parts:
        cursor = cursor / part
        if cursor.is_symlink():
            raise ValueError('拒绝符号链接路径')
    if not target.resolve().is_relative_to((STATE / 'project').resolve()):
        raise ValueError('回放状态路径越界')
    return target

def atomic_write(target, data):
    target.parent.mkdir(parents=True, exist_ok=True)
    temp = None
    try:
        with tempfile.NamedTemporaryFile(prefix='.replay-', dir=target.parent, delete=False) as stream:
            temp = Path(stream.name)
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, target)
        temp = None
    finally:
        if temp is not None:
            temp.unlink(missing_ok=True)

def file_listing():
    result = {}
    for path in EDITOR.rglob('*'):
        if path.is_file():
            name = path.relative_to(EDITOR).as_posix()
            data = current_bytes(name)
            if data is not None:
                result[name] = {'sha256': digest(data), 'size': len(data), 'contentType': mimetypes.guess_type(name)[0] or 'application/octet-stream'}
    for name, meta in STORED['files'].items():
        if name not in STORED['deleted']:
            data = current_bytes(name)
            if data is not None:
                result[name] = {'sha256': digest(data), 'size': len(data), 'contentType': meta['contentType']}
    return {'ver': 'replay-' + str(STORED['seq']), 'files': result}

class Handler(BaseHTTPRequestHandler):
    def send(self, status, body, kind='application/json; charset=utf-8'):
        if not isinstance(body, bytes): body = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', kind)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Content-Security-Policy', CSP)
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if self.command != 'HEAD': self.wfile.write(body)
    def allowed_host(self):
        return self.headers.get('Host') in {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}
    def do_HEAD(self): self.do_GET()
    def do_GET(self):
        if not self.allowed_host(): return self.send(403, {'error': 'host'})
        path = unquote(urlsplit(self.path).path)
        if any(x == '..' for x in path.split('/')) or '\\' in path or '\x00' in path:
            return self.send(400, {'error': 'path'})
        if path == '/__replay/health':
            with LOCK: return self.send(200, {'offline': True, 'binding': '127.0.0.1', 'seq': STORED['seq'], 'writes': sorted(STORED['files']), 'deleted': STORED['deleted'], 'upstream': False})
        if path == '/editor/_files.json':
            with LOCK: return self.send(200, file_listing())
        if path.startswith('/editor/project/'):
            try:
                name = project_path(path[len('/editor/'):])
                with LOCK: data = current_bytes(name)
                kind = mimetypes.guess_type(name)[0] or 'application/octet-stream'
                return self.send(200, data, kind) if data is not None else self.send(404, {'error': 'missing'})
            except ValueError: return self.send(400, {'error': 'path'})
        if path == '/': path = '/index.html'
        if path == '/editor/': path += 'index.html'
        if not (path in ('/index.html', '/offline-adapter.js', '/copy-manifest.json') or path.startswith('/editor/') or path.startswith('/leaf/')):
            return self.send(404, {'error': 'missing'})
        candidate = (ROOT / path.lstrip('/')).resolve()
        if not candidate.is_relative_to(ROOT) or not candidate.is_file():
            return self.send(404, {'error': 'missing'})
        self.send(200, candidate.read_bytes(), mimetypes.guess_type(candidate.name)[0] or 'application/octet-stream')
    def do_POST(self):
        if not self.allowed_host() or self.headers.get('Origin') != f"http://{self.headers.get('Host')}":
            return self.send(403, {'code': 'not_granted', 'message': '只接受同源本机请求'})
        if self.path != '/__replay/publish' or not self.headers.get('Content-Type', '').startswith('application/json'):
            return self.send(404, {'code': 'not_granted'})
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if length < 1 or length > 24 * 1024 * 1024: raise ValueError('request size')
            request = json.loads(self.rfile.read(length))
            files = request['files']
            if not isinstance(files, dict) or not 1 <= len(files) <= 512: raise ValueError('files')
            changes = {}
            for name, item in files.items():
                project_path(name)
                state_path(name)
                state_path(name + '.replay-tmp')
                if item is None or isinstance(item, dict) and item.get('delete') is True:
                    changes[name] = (None, item)
                else:
                    data = base64.b64decode(item['base64'], validate=True)
                    if len(data) > 16 * 1024 * 1024: raise ValueError('file size')
                    changes[name] = (data, item)
            with LOCK:
                names = sorted(changes)
                for index, name in enumerate(names):
                    if any(other.startswith(name + '/') for other in names[index + 1:]):
                        raise ValueError('同一批次不能同时写祖先路径和后代路径')
                    target = state_path(name)
                    if target.is_dir() or (EDITOR / name).is_dir():
                        raise ValueError('文件目标不能是现有目录')
                    for parent in PurePosixPath(name).parents:
                        if str(parent) in ('.', 'project'):
                            break
                        parent_name = str(parent)
                        state_parent = state_path(parent_name)
                        if (state_parent.exists() and not state_parent.is_dir()) or current_bytes(parent_name) is not None:
                            raise ValueError('文件祖先路径不是目录')
                for name, (_, item) in changes.items():
                    if isinstance(item, dict) and 'ifMatch' in item:
                        old = current_bytes(name)
                        live = digest(old) if old is not None else None
                        if live != item['ifMatch']:
                            return self.send(409, {'code': 'conflict', 'message': '本机文件版本已改变', 'paths': [{'path': name, 'actual': live, 'expected': item['ifMatch']}]})
                shas = {}
                changed = []
                for name, (data, item) in changes.items():
                    target = state_path(name)
                    if data is None:
                        if name not in STORED['deleted']: STORED['deleted'].append(name)
                        STORED['files'].pop(name, None)
                    else:
                        atomic_write(target, data)
                        STORED['files'][name] = {'contentType': item.get('contentType', 'text/plain')}
                        if name in STORED['deleted']: STORED['deleted'].remove(name)
                        shas[name] = digest(data)
                    changed.append({'path': name, 'sha256': shas.get(name)})
                STORED['seq'] += 1
                atomic_write(MANIFEST, json.dumps(STORED, ensure_ascii=False, indent=2).encode())
                return self.send(200, {'version': 'replay-' + str(STORED['seq']), 'seq': STORED['seq'], 'shas': shas, 'changed': changed})
        except (ValueError, TypeError, KeyError) as err:
            return self.send(400, {'code': 'invalid_content', 'message': str(err)[:200]})
    def log_message(self, fmt, *args):
        print('%s %s' % (self.address_string(), fmt % args), flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=38471)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    print(f'Replay listening on http://127.0.0.1:{server.server_port}/ (no upstream)', flush=True)
    server.serve_forever()
