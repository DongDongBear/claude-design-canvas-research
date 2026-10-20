# REA 实际离线分析记录

> GitHub 整理版：以下保留当时运行结果；公开副本已去除机器路径，原始未脱敏记录仅保留本机。大型 JSON 已无损压缩，工具依赖、工具包与重复输入未提交；文件映射和复跑边界见 [ARCHIVE_SCOPE.md](ARCHIVE_SCOPE.md)。Demo 不依赖 REA 安装。

2026-10-20 执行。目标代码仅作为数据解析，未运行 Claude 的 JavaScript，也未调用候选 API。全部输入副本、工具包、依赖、日志及结果位于本目录；产品源码和旁边的 `rea/` clone 未修改。

## 环境与工具身份

- 现有 Node：`v22.22.3`；npm：`10.9.8`；Python：`3.14.7`。
- 实际执行的工具：官方 npm registry 的 `rea-agents@6.7.0`；下载 URL、完整元数据见 `npm-metadata.json`。
- 工具 tarball SHA-256：`20958a66dba1a011e50a486beb9463a343128ed368c984f94065362c13f51f90`。
- 已核对 registry 提供的 SHA-512 integrity：`sha512-yhIx2ioJYYT1C/tONfYeitC6LhnKmCh+ZwRUOgYuhSc733lGhkkt73zhug9WmLgxoMdKuqIYGCoBfD4fXkOhFw==`。
- 研究用 repo clone 的 commit 是 `052956af3416fa01d93837e54fdec3ad2739f6d1`；npm 包元数据没有 `gitHead`，因此不声称这份编译产物等于该 commit。两者即使都声明 6.7.0，也应分开归属。

入口 `scripts/rea.mjs`、prepare hook、CLI JavaScript 运行边界、Darwin helper 的 JS/Swift 源码已读。没有执行 setup、prepare、build、postinstall 或下载的原生可执行文件。依赖用以下命令安装；npm 锁文件记录实际解析结果，152 个非根 package 条目，未见 `hasInstallScript` 条目：

```sh
npm install --ignore-scripts --omit=optional --no-audit --no-fund --registry=https://registry.npmjs.org --cache=.npm-cache > install.stdout.txt 2> install.stderr.txt
```

`@lydell/node-pty` 只存在于未调用的动态导入路径；可选 Frida 未安装。REA 在 macOS 可能用现有 `xcrun/swiftc` 本地编译已审查的进程归属 helper，它不是网络下载的二进制。详见 `execution-audit.json`。

## 真实运行结果

**公共 CLI 已运行，结果存在覆盖缺口；退出码 0 不能解释为全部完成。**

| 运行 | 输入与资源 | 结果 | 原始 stdout |
| --- | --- | --- | --- |
| `canvas-analysis` | app、dc-runtime、fast-edit-worker；默认 1 GiB heap、每源 120s | 3 文件中仅 fast-edit-worker 完成；app/dc-runtime heap 耗尽；coverage partial | 49,149,615 字节 |
| `shell-analysis` | 22 个 shell JS；默认 1 GiB heap、每源 120s | 21 文件完成，vendor-frame heap 耗尽；911,075 AST 节点；coverage partial | 213,123,167 字节 |
| `canvas-retry4096` | 精确选择 app、dc-runtime；4 GiB heap、每源 120s | 两源仍在静态语义分析耗尽 heap；保留 failure Evidence | 75,238 字节 |
| `shell-retry4096` | 精确选择 vendor-frame；4 GiB heap、每源 120s | 仍在静态语义分析耗尽 heap；保留 failure Evidence | 367,955 字节 |
| `syntax-fallback` | REA 已发布 parser/traversal 原语；2 GiB Node heap | 三个失败源均完整解析且无语法错误；只声明语法事实 | 另见 syntax-summary.json |

公共 CLI Evidence ID：

- canvas 首轮：`ev_495ef02c75752a822fb82b0d78e67791784f98c208e0745f13b328abe33a36c5`。
- shell 首轮：`ev_242c2b1b86ce32fbb1eface19c18c6951c38e93c509e09f317bdaa1a7c402be0`。
- canvas 4 GiB 重试：`ev_5583226495a81614caad62a91e32c202f0f135338973e2551e8fa6452058a506`。
- vendor 4 GiB 重试：`ev_10f989dcb1aad6a9f9ec6f4ab4ede0c4b0928c1783dccd58b6c07ebaccfcfdb1`。

`*.stdout.json` 是工具原始输出；`*.stderr.txt` 是原始进度和诊断；每个 `*.run.json` 记录 argv、工作目录、起始 UTC、耗时、退出码、环境覆盖、输出长度与 SHA-256。`inputs-manifest.json` 记录每份输入来源和内容哈希。

## 在语义分析失败后保留可用事实

没有无限增加 heap。改为直接使用 npm 包中的 `parseJavaScriptSource`、`traverseJavaScriptAst` 两个 REA 原语，跳过发生资源爆炸的静态语义绑定阶段。实现见 `rea-syntax-fallback.mjs`；这不是公共 CLI Evidence，输出已标注 `analysis_kind: syntax-only-fallback-not-public-cli-evidence`，不会与完整 application graph 混为一谈。

| 文件 | 字节数 | AST 节点 | parse errors | 用时 |
| --- | ---: | ---: | ---: | ---: |
| app.js | 4,153,993 | 1,123,046 | 0 | 0.68s |
| dc-runtime.js | 187,897 | 61,034 | 0 | 0.08s |
| vendor-frame-DaQ5k-Tx.js | 511,958 | 168,255 | 0 | 0.10s |

`syntax-*.json` 记录语法层的 import/export、class、关键调用、相关字面量、大型内嵌字符串身份，均带原文件 UTF-16 offset、行号和 UTF-16 列号。例：dc-runtime 原文件第 350 行可观察到 `window.parent.postMessage` 的 `__dc_booted` 消息，以及 `message` listener 对 `__dc_theme`、`__dc_probe` 的分支。这里只证明源文本中存在这些语法，运行时协议是否发生仍由主代理浏览器证据确认。

## 有用输出入口

- `results-summary.json`：四次公共 CLI 输出的统计、coverage、未知项，以及模块/存储/URL 形状候选的投影。
- `shell-observed-exports.tsv`：shell 首轮 1,011 条观察到的 ESM export-binding，保留模块、导出名、压缩后本地名、原行列与 node ID。
- `high-value-observations.json`：29 条与 Artifact、session、file、frame、replica 等相关的导出绑定及 9 条 URL 形状 endpoint 候选。包含 `createArtifactSession`、`fetchArtifactSessions`、`getArtifactSession`、`saveShellFile`、`LiveReplica`、`openReplica` 等可读名称，可用来定位原文件。
- `syntax-summary.json` 与 `syntax-app.js.json`、`syntax-dc-runtime.js.json`、`syntax-vendor-frame-DaQ5k-Tx.js.json`：fallback 语法结果。
- `cli-help.txt`：实际工具版本的 CLI 参数说明。

统计中的 `modules: 0` 指未恢复出 bundler factory table，不表示没有 ESM。shell graph 有 1,038 个 `javascript-module` 节点，其中也包括导出符号；不能写成“1,038 个独立源码模块”。

REA 对 `.get("...")`、`.post("...")` 等未绑定调用可能产生低置信 endpoint 候选，首轮甚至包含 DOM 事件属性名。因此这里没有将 endpoint 数量解释为真实 API 数量。URL 形状候选也仍需对应代码及浏览器请求佐证。

## 复跑

```sh
python3 run-analysis.py
python3 summarize-results.py
```

主脚本重跑两次首轮分析并覆盖相应日志；4 GiB 重试及 syntax fallback 的精确原始命令已逐次写在对应 `.run.json` 的 `argv`，可按数组使用 Python `subprocess.run` 复现。不要运行任何下载的目标 JS。首次下载、registry integrity 校验及安全解包的身份结果由 `npm-metadata.json`、tgz 与 execution audit 保留；依赖可按本目录 package-lock 用 `npm ci --ignore-scripts --omit=optional` 重建。
