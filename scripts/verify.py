"""从任意工作目录运行可复现验证；仅依赖 Python 标准库与 Node。"""

from pathlib import Path
import os
import shutil
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]


def main():
    node = shutil.which("node")
    if node is None:
        raise SystemExit("需要 Node.js；CI 使用固定版本，详见 .github/workflows/verify.yml")
    print(f"Python {sys.version.split()[0]}", flush=True)
    subprocess.run([node, "--version"], cwd=ROOT, check=True)
    javascript = [
        "replay/offline-adapter.js",
        "recovered-project/artifact-type/app.js",
        "recovered-project/artifact-type/dc-runtime.js",
        "recovered-project/artifact-type/fast-edit-worker.js",
    ]
    for relative in javascript:
        subprocess.run([node, "--check", str(ROOT / relative)], cwd=ROOT, check=True)
        print(f"语法检查通过：{relative}（未执行）", flush=True)
    environment = {**os.environ, "PYTHONDONTWRITEBYTECODE": "1"}
    subprocess.run(
        [sys.executable, "-B", "-m", "unittest", "discover", "-s", str(ROOT / "tests"),
         "-p", "test_demo_contract.py", "-v"],
        cwd=ROOT, env=environment, check=True,
    )
    print("归档完整性和临时副本 HTTP 保存契约全部通过。", flush=True)


if __name__ == "__main__":
    main()
