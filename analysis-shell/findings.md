# Claude artifact 外壳、启动协议与能力 broker 静态分析

研究对象是公开分享页 `https://claude.ai/artifact/5ZbyQywWA1edfqHDeTtVZJ#page-dcb81aee8d83`。本分析仅处理已经保存到本地的公开浏览器资源：`asset-manifest.json` 中 10 个 `assets-proxy.anthropic.com` JavaScript，以及 `capture/parent-dom.html`、`capture/canvas-dom.html`。使用本仓库 Prettier 解析、排版，未执行被研究的远程 JavaScript，也未主动访问身份、用户数据或私有 API。

本文行号全部指向本目录 `formatted/` 的格式化文件，原始压缩字节和 SHA-256 保留在上级 `asset-manifest.json`。格式化不是恢复原始源码：没有 sourcemap 时，原始 TypeScript、模块路径、变量名、注释和服务器实现不能据此还原。

## 结论与三层边界

这个公开页面明确由三个不同层次组成，不能把全部下载物都称为“画布引擎”。

| 层次 | 实际入口和职责 | 证据 |
| --- | --- | --- |
| Claude 外壳 | `claude.ai/artifact/...`，负责标题、只读提示、分享、登录、导出、能力授权、iframe 生命周期与热替换 | `parent-dom.html:844`，`frame-shell-DhOopBuD.js:7196` |
| 通用 frame runtime 与作品宿主 | UUID 独立 origin 的 `/_f/{version}/`；内联 bootstrap、`/_runtime/*` 能力 SDK、跨窗消息、加载与 ready gates | `canvas-dom.html:13`、`:1894`、`:1930`、`:2324`、`:2643` |
| 具体设计作品与画布程序 | `/_f/1792492624-1f35/artifact-type/app.js`、`app.css`、`dc-runtime.js` 以及作品中嵌入的 HTML 数据 | 路径见上级资源 manifest；其代码由另一分析 owner 深挖 |

外壳自身使用 React 运行时和 Anthropic CDS 组件。`vendor-frame-DaQ5k-Tx.js:3` 有 React 元素符号；`parent-dom.html:16661` 起的标题和 Share 操作是 `data-cds` 组件。画布 app 与外壳是分开的应用和 origin。

## 外壳的启动链路

1. 分享链接的 22 位 Base58 ID 对应作品 UUID。`shared-frame-boot-C59TeSGR.js:184` 的 `Re` 将 128 位 Base58 转成 UUID；`:195` 的 `Um` 接受 UUID、Base58 和 vanity 前缀。当前 DOM 指明 UUID 为 `24f1e86e-af9c-437e-98c9-fcbdb46b17f9`（`parent-dom.html:4`）。
2. HTML 标记构建版本和 runtime pin：build git hash 是 `a2a56f619eb1a67778d11a1e267948ca8fa3cb8c`，runtime pin 是 `manifest.30c3cda2c52db8f1.json`（`parent-dom.html:42`–`:48`）。它从 CDN 以 ES module 加载 `frame-shell-DhOopBuD.js`，预加载 chrome、deferred、broker、shared、vendor 等 chunk（`:844`–`:894`）。文件名及 `rolldown-runtime` 表明这是带内容 hash 的 Rolldown 风格分块；不能据此推断原仓库结构。
3. 外壳 HTML 的内联脚本先发起 boot 请求 `/api/frame/{uuid}?…`（`parent-dom.html:367`），字段包括 `via`、`bk`、`actor=id`、`vt=1`，可能附带现有 org 或有效分享键。请求采用 same-origin credentials、20 秒 timeout 和 `X-Frame-*` 平台/版本/session headers（`:386`–`:402`、`:523`–`:529`）。这里只记录已观察代码中的协议，没有额外调用这些 API。
4. 首次请求结果保存在 `window.__frameBootPrefetch`，模块入口消费同一个 promise（`parent-dom.html:580`；`frame-shell-DhOopBuD.js:7462`），避免重复 boot。嵌入宿主可把已经发起的 boot promise 交给 iframe 使用（`parent-dom.html:536`–`:573`）。`/_warmup` iframe 提前建立资源 origin（`:605`–`:625`）。
5. `frame-shell-DhOopBuD.js:2409` 的 `bo` 构造 `https://{uuid}.frame.claudeusercontent.com/_f/{version}/?__frame_v={runtimePin}`；有令牌时另有 `/_t` 交换、`__frame_t` 查询态及 cookie grant 续约路径。当前公开作品的真实 iframe 是 tokenless：`data-tokened=false`、`data-exchange=false`，实际版本 `1792492624-1f35`，源 URL 保留了 `#page-dcb81aee8d83`（`parent-dom.html:16792`–`:16831`）。作品 hash 是传给内层画布的页面锚点。
6. 挂载流程在 `frame-shell-DhOopBuD.js:4968` 创建 iframe，记录 version/sequence、能力、live mount、翻译和权限姿态；选择 sandbox 和 permissions policy 后加载该 URL。runtime pin 将宿主与内层 runtime 契约钉在同一版本，而作品版本另行变化。

## sandbox 页与 shell 的握手

这条链与下面的 Claude 主宿主 MCP 通道是两回事。

- 内层 DOM 中有 `window.__FRAME_PREAMBLE`，提供版本 1、19 个能力名称（`artifact`/`self` 共用同一个文件），以及 `_transforms`、`_comments`、`_translate`、`_ldx` 文件名（`canvas-dom.html:15`–`:42`）。
- 内层 runtime 的 shell origin 白名单默认是 `https://claude.ai` 与 `https://preview.claude.ai`；`Jt` 验证 origin（`:1894`–`:1911`）。bootstrap 发出无敏感数据的 `{__frame_connect:true}` hello（`:2339`）。
- 外壳接收者 `nn` 先比对 `event.source === iframe.contentWindow` 与 `event.origin === expectedOrigin`（`frame-shell-DhOopBuD.js:5275`），随后发送 `{__frame_init:{contract,changes,flags,capabilities,...}}`，目标 origin 明确（`:5225`）。
- 发给子页的 `capabilities` 是 `Nt` 整理过的配置和有限用户信息，而非 shell 保存的原始 token slots（`:533`–`:639`）。`Rt` 还给 MCP、sample、endpoints、assets 设置调用预算（`:657`–`:707`）。设备能力从授权和声明推导，并非仅依据页面请求开放（`:398`–`:531`）。
- 内层只有在可信 origin 且 init schema 通过后才锁定 shell（`canvas-dom.html:2324`–`:2327`）。随后 `import('/_runtime/'+filename)` 加载获准能力模块（`:1930`）。每个模块安装到受限 boot/context，能力请求使用 `__frame_cap`，返回使用 `__frame_cap_r`（shared schema 见 `shared-frame-CIAC0KKy.js:29032`–`:29066`）。
- ready 不是 iframe 的 load 事件：runtime 要等 DOMContentLoaded、样式与所需能力 gate，再发 `{__frame_ready:true,gate,nav}`（`canvas-dom.html:2619`–`:2653`）。shell 对 connect、ready、alive、layout、load_error、denied 有不同处理（`frame-shell-DhOopBuD.js:5310`–`:5500`）。这解释了壳层 loading/卡住恢复与内容实际渲染分离。
- 可选能力还存在运行期 `__frame_cap_want → __frame_cap_grant`；shell 核作品版本后才授予，附 broker generation（`frame-shell-DhOopBuD.js:3914`–`:3941`；`canvas-dom.html:2516`–`:2568`）。

## HTTP/file broker 的实现

`frame-shell-broker-HUDVMAJS.js` 原始 577,303 bytes，格式化后 32,650 行。入口 `ej`（`:28496`，导出名 `mountBrokered` 在 `:32639` 附近）根据 boot manifest、权限及 token slots 装配各能力消息监听器。它是 RPC/I/O 与权限中介，不是布局或绘制器。

### 统一边界

能力监听器先检查 iframe 仍连接、当前 broker 仍存活/代次有效、`event.origin` 和 `event.source` 完全匹配。例子：`Sh:13585`、`Kh:14251`、`CD:23779`、`wD:23961`、`ED:24154`、`DO:24876`。回包始终使用明确的 frame origin。

热更新并非只替换 HTML。`ww:22127` 增长 generation，清理旧状态、关闭旧 session、abort 未完成操作、关闭听写和 TTS。`:30213`–`:30258` 捕获旧 `brokerGen` 的消息，并明确回“artifact was updated”错误；`:31800`–`:31820` 为已移除能力装配拒绝器；`:31829` 发 `{__frame_cap_rewired:true,caps,brokerGen}`。这防止旧视图的异步完成误写新版本。

### endpoints

`Sh:13533` 的 `endpoints.fetch` 不是任意 URL 的通透代理，而是以 shell 的 same-origin 请求发送至 `POST /api/frame/endpoints/{frameUuid}/call`，body 包含 token 和 `{method,path,query,body}`。`xh:13492` 附近验证：方法只接受 GET/POST/PUT/PATCH/DELETE，path `/` 开头且不含 query/fragment、至多 200 字符，query 至多 32 项和 16 KiB，JSON body 至多 64 KiB，GET 禁 body。没有 token 返回 `capability_disabled`。重复 call ID、cancel、timeout、403 token 更新重试各有独立分支。

### 项目文件

`Kh:13955` 处理 `files.list/read/download`，网络入口是 `POST /api/frame/files/{frameUuid}/{list|read}`，body 附 shell token。它返回文件数据和元信息，不暴露本机路径。

- list 支持 path/recursive/cursor；返回条目的 path、size、directory、createdAt、cursor 经过 `Gh:13936` 验证。
- read（`:14172`）要求非空 path 与非负安全整数 offset/length，单次最多 25 MiB，同时最多两个 read；ArrayBuffer 可转移给 iframe（`:14210`）。
- download（`:14212`）先读 1 byte 获得 size/name/revision，再由 shell 下载 UI 分块读取；文件元信息来自 `X-Frame-File-*` headers（`Wh:13920`）。
- invalid_token 最多 reboot 一次；consent_required、not_granted、decision sequence、撤销、拒绝冷却及 broker 存活状态在实际网络回写前重复核验（`:13985`–`:14108`）。

### Claude 主宿主 MCP 通道

`ff:10383` 是 shell 向自己的父宿主发送 `{__frame_host:true,kind:'hello',v:1}` 的另一条链。它仅接受 `source===parent`、`origin===location.origin`、`kind:'port'`、`v:1` 且恰好一个 MessagePort 的响应（`:10488`–`:10508`），之后通过 port 做 tools/refresh/call/reply/cancel。请求带 slug/server/tool/input/grant/org/activation/consentSeq（`:10580`–`:10596`），端口关闭、timeout 和取消会清理 pending。这条通道不能与跨 origin artifact 子页握手混淆。

## 分享权限与只读

当前公开页 DOM 明确显示 `Read-only`、说明“This view can’t make changes right now.”，Share 按钮 audience 为 public，并显示 Sign in（`parent-dom.html:16703` 起）。这是真实捕获状态，不能据公开分享 URL 推断用户拥有写权限。

只读也不只是隐藏按钮：

- `wD:23958`（导出测试语义名 `wireSelfReadOnly`）对 `self/artifact.edit/publish` 返回 `not_granted`。manifest `publish:false` 使用另一条明确拒绝原因。reader 的 publish HTML 可通知 shell `onReaderPublish`，但 RPC 已先回拒绝，不能当作保存成功（`:24001`–`:24019`）。
- 公共 DB 入口使用 `/api/frame/db/{slug}/public-call`，并给 DB engine 传 `readOnly:true`（`ED:24035`，具体 `:24152`）。`$a.handleVerb:4264` 在只读下拒绝 set/update/delete/acquire，仍允许 get/query/subscribe/unsubscribe。
- `reads` 能力只支持 get/query/subscribe/unsubscribe；每个声明 alias 建独立只读 DB engine（`Qv:16922`、`:17036`）。
- `shared-frame-CIAC0KKy.js:27544` 起有 view/commenter/interact/editor/admin 的可见权限名称与角色映射；commenter 遇到计划只读会降到 view（`:27610`–`:27625`）。权限由多处契约消费，不能只看显示标签。
- `Dh:13702` 的通用授权状态包括 unavailable/denied/granted/prompt，以及 none、per-use-confirm、首次使用询问策略。`DO:24872` 实现 permissions.state/manage/request；用户激活检查还核 shell press、navigator.userActivation 和当前 decision surface（`SO:24825`）。

有写权限的另一分支 `CD:23735` 会请求 `/api/frame/self/{slug}`，队列执行前后重复检查 generation、frame 存活、拓扑和 editing pause。优先 `commitViaReplica`；`set-html` 结构编辑没有 live engine 会回“structure edits need the live engine (not paired)”（`:23866`）。publish 支持 HTML 字符串或被许可的 files object，说明 artifact 的发布事实是 HTML/文件与 live replica，而非直接把 React 组件状态存进后端。

## sandbox、CSP 与安全证据的边界

当前实际 iframe sandbox 是 `allow-scripts allow-same-origin allow-forms allow-pointer-lock`，没有 allow-popups 或 top-navigation；permissions policy 明确列 translator、language-detector、fullscreen、clipboard-write、gamepad、XR 与 screen-wake-lock，referrerPolicy=no-referrer（`parent-dom.html:16815`–`:16826`）。allow-same-origin 作用于独立 UUID 内容 origin，不会把该 iframe 变成 claude.ai 同源。

shell 按声明和授权选择 popup、pointer-lock 等姿态（`frame-shell-DhOopBuD.js:5017`–`:5056`、`:6396`）。隐藏 grant iframe 使用空 sandbox；warmup 使用 allow-same-origin 且不执行脚本（`:2962`、`:4712`）。这些是静态代码与实际 DOM 能确认的边界。

两份 DOM 均没有 Content-Security-Policy meta。代码有 securitypolicyviolation 监听和 blocked runtime 模块诊断（`frame-shell-DhOopBuD.js:1888`；`canvas-dom.html:1972`），但完整 CSP 可能来自 HTTP response header，本文未获得该 header，不能写出或验证完整 script-src/connect-src/frame-ancestors。DOM snapshot 的 script nonce 显示为空，也不能由此推断原 HTTP nonce 策略。

此外，DOM 已被页面运行过程及浏览器扩展改变。`youmind-translate-*`、`youmind-content-root`、`codex-browser-sidebar-comments-root` 等是采集环境注入，不能作为 Claude 官方画布实现。已保存的 DOM 适合观察最终挂载结构；原始脚本资源保留了独立原始字节。

## 按需依赖与 source map

`dynamic-dependencies.json` 记录静态 import 与 `__FRAME_PREAMBLE` 中可确切推出的 URL、来源文件和行号，供主代理继续公开抓取。runtime URL 拼接已由 `canvas-dom.html:1931` 的真实代码证实，并非猜测。

- 外壳另含 10 个尚未在最初 manifest 里的 unique 按需 chunk：5 个 chrome 工具 chunk、2 个 shared chunk、replica/dictate/speak 三个 deferred chunk。chrome/deferred 自身已经在最初 manifest。
- preamble 共 19 个能力名称、18 个 unique 文件；另有 `_transforms/_comments/_translate/_ldx` 4 个通用模块。当前捕获只实际加载了 `_transforms` 和 `_translate`，不能把声明等同于实际用过。
- 本分析范围 10 个 proxy JS 中，没有任何 `sourceMappingURL` 或 `sourceURL` 声明。此结果不等于所有 guessed `.map` 都不存在；未盲扫 sourcemap，也未获得 `SourceMap/X-SourceMap` HTTP headers。
- bundle 保留了 `_test` 对象和部分语义名，例如 wireSelf、wireSelfReadOnly、wireDb、wireDocs、wireAssets、wireSample、wirePermissions、wireMcp、parseSelfFiles、publishAsWriter（broker `:32490` 起）。这些可支持有证据的符号重命名，但不支持声称恢复原始 TS 或后端。

## 本 owner 的交付物

- `formatted/`：10 个 CDN JavaScript 和两份 HTML 的仅排版副本。
- `dynamic-dependencies.json`：37 条引用记录（包含重复 import 与 artifact/self 同文件），可去重后抓取已公开的按需模块。
- 本文：分层、boot、两条 handshake、broker、只读、安全与完整性限制。

未验证层：后端执行、服务器权限/CSP、原始私有仓库、未加载的工具分支及登录后写入流程。所有后端路径只来自静态代码，没有主动调用。公开页面状态及前端能力代理已有直接证据，但不能据此声称平台“全部源码”被恢复。
