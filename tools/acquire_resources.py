"""仅下载已观察或源码明确引用的公开静态资源；不携带账号凭据。"""
import concurrent.futures, hashlib, json, pathlib, re, urllib.parse, urllib.request
ROOT=pathlib.Path(__file__).resolve().parent.parent
rows=[]
seen={}
manifest=json.loads((ROOT/'asset-manifest.json').read_text())
seeds=[(r['url'],'browser-observed') for r in manifest if r['url'].startswith('https://')]
for filename in ['browser-assets-initial.json']:
 d=json.loads((ROOT/filename).read_text());seeds.extend((r['url'],'browser-inventory') for r in d['assets'] if r['kind'] in ['font','image','stylesheet','script'])
for r in json.loads((ROOT/'analysis-shell/dynamic-dependencies.json').read_text()):seeds.append((r['url'],r['from']))
for filename in ['parent-resource-tree.json','frame-resource-tree.json','frame-resource-tree-after-reload.json']:
 d=json.loads((ROOT/'capture'/filename).read_text())
 def visit(t):
  seeds.append((t['frame']['url'],'resource-tree-document'))
  seeds.extend((r['url'],'resource-tree') for r in t.get('resources',[]))
  for c in t.get('childFrames',[]):visit(c)
 visit(d['frameTree'])
seeds=[(u,s) for u,s in seeds if u.startswith('https://') and '/api/account' not in u and '/telemetry' not in u]
allowed={'claude.ai','assets-proxy.anthropic.com','fonts.frame.claudeusercontent.com','24f1e86e-af9c-437e-98c9-fcbdb46b17f9.frame.claudeusercontent.com'}
def digest(b):return hashlib.sha256(b).hexdigest()
def acquire(item):
 url,source=item;u=urllib.parse.urlsplit(url);url=urllib.parse.urlunsplit((u.scheme,u.netloc,u.path,u.query,''))
 rec={'url':url,'source':source,'method':'anonymous-https'}
 rel='assets/'+u.hostname+u.path+('index.html' if u.path.endswith('/') else '')+('__'+digest(u.query.encode())[:12] if u.query else '')
 rec['path']=rel
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=40) as res:
   b=res.read();rec.update(status=res.status,mimeType=res.headers.get_content_type(),headers={k:v for k,v in res.headers.items() if k.lower() in {'content-security-policy','sourcemap','x-sourcemap','content-type','etag','cache-control'}})
  out=ROOT/rel;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b)
  rec.update(bytes=len(b),sha256=digest(b))
  refs=[]
  if u.path.endswith(('.js','.css')):
   text=b.decode('utf8','replace')
   # 只跟随静态/动态 import、importScripts 和 CSS url 的字面量。
   refs+=re.findall(r'(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*|\bimportScripts\s*\(\s*)[\'\"]([^\'\"]+)[\'\"]',text)
   if u.path.endswith('.css'):refs+=re.findall(r'url\(\s*[\'\"]?([^\s\)\'\"]+)',text)
   for sm in re.findall(r'[#@]\s*sourceMappingURL\s*=\s*([^\s*]+)',text):refs.append(sm)
   if 'sourcemap' in {k.lower() for k in rec.get('headers',{})}:
    refs.extend(v for k,v in rec['headers'].items() if k.lower() in ['sourcemap','x-sourcemap'])
  return rec,[(urllib.parse.urljoin(url,r),url) for r in refs if r.startswith(('./','../','/','https://')) and not r.startswith('//')]
 except Exception as exc:rec['error']=str(exc);return rec,[]
front=seeds
for depth in range(8):
 batch=[]
 for u,source in front:
  p=urllib.parse.urlsplit(u)
  if p.scheme!='https' or p.hostname not in allowed:continue
  key=urllib.parse.urlunsplit((p.scheme,p.netloc,p.path,p.query,''))
  if key in seen:continue
  seen[key]=source;batch.append((key,source))
 if not batch:break
 print('depth',depth,'resources',len(batch),flush=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex:results=list(ex.map(acquire,batch))
 front=[]
 for rec,refs in results:rows.append(rec);front.extend(refs)
 (ROOT/'http-resource-downloads.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 print('success',sum('sha256'in r for r in rows),'failures',sum('error'in r for r in rows),'next references',len(front),flush=True)
 if len(seen)>500:raise RuntimeError('明确依赖图超过500条，先审阅后扩展')
print('finished',len(rows),'bytes',sum(r.get('bytes',0) for r in rows))
