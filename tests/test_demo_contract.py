"""验证归档字节与本机保存契约；不启动浏览器或执行下载的 JavaScript。"""

import base64
import hashlib
import http.client
import json
import os
from pathlib import Path, PurePosixPath
import queue
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest


ROOT = Path(__file__).resolve().parents[1]


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def contained_file(root, relative):
    parts = PurePosixPath(relative).parts
    if not parts or relative.startswith("/") or ".." in parts or "\\" in relative:
        raise AssertionError(f"清单路径越界：{relative}")
    path = root / relative
    if not path.resolve().is_relative_to(root.resolve()) or path.is_symlink():
        raise AssertionError(f"清单路径不是普通归档文件：{relative}")
    return path


def tree_snapshot(root):
    return {
        path.relative_to(root).as_posix(): (
            ("symlink", os.readlink(path)) if path.is_symlink()
            else ("file", sha256(path.read_bytes()))
        )
        for path in root.rglob("*") if path.is_symlink() or path.is_file()
    }


class DemoContractTests(unittest.TestCase):
    def setUp(self):
        if not self._testMethodName.startswith("test_http_"):
            return
        temporary = tempfile.TemporaryDirectory(prefix="canvas-demo-contract-")
        self.addCleanup(temporary.cleanup)
        self.sandbox = Path(temporary.name)
        self.replay = self.sandbox / "replay"
        shutil.copytree(
            ROOT / "replay", self.replay, symlinks=True,
            ignore=shutil.ignore_patterns("state", "__pycache__", "*.png", "browser-*"),
        )
        self.process = None
        self.reader = None
        self.addCleanup(self._stop_server)
        self._start_server()

    def _start_server(self):
        output = queue.Queue()
        self.process = subprocess.Popen(
            [sys.executable, "-B", "server.py", "--port", "0"],
            cwd=self.replay, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            text=True, encoding="utf-8",
        )
        process = self.process

        def collect_output():
            for line in process.stdout:
                output.put(line.rstrip())
            output.put(None)

        self.reader = threading.Thread(target=collect_output, daemon=True)
        self.reader.start()
        line = output.get(timeout=10)
        match = re.fullmatch(
            r"Replay listening on http://127\.0\.0\.1:(\d+)/ \(no upstream\)", line or ""
        )
        self.assertIsNotNone(match, f"临时服务启动失败：{line}")
        self.port = int(match.group(1))
        self.origin = f"http://127.0.0.1:{self.port}"
        status, body, _ = self._request("GET", "/__replay/health")
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body)["upstream"], False)

    def _stop_server(self):
        process = self.process
        if process is not None:
            if process.poll() is None:
                process.terminate()
                try:
                    process.wait(timeout=3)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait(timeout=3)
            self.reader.join(timeout=1)
            process.stdout.close()
            self.process = None

    def _request(self, method, path, body=None, headers=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.port, timeout=5)
        try:
            connection.request(method, path, body=body, headers=headers or {})
            response = connection.getresponse()
            return response.status, response.read(), dict(response.getheaders())
        finally:
            connection.close()

    def _publish(self, files, *, origin="default", host=None):
        headers = {"Content-Type": "application/json"}
        if origin == "default":
            headers["Origin"] = self.origin
        elif origin is not None:
            headers["Origin"] = origin
        if host is not None:
            headers["Host"] = host
        return self._request(
            "POST", "/__replay/publish", json.dumps({"files": files}).encode(), headers
        )

    def _snapshot(self):
        health_status, health, _ = self._request("GET", "/__replay/health")
        listing_status, listing, _ = self._request("GET", "/editor/_files.json")
        self.assertEqual((health_status, listing_status), (200, 200))
        return tree_snapshot(self.replay), json.loads(health), json.loads(listing)

    @staticmethod
    def _file(data, **options):
        return {"base64": base64.b64encode(data).decode(), "contentType": "text/plain", **options}

    def test_archive_recovered_files_match_public_manifest(self):
        recovered = read_json(ROOT / "recovered-project-manifest.json")
        candidates = list((ROOT / "dia/resources").glob("*.frame.claudeusercontent.com/_f/*/_files.json"))
        self.assertEqual(len(candidates), 1, "必须唯一定位捕获的公开文件图")
        public = read_json(candidates[0])["files"]
        self.assertEqual(len(public), 22)
        self.assertEqual(len(recovered), 22)
        indexed = {}
        for item in recovered:
            self.assertTrue(item["path"].startswith("recovered-project/"))
            relative = item["path"][len("recovered-project/"):]
            self.assertNotIn(relative, indexed)
            indexed[relative] = item
        actual = {path.relative_to(ROOT / "recovered-project").as_posix()
                  for path in (ROOT / "recovered-project").rglob("*") if path.is_file()}
        self.assertEqual(set(indexed), set(public))
        self.assertEqual(actual, set(public))
        for relative, expected in public.items():
            with self.subTest(path=relative):
                data = contained_file(ROOT, indexed[relative]["path"]).read_bytes()
                self.assertEqual(len(data), expected["size"])
                self.assertEqual(sha256(data), expected["sha256"])
                self.assertEqual(indexed[relative]["bytes"], expected["size"])
                self.assertEqual(indexed[relative]["sha256"], expected["sha256"])

    def test_archive_copy_manifest_is_complete_and_byte_exact(self):
        records = read_json(ROOT / "replay/copy-manifest.json")
        indexed = {}
        for item in records:
            self.assertNotIn(item["path"], indexed)
            indexed[item["path"]] = item
        actual = {path.relative_to(ROOT / "replay").as_posix()
                  for folder in ("editor", "leaf")
                  for path in (ROOT / "replay" / folder).rglob("*") if path.is_file()}
        self.assertEqual(set(indexed), actual)
        for relative, item in indexed.items():
            with self.subTest(path=relative):
                data = contained_file(ROOT / "replay", relative).read_bytes()
                self.assertEqual(len(data), item["bytes"])
                self.assertEqual(sha256(data), item["sha256"])
                if "source" in item:
                    self.assertEqual(data, contained_file(ROOT, item["source"]).read_bytes())
                elif item["kind"] == "unchanged-copy":
                    original = "recovered-project/" + relative.removeprefix("editor/")
                    self.assertEqual(data, contained_file(ROOT, original).read_bytes())

    def test_archive_rewrite_manifest_preserves_declared_originals(self):
        manifest = read_json(ROOT / "replay/rewrite-manifest.json")
        index = manifest["editorIndex"]
        source = contained_file(ROOT, index["source"]).read_bytes()
        output = contained_file(ROOT, index["output"]).read_bytes()
        self.assertEqual(sha256(source), index["sourceSha256"])
        self.assertEqual(sha256(output), index["outputSha256"])
        source_body = re.search(rb"<body\b[\s\S]*", source, re.IGNORECASE)
        output_body = re.search(rb"<body\b[\s\S]*", output, re.IGNORECASE)
        self.assertIsNotNone(source_body)
        self.assertIsNotNone(output_body)
        self.assertEqual(source_body.group(), output_body.group())
        self.assertIn(b'/offline-adapter.js', output)
        for relative in manifest["sharedOriginalsUnchanged"]:
            original = "recovered-project/" + relative.removeprefix("editor/")
            self.assertEqual(contained_file(ROOT / "replay", relative).read_bytes(),
                             contained_file(ROOT, original).read_bytes())
        for relative in manifest["newAdapters"]:
            self.assertTrue(contained_file(ROOT / "replay", relative).is_file())
        leaf = manifest["leaf"]
        self.assertTrue(leaf["sourceUnchanged"])
        self.assertEqual(contained_file(ROOT, leaf["source"]).read_bytes(),
                         contained_file(ROOT, leaf["output"]).read_bytes())
        alias = leaf["supportAlias"]
        self.assertTrue(alias["byteIdentical"])
        self.assertEqual(contained_file(ROOT, alias["source"]).read_bytes(),
                         contained_file(ROOT, alias["output"]).read_bytes())

    def test_http_save_readback_listing_and_restart(self):
        name = "project/canvas.json"
        original = (self.replay / "editor" / name).read_bytes()
        replacement = b'{"contractFixture":true}\n'
        status, body, _ = self._publish({name: self._file(replacement, ifMatch=sha256(original))})
        self.assertEqual(status, 200)
        result = json.loads(body)
        self.assertEqual(result["seq"], 1)
        self.assertEqual(result["shas"][name], sha256(replacement))
        self.assertEqual((self.replay / "state" / name).read_bytes(), replacement)
        self.assertEqual((self.replay / "editor" / name).read_bytes(), original)
        self.assertEqual(self._request("GET", "/editor/" + name)[:2], (200, replacement))
        status, listing, _ = self._request("GET", "/editor/_files.json")
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(listing)["files"][name]["sha256"], sha256(replacement))
        self._stop_server()
        self._start_server()
        self.assertEqual(self._request("GET", "/editor/" + name)[:2], (200, replacement))

    def test_http_conflict_rejects_entire_batch_without_writing(self):
        before = self._snapshot()
        status, body, _ = self._publish({
            "project/new.txt": self._file(b"must not land", ifMatch=None),
            "project/canvas.json": self._file(b"must not land", ifMatch="0" * 64),
        })
        self.assertEqual(status, 409)
        self.assertEqual(json.loads(body)["code"], "conflict")
        self.assertEqual(self._snapshot(), before)

    def test_http_create_delete_and_absence_preconditions(self):
        name, data = "project/contract-fixture.txt", b"contract fixture\n"
        self.assertEqual(self._publish({name: self._file(data, ifMatch=None)})[0], 200)
        before = self._snapshot()
        self.assertEqual(self._publish({name: self._file(b"duplicate", ifMatch=None)})[0], 409)
        self.assertEqual(self._snapshot(), before)
        self.assertEqual(self._publish({name: {"delete": True, "ifMatch": sha256(data)}})[0], 200)
        self.assertEqual(self._request("GET", "/editor/" + name)[0], 404)
        self._stop_server()
        self._start_server()
        self.assertEqual(self._request("GET", "/editor/" + name)[0], 404)

    def test_http_invalid_project_paths_leave_files_unchanged(self):
        paths = ["../escape.txt", "project/../../escape.txt", "/project/escape.txt",
                 "project/../escape.txt", "project\\escape.txt", "project//escape.txt",
                 "project/./escape.txt", "artifact-type/app.js", "project/\x00escape"]
        before = self._snapshot()
        for name in paths:
            with self.subTest(path=name):
                status, _, _ = self._publish({
                    "project/valid-but-rejected.txt": self._file(b"must not land"),
                    name: self._file(b"must not land"),
                })
                self.assertEqual(status, 400)
                self.assertEqual(self._snapshot(), before)

    def test_http_conflicting_ancestor_paths_leave_files_unchanged(self):
        batches = [
            {"project/probe": self._file(b"parent"), "project/probe/child.txt": self._file(b"child")},
            {"project/probe/child.txt": self._file(b"child"), "project/probe": self._file(b"parent")},
            {"project/valid-but-rejected.txt": self._file(b"valid"),
             "project/canvas.json/child.txt": self._file(b"invalid ancestor")},
        ]
        before = self._snapshot()
        for batch in batches:
            with self.subTest(paths=list(batch)):
                self.assertEqual(self._publish(batch)[0], 400)
                self.assertEqual(self._snapshot(), before)

    def test_http_foreign_origin_and_host_do_not_mutate_files(self):
        before = self._snapshot()
        cases = [("https://example.invalid", None), (None, None),
                 (f"http://127.0.0.1:{self.port + 1}", None),
                 (f"https://127.0.0.1:{self.port}", None),
                 (f"http://localhost:{self.port}", None),
                 (self.origin, f"localhost:{self.port}"),
                 (self.origin, f"example.invalid:{self.port}")]
        for origin, host in cases:
            with self.subTest(origin=origin, host=host):
                self.assertEqual(self._publish({"project/no.txt": self._file(b"rejected")},
                                               origin=origin, host=host)[0], 403)
                self.assertEqual(self._snapshot(), before)

    def test_http_traversal_and_state_routes_are_unavailable(self):
        before = self._snapshot()
        for path in ("/editor/project/%2e%2e/%2e%2e/server.py",
                     "/editor/project/a%5cb", "/editor/project/a%00b"):
            with self.subTest(path=path):
                self.assertEqual(self._request("GET", path)[0], 400)
        for path in ("/server.py", "/state/state.json", "/__replay/unknown"):
            with self.subTest(path=path):
                self.assertEqual(self._request("GET", path)[0], 404)
        self.assertEqual(self._request("GET", "/__replay/health", headers={"Host": "example.invalid"})[0], 403)
        self.assertEqual(self._snapshot(), before)


if __name__ == "__main__":
    unittest.main(verbosity=2)
