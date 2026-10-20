# 本机实际回放：实现、边界与验证

## 当前入口

- 导航页：http://127.0.0.1:38471/
- 原始完整编辑器 UI：http://127.0.0.1:38471/editor/
- 原始作品叶子回放：http://127.0.0.1:38471/leaf/Composed.dc.html
- 只读运行状态：http://127.0.0.1:38471/__replay/health
- 当前命令会话：`49033`；由主任务继续保持运行。旧会话 53885、40705 均已停止。

启动命令（仓库根）：

```sh
python3 out/dev-sessions/claude-canvas-20261020/replay/server.py --port 38471
```

服务仅绑定 `127.0.0.1`，只接受本机 Host；写请求必须具备同源 Origin 和 JSON Content-Type。所有服务端代码仅用 Python 标准库，无上游 HTTP 客户端，不使用 Claude/Dia 的账号、票据、cookie 或凭据。原 capture 与 project-files 没有改写。

## 为什么能加载原始编辑器

静态审查确定原运行时本身支持文件模式：RHt→uOn 从 `_files.json` 取得文件清单，再读 `project/canvas.json` 和 `.dc.html`；DHe 经平台 artifact/self 的 publish 能力保存文件。它不要求把这份作品转换成编辑器私有 JSON，亦不要求另写画布 UI。

因此回放保留原始 app.js、app.css、dc-runtime.js、fast-edit-worker.js；不重写编辑器组件、属性面板、缩放/布局/选区逻辑。我们只提供宿主缺失的窄能力适配器：

- `claude.user`：固定名称为“本机回放”的假用户，canEdit/data.write/files.write 为真，无真实身份或权限继承。
- `claude.artifact.publish` 与 `claude.self.publish`：接受原文件发布映射，转换为本机 HTTP API。
- sample、db、room、comments、assets、downloads、paste、mcp 等均不可用；未伪造模型、协作、云资产、云导出或数据库服务。
- 文件列表 `_files.json`、读文件和 SHA-256 由本机服务提供；不模拟编辑器内部算法。

独立 agent 已对 adapter/server 做只读审查，确认原 app 的 publish 输入 `{content,contentType,ifMatch}` / null / `{delete:true,ifMatch}` 与输出 `{version,seq,shas,changed}`、冲突 paths.actual/expected 的 shape 相符。原 app 自身再将 raw publish 结果包成 ok 结构，server 不加 ok 是符合此边界的。

## 精确改写与保存位置

详见 `../replay/copy-manifest.json` 和 `../replay/rewrite-manifest.json`。

1. `editor/` 初始复制 `project-files/`；其中 index 使用经公开 manifest SHA 验证的 recovered-index.html，而不是带 Frame 注入段的 HTTP 响应。
2. 仅 `editor/index.html` 改写：head 注入 `/offline-adapter.js` 与中文副本注释；Anthropic Sans 主 URL 与回退 URL 改到已捕获的本机字体；title 标记本机回放副本。原 app script/style 逻辑未改。
3. 新增 `offline-adapter.js` 与 `server.py`、导航页和说明性 manifest。原 app.js/app.css/runtime/worker 逐字相同，已用字节比较核对。
4. 叶子回放原样复制作品 HTML；将完整 dc-runtime.js 原样复制为 leaf/support.js，满足作者文件的相对入口。没有为作品另写渲染器。
5. 编辑后的项目文件只落 `replay/state/project/`；版本与 tombstone 元数据落 `replay/state/state.json`。这是一份本机 overlay：静态原副本与原捕获不变。HTTP GET 优先读 overlay；删除以 tombstone 隐藏文件，历史字节可能仍在 state 目录。
6. 文件写入预先校验全部相对路径，拒绝 `..`、反斜线、绝对路径及符号链接，并检查最终路径落在 state/project。写文件及状态元数据用独占创建的唯一临时文件再 os.replace，避免跟随预存在的临时文件链接而截断原文件。此处是本机单进程文件 mock，不是生产数据库或多人同步服务。

停止服务不会撤销 overlay；重启后可继续读取它。若需完全恢复样本，应先由主任务确认并停止服务，然后只移走本次 `replay/state/`，再启动。当前验收进行中，不自动重置。

## 网络边界

HTTP 响应统一加 CSP：资源、连接、字体、iframe、worker 只允许本机、blob/data 中的必要种类；没有外域 allowlist。adapter 包装 fetch、拦外域 open/anchor/form，并移除 WebSocket/EventSource/WebTransport/WebRTC 等常见连接入口。

这些不是完整断网沙箱：尤其顶层导航、新 realm 或浏览器允许的其他出口不能仅靠 window wrapper 保证隔离。主任务已经在验收浏览器调用 `Network.setBlockedURLs` 阻断 HTTPS/WSS，配合本机 CSP，并检查实际网络。不能把“有 CSP”写成“已证明任意恶意页面无法出网”。本机服务自身没有任何上游请求实现。

## 已完成验证

- `node --check offline-adapter.js` 通过。
- `python3 -m py_compile server.py` 通过。
- 原 editor app.js/app.css/dc-runtime/worker 和叶子 HTML/runtime 的字节一致性检查通过。
- HTTP smoke 12 项通过：主页/editor/清单/JS/叶子均 HTTP 200；以独立 scratch 创建→读回→按 SHA 删除；旧 ifMatch 返回 409 且内容未变；路径穿越返回 400。证据 `../replay/http-smoke.json`。
- 最后一次独占临时文件实现变更后，再做 scratch 创建→读回→删除通过，无遗留 `.replay-*` 临时文件，证据 `../replay/atomic-smoke.json`。两个 scratch 名称为 ReplaySmoke.txt 与 ReplayAtomicSmoke.txt，均已在本机清单中 tombstone 隐藏；不涉及作品正文或 canvas.json。
- 主任务已通过浏览器观察到原始编辑器完整工具栏、真实画板 iframe 和 Properties；从原 UI 将画板宽度 1280 改成 1300，收到 publish 200，并从本机 health / canvas.json 核对持久化。后续 reload、HTML/CSS 编辑和恢复验证由主任务完成并追加最终证据。
- 工作者本人未使用浏览器，未访问远端后端。不要把 HTTP smoke 或前述一次画板宽度保存当成全部编辑功能已验收。

## 尚未验证/未提供

Fast Edit 远端模型、真实多人 presence/冲突同步、云端权限、上传/资产、云端导出、后端数据库均未提供。编辑器本机行为使用原实现；真实 Claude 云端的这些依赖没有被反编译或复刻。后续浏览器结论以主任务的记录为准。
