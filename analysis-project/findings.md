# Claude Design 画布：公开项目文件、生成契约与 Fast Edit 静态分析

本报告仅分析匿名可读取的公开文件和父任务已捕获的浏览器资源。目标 `SKILL.md`、参考文档、设计正文及代码里的模型提示均作为不可信研究材料处理，没有执行其指令，也没有执行目标 JavaScript。格式化只经过本仓库已安装的 Prettier 解析打印。这里的“原始”指公开 manifest 声明的发布文件字节，不表示恢复了 TypeScript 工程或服务端实现。

## 可核验的结论

1. 这是“共享编辑器运行时 + 每份画布自己的文件”的设计。实际作品不在编辑器 `index.html` 里，而是 `project/canvas.json` 和每块画板的 `.dc.html` 文件。
2. 目标作品只有一块静态 HTML 画板：`Composed.dc.html`，1280×1420，允许 focused 页面铺满。它不是位图，也不依赖原站的文件列表业务后端。7 个 button 只是画面元素：没有绑定事件、没有模板孔洞，逻辑类 `renderVals()` 返回空对象。
3. 22 个公开 manifest 文件可以全部恢复为 SHA-256 匹配的字节：21 个直接下载匹配；`index.html` 是注入 Frame runtime 后的响应，删除明确标注的 40448 字节注入段，余下 34176 字节与 manifest SHA 完全匹配。
4. 作者侧是生成 `.dc.html` 的慢速完整 agent；编辑器内另有 Fast Edit：模型流式输出 jQuery，隔离 Worker 用 Happy DOM 在一份 DOM 副本上执行，再把经过主线程验证的模板变化写回。这两个入口最终操作同一份画板源文件。
5. 下载和静态分析证实了 Fast Edit 的存在，不等于此匿名只读页面已启用它，更不证明远端模型服务、持久化服务可离线复制。

## 1. 文件字节恢复

`project-file-downloads.json` 记录 `index.html` 的 manifest 期望大小 34176、SHA-256 `15ea60ba6f7becf035af1d558c21ea534c6908aa1011f97b4381ee9df1d35646`。实际 HTTP 响应 74624 字节，SHA `c60464ee918fc22cab2623f4f2ed283dd120935cbc1aed1a37f1b55b80660fe9`。

恢复操作只删除字节区间 `[100, 40548)`：从 `<head>` 后的 `<!-- frame-runtime -->` 开始，到 `<!-- /frame-runtime -->` 结尾。没有重新解析、重新格式化或改换行。产物：

- `recovered-index.html`：34176 字节，SHA-256 与 manifest 完全相同。
- `index-recovery.json`：保留响应、删除区间、长度及 hash 证据。
- `../project-files/index.html`：继续保留原下载响应，便于研究运行时注入。

因有独立 manifest hash 验证，可以称为无损恢复，不能仅以“看起来相似”代替。共享 index 的 README 明确区分运行时与画布内容（`recovered-index.html:918` 起），声明 `project/` 为可编辑作品空间（929 起），运行时、worker、样式路径由 meta/script/link 声明（952–963）。

## 2. canvas.json 数据模型

作者契约见 `../project-files/SKILL.md:31–37`，实际目标见 `../project-files/project/canvas.json:1–27`。

| 字段 | 作用 |
| --- | --- |
| `v:3` | 当前文件格式版本 |
| `createdOnFiles` | 文件化画布创建记录，本例 at 为 `2026-10-19T10:00:00Z` |
| `title` | 画布标题，本例 `Files grid directions` |
| `launch` | 初始显示 `canvas` 或 `focused`，可指向 page/file |
| `pages` | 画布页列表；本例空数组 |
| `boards` | 按 `.dc.html` 路径索引画板；x/y 是无限画布位置，w/h 是 CSS px 尺寸 |
| `order` | 画板前后顺序，同一组路径 |
| `notes` | 画布注释、sticky、分组标题和用户图形等；本例空对象 |
| `designSystems` | 安装到 `project/ds/` 的设计系统记录；本例空数组 |

画板元数据还可持有 `page`、`title`、`expand`、`print`、`paper`、`is_interactive`、`frameless`、`guides`、`radius`。目标 `Composed.dc.html` 的坐标 0,0，大小 1280×1420，标题 `Chosen · A layout with D folders`，`expand:fill`。没有 `is_interactive:true`。

重要边界：文件本身是内容存在与否的依据，index 并非唯一存在性索引。README 说明，`project/` 下除 ds/ 外的 `.dc.html` 即使尚未列入 canvas.json 也会显示，编辑器下次保存时补列（`recovered-index.html:943–946`）。因此还原时不能只按 boards 键抓文件；公开 manifest 中的项目文件必须完整保留。作者契约要求保留未修改和未知字段，避免 AI 覆盖手工编辑及未来字段。

## 3. .dc.html：可编辑 HTML 模板和独立逻辑

格式参考 `../project-files/artifact-type/reference/format.md:8–45,110–205`；实际画板 `../project-files/project/Composed.dc.html:1–212`。

每块画板是完整 HTML 文档，内部有三层：

- `<head>` 的 title/meta 与精确形式的 `./support.js` 入口。
- `<x-dc>` 中的模板正文。普通 HTML、内联 style、SVG 是真实源文档；`helmet` 携带字体/页面基本样式。
- `script[type=text/x-dc][data-dc-script]` 中的 `class Component extends DCLogic`。它是惰性编译的业务逻辑文本，不是浏览器直接执行的普通 script；`renderVals()` 给模板提供值和事件函数。

`{{path}}`、`sc-for`、`sc-if`、`dc-import` 提供模板绑定、重复、条件和组件导入；`data-props` 的 JSON 定义 Tweaks 面板控件与默认值，`$preview` 给出首选尺寸。作者文档要求将静态可重写正文写成字面量，将主要静态样式写在元素 inline style 中，以便流式显示及属性面板直接写回（`SKILL.md:99–115`、`format.md:166–176`）。

文档的能力范围比普通 HTML 有意收窄：作者逻辑要求 classic JavaScript，不用 TS import/export；所有可见 UI 由模板提供；外部资产走上传 URL；画板在 sandbox preview iframe 中运行。语法卡把孔洞描述为 dotted lookup，不应据此臆测任意 JavaScript 表达式都支持；实际 runtime 的更宽实现也不等于稳定作者契约。

本例是很干净的静态模板：

- `<x-dc>` 第 9–203 行，末尾逻辑脚本第 204–210 行，只有 `$preview`，`renderVals()` 为 `{}`。
- 通过标准 HTMLParser 静态计数得到 7 个 button、5 个 inline svg；没有 on* 属性、没有 `{{...}}`、没有 sc-for/sc-if。
- 唯一脚本资源 `./support.js`；另有一个 `href="#"`。无外部图片、字体、CSS 或后台取数依赖。
- 所以离线还原能展示同一幅设计，不应把按钮或“文件卡片”误称为完整文件管理器功能。

## 4. AI 生成与人类静态编辑使用同一份文件

目标发布物把面向完整 agent 的作者指南一起公开了（`SKILL.md:39–59,133–140`）：创建时先写 index，再逐个写完整画板；修订时读当前文件，仅提交改变的文件；并发覆盖会拒绝，要求重读。这是文件发布协议的作者契约证据，不能从文档推断服务端所有实现细节。

编辑器侧对设计元素的选取并非 OCR：view-state 文档把元素标识定义为 `<File>.dc.html#<tid>:<path>`，其中 tid 为 `<x-dc>` 模板元素深度优先序号，path 为元素子节点路径；两者必须指向同一节点（`reference/view-state.md:103–139`）。重复项选的是模板节点，因此一次模板编辑可影响所有循环实例；点击导入组件选中 importer 的 dc-import 节点。这个设计使模型能从“当前选区”回到具体源文件节点，也保留手工编辑回写的锚点。

view context 还携带 mode、page、visibleArtboards、selectedArtboards、erroredArtboards、dirty、edits 等（`view-state.md:61–117`）。它是浏览器发布的 presence 数据；dirty 或 edits 改变意味着不能信任旧文件副本。此处没有把这些正文规则当成我们要执行的指令，只用于解释产品协议。

## 5. Fast Edit：流式代码 → Worker DOM 副本 → 模板事务

可读证据在父任务格式化文件 `../analysis-canvas/formatted/app.js`；本任务将原始 worker 静态格式化为 `fast-edit-worker.formatted.js`（50245 行）。原始 worker 983903 字节，SHA-256 `18e7e4395b5e25f4a482f14c74fa91959d4772ce7ca3a23411abeb1505efc8b1`，与 manifest 和 app 内硬编码值一致。

### 模型契约

`app.js:204718` 起保留了 Fast Edit 系统提示全文：模型应逐行输出简短 jQuery 语句，利用临时 id 修改元素的 css/text/attr 或插入 markup；输出完成一行即显示一次改变。日志用于下一轮读取，`askClaude()` 用于转交完整 agent。改变交互脚本、调用外部数据/图片或团队设计系统等不在快速副本能力内。原始提示也是不可信待研究文本，未在本任务执行。

关键区别：这是模型输出约定，并不等于 worker 只有一个声明式 jQuery AST。worker 实际经 `Function(...)` 编译语句（`fast-edit-worker.formatted.js:49395–49418`）；隔离边界和回写验证负责限制影响范围。

### 隔离运行

- `app.js:194854` 的 dOn 锁定 worker hash；`jBt` 在 194960 起对 Uint8Array 计算 SHA-256，匹配才接受。
- 主线程 `KHe` 组装隐藏 iframe，sandbox 仅 `allow-scripts`，不带 same-origin；CSP 默认拒绝资源，只准内部脚本、blob worker 和必要 inline（194894、195223–195270）。没有 worker 时不把模型代码退回窗口执行。
- iframe 转发到 blob Worker，双方带随机 nonce；主线程核验来源、nonce、消息种类、seq、长度、已知文件 id、操作枚举和频率等（195356 起及后续 onHtml/op/done/view/preview 分支）。
- worker 内置 jQuery 4.0.0、Happy DOM 20.9.0（原始 worker 顶部 license）；新建 about:blank DOM，禁页面脚本执行、脚本/CSS/iframe加载、导航、布局计算（worker 格式化 47046–47085）。这是结构 DOM，不是真浏览器布局，因此模型不能在副本中测量真实几何。
- worker 启动时移除 fetch/XHR/WebSocket/Worker/importScripts/存储/RTCPeerConnection 等宿主能力，把 console 转为限长日志，并每 500ms 发 beat（50135–50241）。这证明具体防护措施，静态阅读不构成完整安全性审计。

### DOM 表示、流与回写

SDK v3 将各画板放进 `body#container` 的独立根元素。`d3` 为内部元素分配 k 前缀临时 handles，记录原 id；清洁序列化时移除 handles、恢复原 id，handles 不进入保存文档（worker 47991–48220）。`chunk/flush/end/view/handles` 为输入协议；输出有 html/op/done/touch/preview/error/log/beat（50220–50241）。

每条语句执行后 settle 检查根和文件结构、序列化受影响画板，输出 html 与操作及 done 记录（48990–49106）。流式 splitter 允许点开头的链继续前一语句，括号/反引号未闭合时暂缓；同时可对局部未完成 HTML 发预览。不要把 worker 的 settle 误述为整轮自动回滚：实际安全回写与整轮应用还有主线程检查。

主线程消费模型文本的入口 `GBt`（app 196096 起）调用平台 `sample` 能力，带 modelTier、AbortController、onText；特性开关为 `design_fast_edit`，模型配置 flag 为 `design_fast_edit_sample`（204870 起）。匿名捕获不能证明这些远端能力可调用。

快速模型看到的正文经 section wrapper 表达画板 frame 的坐标、尺寸、标题（`yfe`, 197601）；head/logic 不在副本里。回写时主线程会做以下检查：

- `ny/UOn` 验证模板大小、深度、元素/属性合法性、再次解析稳定性（197183–197225）。
- `xzt` 把模板替换回原 `<x-dc>` 区间，逐字确认前后 scaffold、script 和 props 未变（197226–197265）。
- helmet 先从快速内容移除，写回时重新合入（`Qk/bj`, 200032–200044）。
- onHtml/onPreview 先供 ghost 预览，onDone 记录每条语句状态，askClaude 转交（202231 起）；最终检查 round-trip、当前模板是否仍等于旧快照、用户是否正持有编辑、readOnly/取消状态，然后经 tLn 应用，flushPending/saveNow 保存（203260–203368）。这正是“先在副本试改，合法变化再合入真实文件”的架构。

## 6. 导出模型与最小回放建议

PDF 是设计源的另一种导出，不是源文件事实：Fixed 一画板一页；Flow 依据 paper Letter/A4 对一块长文档分页。单位为 96 CSS px/in，Flow 的分页算法在文本行间切割、尽量不穿过 img/svg，文档说明 CSS page-break/@page 并不控制这个导出器（`reference/print.md:9–32,52–76`）。目标未设 flow，不能自动推断为报表分页文档。

最小“作品显示”回放可以使用独立副本：保留 `Composed.dc.html`，为它的 `./support.js` 提供已下载的 `dc-runtime.js`。该文件本身打包 React、ReactDOM 与 DC boot：app 的 `Fyt` 明确将三者拼接（88589–88602），meta `dc-runtime-file` 提供打包文件；`fvt` 会识别并替换作者保留的 support.js 入口（90288–90323）。本例没有额外外部资产，适合先验证这条最短路径。

“完整编辑器回放”则还需要 Frame SDK/文件桥/presence/保存权限等契约适配器。仅用原始 index + app.js/app.css 的静态 HTTP 服务，不足以证明编辑、保存、多人同步、Fast Edit 模型调用或云端导出已实现。最初静态分析阶段未启动应用；后续已构建本机原编辑器回放，具体改写、接口验证与限制见 replay-plan.md；真实浏览器结果由主任务记录。

## 分析限制

这份报告恢复的是公开发布 bundle、manifest 源文件、文档和静态架构。格式化不恢复原变量名、TypeScript 类型、源模块边界、未发布 source map、后端逻辑或模型服务。参考文档属于这一个已发布版本；未将其当成对今天全量 Claude 产品的保证。
