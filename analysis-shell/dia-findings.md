# Dia 登录编辑态补充：权限、runtime SDK 与保存架构

输入仅为主代理提供的已脱敏 `dia/resource-manifest.json`、`dia/dia-editing-initial.har` 及对应资源。没有访问网络、没有执行远程脚本、没有寻找或输出凭据；本文仅记录协议字段名、能力与代码。新 runtime 脚本按原文件名排版到本目录 `formatted/`，本文 JS 行号对应这些排版文件。HAR entry 索引从 0 开始。

## 最重要的新证据

登录编辑态没有换一套画布 JavaScript。对 `dia/resource-manifest.json` 里的 JS/CSS 与公开抓取目录 `assets/` 的原始字节逐个重新计算 SHA-256，**25 个唯一文件全部一致，0 个缺失、0 个不同**：10 个 shell/CDN 文件、12 个 frame runtime 文件、app.js、app.css、dc-runtime.js。其中 15 个在最初公开页面已经实际加载，另外 10 个 runtime 是后来从公开静态 URL 归档的；后者“能公开下载”不等于未登录页面会安装或获准调用。

真正变化在 boot 下发的权限、能力及安装路径。登录态有直接 boot JSON 和 HTTP CSP，新证据可填补第一份报告中“未拿到响应 header”的限制。

## 公开页与 owner 页差异表

| 项目 | 最初公开页面证据 | Dia owner 编辑态直接证据 |
| --- | --- | --- |
| 分享状态 | Share 的 audience=public，显示 Read-only 与 Sign in | `/perm/mode="public"`，`/perm/write/mode="owner"`；公开分享与 owner 身份可以同时成立 |
| 当前 viewer | 只读提示；未取得公开态 boot JSON，不能补造其 kind/role | `/kind="authed"`，`/perm/role="owner"`，`/viewer/owner=true`，`/viewer/can_edit=true`，`/viewer/role="owner"` |
| host mode | 公开 DOM 不足以确定 | boot 无顶层 `mode` 字段；`perm.mode` 是分享模式，不能写成 external 或 runtime mode |
| 作品版本 | iframe `1792492624-1f35`，data-seq=10 | `/ver="1792492624-1f35"`、`/seq=10`、`/live` 同版本；`/history` 有 10 个版本 |
| runtime | pin `manifest.30c3cda2c52db8f1.json` | `/runtime/contract="0.2.47"`，`/runtime/stamped="partial"`；功能变化由 changes 列表声明 |
| 内容类型与实例 | 路径含 artifact-type/app.js 和两个 project 文件 | `/typeInstance=true`、`/typeFacts/typeFirstParty=true`；type current/latest=`1792475633-247f` |
| SDK 实际加载 | `_transforms`、`_translate` | 再加载 artifact/assets/comments/db/downloads/room/sample/user/permissions 和 `_comments` |
| 声明能力 | 公开初始 DOM 的 usable=[]，没有能力 SDK 请求 | boot 有 9 项 capability 声明；8 项非 optional，paste optional；permissions 由 shell 的 contract 兼容层补入 |
| 同步连接 | 原始公开 resource tree 未见该连接 | HAR entry 32：`wss://claude.ai/api/frame/sync?slug=…`，HTTP 101；`syncClient=true`、`sessionsOnSync=true`、`syncIdleHiddenMs=300000` |
| 写入与验收 | 只读 broker 明确拒绝 edit/publish，public DB readOnly | boot 允许 owner 编辑；但本次 HAR 全部 38 项是 GET（含 WebSocket 握手），没有保存 POST、写入 ACK 或 WebSocket message body，不能宣称实际保存成功 |

boot 证据文件：`dia/resources/claude.ai/api/frame/24f1e86e-af9c-437e-98c9-fcbdb46b17f9__15d8a5d59c6b`。上表以 JSON pointer 指向字段；未摘录身份值。

## 实际能力契约

| boot capability | config / policy | 已加载 SDK 与结论 |
| --- | --- | --- |
| artifact | 空 config；none | 同一对象挂到 artifact/self；metadata、edit、publish、sync |
| assets | 空 config；none | upload、list、delete；返回 `/_blob/{id}` 相对资源 URL |
| comments | composer_only=true、customAnchors=true；none | 画布可实现自己的锚点和 pin，通用 SDK 负责与 shell 评论系统对接 |
| db | stream=true、offline=true；none；visible poll 30 秒、hidden 300 秒；maxStreams=64、maxFilters=10、maxLimit=1000、maxDocuments=25000 | Firestore 风格 doc/collection API，底层 RPC 与 snapshot delta |
| downloads | per-use-confirm | save；用户确认由 shell 完成 |
| paste | optional=true；per-use-confirm | 初始 HAR 未加载 paste SDK，不能说已经可用 |
| room | maxBytes=4096、presenceHz=30、keepalive=20 秒、silence=150 秒、maxPeers=256、maxRooms=16；none | presence、rooms、events、向 Claude 发上下文 |
| sample | max tools=16、models=true；prompt-at-first-use | LLM 调用、JSON、流式文本、页面 tools、取消与限额 |
| user | scopes=[profile]；none | ID/owner/edit/can 与 profile directory API；email 未获 scope |
| permissions（补入） | `/permissionsEnabled=true`，runtime contract 可用 | state、request、manage。并非 boot 原始 capabilities 中的第十项声明 |

该表中的 none/prompt/per-use 是页面能力策略，不代表绕过服务器权限或浏览器设备授权。viewer 另有 `can=[assets.write,data.write,files.write]`，不能把 owner 的 canEdit 等同于所有能力都无条件开放。

permissions 补入来自 `frame-shell-DhOopBuD.js:355` 的最低 contract 声明，以及 `:611` 的 `Nt`。这解释了 boot capabilities 只有 9 项，实际却加载 permissions 的差异。

## 文件图：引擎继承与作品实例

HAR entry 21 的 `/_f/1792492624-1f35/_files.json` 返回当前作品版本和 **22 个文件**的 path→sha256/size/contentType 索引；boot `/files` 也有 22 项，二者一致。

其中 boot 有 20 项带 `src.slug/src.ver`，指向第一方 artifact type 版本 `1792475633-247f`：SKILL.md、index.html、app.js/app.css、dc-runtime.js、fast-edit-worker.js、图标字体、reference 文档与字体索引、thumbnail 配置。仅 `project/Composed.dc.html`（23,876 bytes）与 `project/canvas.json`（447 bytes）不带 src，是这个实例自己的文件。

因此 `_files.json` 不是原始前端工程的完整目录，也不是所有 HTTP 资源列表，而是合成作品的可见文件图。`artifact-type/*` 是复用的设计工具包，`project/*` 是用户作品。index.html 的文件图 size=34,176，HAR 中服务后的 frame HTML=74,624 bytes（304/缓存重验证条目），两者不能直接当成哈希冲突：服务器响应还注入了通用 frame runtime 和 preamble；真实比较应在同一层和相同字节对象上做。

HAR entry 33/34 两次读取 canvas.json，entry 35 读取 Composed.dc.html，entry 36 加载 dc-runtime.js。作品 HTML 以 text/plain 返回，响应 CSP 为 `default-src 'none'; frame-ancestors 'none'; sandbox`，这说明源文件读取得到的是数据，不是直接在该 HTTP 响应上执行的网页。内层 app 再把作品放到受控运行环境中；该细节与另一个 owner 的画布运行时分析互证。

## 保存链路：artifact SDK 与 shell replica

`artifact.C83eZcTi.js` 的 `install=Nc` 在 `:6355`；`:6382` 把所有调用封成 `__frame_cap` 的 cap=artifact、id、method、args，通过 shell 端口发出，并盖 broker generation。`:6548` 将同一个对象安装到 artifact 和 self。公开对象只有四个 API：**metadata、edit、publish、sync**，没有公开 snapshot API；不要凭普通编辑器经验补造方法。

- metadata（`:6434` 附近）接受 ID/URL 集合，批量查标题与类型，失败保留可解析 ID 的空元信息。
- publish（`:6507`）支持 HTML 字符串或经 `Al:387` 验证的 files object：最多 256 个路径，可用 string/Blob、`{content,contentType,ifMatch}`、null 删除或 `{delete:true,ifMatch}`；ifMatch 是现有文件 SHA-256，null 表示必须不存在。boot 也明确 `/publishPreconditions=true`。这是文件级并发前置条件，不能直接把内存中旧文件覆盖当作合格保存。`publish:false` 会在 SDK 内拒绝（`:6472`–`:6492`），shell 也再次检查。
- edit（`:6512`）先 structuredClone，进入 `pageEdit` 的 optimistic/落地回调；成功 landed，失败 refused，不把本地 DOM 已变误作保存成功。
- sync（`:6537`）接受函数，追踪这个函数中引起的 DOM 更改。`vc:2577` 是同步区域、DOM 索引和 mutation 引擎；live doc 可给 body 默认 artifact-sync（`:4613`），MutationObserver 在 `:4642`；一次编辑批最多 32 ops（常量 `:2217`，组批 `:5324` 起）。
- `Ua:5259` 使用固定 idempotencyKey 重试提交，区分 conflict、invalid_content、rate_limited、in-doubt；冲突和限流采用有限次重试，不能把超时当成功。
- `ya:3829` 处理 live replica 的 pair/own/patches；它与 shell 的 live engine 配合，而不是每个用户输入都重新发布整个 HTML。

同步区域的事实也可直接恢复：`artifact-sync` 表示共享持久化 markup，`artifact-local` 表示页面脚本派生/临时区域，`artifact-sync-state="off"` 表示停止捕获，`data-id` 是稳定编辑标识（`:2208` 起）。`Pe:3442` 区分可信手势、显式 sync、页面派生脚本的 mutation。脚本向共享区写入无 server ID 的元素会将区域置 off，发 `claude:sync-dropped`（`:4595` 附近）；因此不能把“MutationObserver 看到了”直接等同于可保存或持久化所有 DOM。

`sync(fn)` 在执行前后消费 mutations，并 await 相关保存；失败会抛“the changes were not saved”错误（`:6217`–`:6247`）。结构 `set-html` 先在独立 HTMLDocument 中 clone、清理临时和不允许节点/属性（`Ii:5023`），不是 document.outerHTML 全量上传。

live replica 配对消息 `__frame_replica_pair.nodes` 包含 `{id,kind,tag,dataId?,text?,children}`，validator 最多遍历 200,000 nodes（`ll:206`）；真实 DOM 与 engine node 的映射在 `Bl:1740`。`__frame_replica_pair_subtree` 支持增量配对；`__frame_replica_own` 接收自己的已落地编辑；`__frame_replica_patches` 按 seq 应用别人修改，旧 seq 忽略，失败 unpair 并发 `__frame_patch_miss`。精确 patch 支持 text splice、set/del-attr、remove、insert/移动（`ql:1230`），不能安全应用时要求重配对。这是可证实的 DOM replica 协议，仍不等同于已识别后端合并算法。

shell 保存职责仍在之前的 broker `CD:23735`：有写权限时请求 `/api/frame/self/{slug}`，串行检查 frame/generation/edit pause/拓扑；优先 `commitViaReplica`，结构 set-html 缺 live engine 会明确拒绝。`frame-shell-deferred-Br0hC66Q.js:8724` 的 `om` 提供实际 replica transport：

```text
GET  /api/frame/doc/{uuid}/replica?from={seq}&…
POST /api/frame/doc/{uuid}/ops
```

read 有短暂 502/503/504 重试，write 发送 JSON、15 秒超时，可用 keepalive（`:8743`–`:8775`）。**这些是被下载静态代码证明的路径，本次 HAR 未观察到真实调用或确认。**

## sync WebSocket：已连接与协议静态证据分开

HAR entry 32 证明 owner 页确实建立到 `wss://claude.ai/api/frame/sync` 的 101 连接，query 只有 slug 字段名。该 HAR 没有 `_webSocketMessages`，不能还原本次连接的实际消息或 ACK。

静态实现位于 `frame-shell-deferred-Br0hC66Q.js:876` 起：协议名 `frame-sync.v1`，用 shell 同源 WebSocket；`Nt:986` 构造 URL；`:1329` 创建连接，`:1336` onopen 发送 `{kind:'join',slug}`。它不是 artifact iframe 直接访问 Claude WebSocket。

静态收到的控制类型包括 joined/opened、stream_reset/stream_denied、receipt_ack、send_refused/send_result、room_joined/room_denied、invalidate/comment/comment_hint/summon_status/access_request/watchers/access_changed（`:956`–`:978`）。应用 stream 消息与 roster、房间 presence 分开路由（`:1270`–`:1315`）。连接有显式 token refresh 协议、拒绝终止、重连节奏和隐藏 park/resume；本报告不记录任何票据值或其编码。

boot 的 syncClient、sessionsOnSync 在 `Vx:12535` 设置开关；`:12741` 按当前 boot 绑定 socket，`:12806` 使用 syncIdleHiddenMs 设置隐藏休眠。由此可判断同一个 shell 管理版本更新、评论、协作/会话信令；不能仅从存在 WebSocket 就称具体画布使用某种未识别的 CRDT 库。

## 新加载 runtime 的接口和边界

以下九个能力 SDK 均没有直接 fetch/XMLHttpRequest/WebSocket 调用，统一走 shell RPC；它们不是一套新的后端客户端凭据实现。每个 SDK 验证 parent origin/source、跟踪请求 ID，broker generation 变化会拒绝未完成调用或重订阅。细节如下。

### assets / downloads

`assets.DOAjpBS9.js:231` 起安装 upload/list/delete。upload 只接受 Blob/File 和支持的媒体类型；SVG 上限 2 MiB、CSS/JS 16 MiB、其他允许类型 20 MiB（`:74`–`:154`）。返回 URL 被标准化为 `/_blob/{id}`（`:157`）；list 自动翻页但最多 16 页（`:229`–`:248`），delete 只接受 32 位 hex asset ID 或对应 URL。排队 upload 的 ACK 会延长等待预算，不能把 ACK 当上传完成（`:178`）。

`downloads.axDW2QAi.js:111` 的 save 接受 filename、data、可选 request ID。data 可为字符串、Blob、ArrayBuffer/View；ArrayBuffer 以 transferable 发送，Blob 有兼容降级（`:78`–`:198`）。SDK 不直接调用本机文件系统，per-use-confirm 在 shell 策略执行。这里的 save 是下载导出，不是 artifact 保存。

### db

`db.zFlAA4qL.js:12` 提供 doc/collection/where/orderBy/limit/get/onSnapshot 风格便捷层；`:694` 明确底层 get/query/set/update/delete/acquire/subscribe/unsubscribe。订阅消费 `__frame_db_ev` snapshot ops，包括 added/modified/removed 与索引变化（`:339` 起、`:529`），生成 frozen snapshot、docChanges 和 fromCache/hasPendingWrites metadata。回调异常、撤销、重连 resync 有单独路径；pagehide 发送 unsubscribe（`:687`）。这些证明是文档数据 store 的客户端投影；不能因 API 类似 Firestore 就认定后端是 Firebase。

### comments / 内建评论层

`comments.CFMy0ayq.js:877` 安装 create/reply/resolve/delete、sendToClaude、openComposer、anchorFor、customAnchors。当前 config composer_only=true、customAnchors=true，被 `:470`–`:471` 消费。自定义锚点注册要求 mode/threads/reveal 回调，可选 composing/claude/move，已有注册须先 release（`:987`–`:1030`）。openComposer 可接真实 Element 或 Range，将 path、归一化位置、rect、文字 quote、signature 交给 shell（`:885`–`:967`）。

`_comments.DjA5rMIh.js` 是另一层通用 DOM 评论交互。`:1`–`:37` 优先稳定 #id 或唯一 data-id 作为路径锚点，退到 nth-of-type，并用短文本 signature 辅助重定位。它与 comments capability SDK 是两个不同文件；当前画布有 customAnchors，因此不能将所有评论 pin 都归因于通用 DOM 自动锚点。

### room

`room.BYRHiLCc.js:806` 的 install，`:1148` 的安装表提供 rooms、presence、peer/连接事件、join、sendToClaudeSession/canSendToClaudeSession。连接状态由 connected/onConnection 与 peer cache 暴露，没有 state() API。broker rewired 会重发 presence、重连房间并重建监听（`:1134`–`:1147`）。

这个 build 的 `onFollow` 只保存错误 handler/dead 状态（`:693`–`:711`），`followControls` 返回 Promise.resolve('none')（`:1016` 附近），不能称它已经实现可操作跟随控制。sendToClaudeSession 的 onStatus 只检验 state/reason 为有限字符字符串，SDK 未枚举所有状态含义（`:945` 起）。

### sample

`sample.D5wHJkl_.js:1307` 把可调用 sample 函数和 sample/json/limits 安装为同一能力对象。支持文本流 onText、结构化 JSON、模型/effort、AbortSignal、图片预处理、cache、页面定义工具；工具定义须包含 name/description/inputSchema?/execute，总定义不超 32 KB，当前 boot 最多 16 个（`:456`–`:517`）。工具在页面执行，结果经 toolResults RPC 返回 shell（`:1058`–`:1087`），有取消与工具 timeout。带 tools 的请求禁止 cache（`:880`），不能把这套 API 描述成浏览器持有模型服务密钥的直连。

### user / permissions

`user.uKicftX-.js:147` 从下发 config 读取 owner/canEdit/can/profile/email gates，`:407` 安装 id/isOwner/canEdit/can/me/profiles/name/avatarUrl/search/email。当前只有 profile scope，email gate 不成立时返回 null（`:213`）；因此应研究契约，不能为证明登录态而读取具体个人信息。

`permissions.6yWoDecA.js:262` 安装 state/request/manage。request 会在浏览器支持时转发用户激活（`:254`）；设备 shim 在 declared 但未 delegated 时拦截 getUserMedia、geolocation、MIDI、speech/motion，触发 shell 请求后仍维持 NotAllowedError 边界（`:97`–`:177`），新的设备 delegation 需要宿主更新相应姿态。当前 boot 没有设备 capability 声明，不能从 shim 代码推断摄像头/麦克风已可用。

## 新获得的 HTTP 安全政策

HAR entry 0 的 shell CSP：frame-src 只放当前 UUID 的 frame origin，connect-src 是 self 和当前 frame origin；script-src 受 nonce、自身与 Anthropic CDN 域约束；style-src 受 nonce 约束；base-uri/object-src/form-action 禁用。这里只记录策略结构，不摘录 nonce 值。

HAR entry 15 的 frame CSP：

- default-src self；script-src 允许 self、inline/eval、blob 与明确的常用 CDN，服务生成作品需要这些运行方式；
- connect-src 仅 self、blob 和 Google Fonts 相关域，不能任意直连外部 API；
- frame-src self/blob/data，worker-src self/blob；object-src none，webrtc block；
- frame-ancestors 限 self、Claude 域和指定浏览器扩展；文件/媒体/字体 origin 另有白名单。

这与“子页能力 RPC → shell → Claude 同源网络”的架构一致：owner iframe 的权限增强主要依赖 broker，而非取消 iframe 隔离。HAR 还记录 shell COOP=same-origin-allow-popups、CORP=same-origin，静态 CDN JS 为 CORS `*`。这些是本次登录态 response headers；没有公开态对应 response header，不能将两态 CSP 完全相同当成已验证事实。

## 完整性与未验证层

已确认：同版本代码 hashes、owner boot 权限与 capabilities、22 文件图、runtime contract、SDK 安装 API、101 同步连接，以及 HTTP CSP。12 个 Dia runtime JS 已格式化；没有新增产品代码。

未确认：真实编辑提交、保存成功/失败、WebSocket frames、live replica write ACK、服务端存储实现、登录后每个能力的真实调用。HAR 初始导航实际加载了 SDK，不能据此宣称所有功能已执行或通过验收；前端代码也不能还原服务器或原始私有仓库。
