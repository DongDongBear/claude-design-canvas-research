#!/usr/bin/env python3
"""使用现有 Node 运行隔离安装的 REA；目标 JavaScript 只作为分析数据。"""
import datetime
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import time

ROOT = Path(__file__).resolve().parent
CAPTURE = ROOT.parent
CLI = ROOT / "npm-package/package/scripts/rea.mjs"

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def run(name, args, timeout=420):
    env = os.environ.copy()
    env.update({"TMPDIR": str(ROOT / "tmp"), "XDG_CACHE_HOME": str(ROOT / "cache"),
                "HUSKY": "0", "npm_config_ignore_scripts": "true"})
    for path in [ROOT / "tmp", ROOT / "cache"]:
        path.mkdir(exist_ok=True)
    start = time.monotonic()
    record = {"name": name, "argv": args, "cwd": str(ROOT),
              "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "env_overrides": {k: env[k] for k in ["TMPDIR", "XDG_CACHE_HOME", "HUSKY", "npm_config_ignore_scripts"]}}
    with (ROOT / f"{name}.stdout.json").open("wb") as stdout, (ROOT / f"{name}.stderr.txt").open("wb") as stderr:
        try:
            r = subprocess.run(args, cwd=ROOT, env=env, stdout=stdout, stderr=stderr,
                               timeout=timeout, check=False)
            record["exit_code"] = r.returncode
        except subprocess.TimeoutExpired:
            record["exit_code"] = None
            record["orchestration_timeout_seconds"] = timeout
    record["duration_seconds"] = time.monotonic() - start
    for stream in ["stdout.json", "stderr.txt"]:
        p = ROOT / f"{name}.{stream}"
        record[stream] = {"path": str(p), "bytes": p.stat().st_size, "sha256": sha256(p)}
    (ROOT / f"{name}.run.json").write_text(json.dumps(record, indent=2) + "\n")
    print(json.dumps(record), flush=True)

if __name__ == "__main__":
    inputs = {
        "canvas": [CAPTURE / "project-files/artifact-type/app.js",
                   CAPTURE / "project-files/artifact-type/dc-runtime.js",
                   CAPTURE / "project-files/artifact-type/fast-edit-worker.js"],
        "shell": sorted((CAPTURE / "assets/assets-proxy.anthropic.com/claude-ai/v2/assets/v1").glob("*.js")),
    }
    manifest = []
    for name, files in inputs.items():
        dest = ROOT / f"inputs-{name}"
        dest.mkdir(exist_ok=True)
        for source in files:
            target = dest / source.name
            shutil.copyfile(source, target)
            assert sha256(source) == sha256(target)
            manifest.append({"group": name, "source": str(source), "path": str(target),
                             "bytes": target.stat().st_size, "sha256": sha256(target)})
    (ROOT / "inputs-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    run("canvas-analysis", [shutil.which("node"), str(CLI), "analyze-javascript-application",
                            str(ROOT / "inputs-canvas"), "--analysis-timeout-ms", "120000",
                            "--format", "json", "--full-output"])
    run("shell-analysis", [shutil.which("node"), str(CLI), "analyze-javascript-application",
                           str(ROOT / "inputs-shell"), "--analysis-timeout-ms", "120000",
                           "--format", "json", "--full-output"])
