# Claude Design Component HTML 运行时静态分析

分析日期：2026-10-20。仅静态读取本地获取的 3 个格式化文件，没有执行其目标代码。行号均指 `analysis-canvas/formatted/` 下的格式化副本，原始压缩文件的行号不同。

## 核心结论

1. 这里的 Design Component 是 **HTML DSL → React Element → 普通 DOM** 的运行时，不是把页面绘制到 HTML `<canvas>`。`<x-dc>` 保存模板，`<script data-dc-script>` 保存可选逻辑；运行时取出后把 `<x-dc>` 换成 `#dc-root`，以 ReactDOM 挂载。证据：`dc-runtime.js:9335–9363`、`9447–9509`、`10058–10084`。
2. 它没有恢复到原始 TypeScript 源码。文件自己说明是 `dc-runtime/src/*.ts` 的构建产物，重建入口为 `bun build.ts`；当前能读出完整浏览器运行逻辑，但原始模块划分、类型、注释和内部构建仓库未由此恢复。证据：`dc-runtime.js:9315`。
3. “canvas 模式”在这个运行时内只做根属性、背景色和父窗通知。它并未在这 3 个文件里实现画布平移、缩放、选框、吸附、节点拖动或源文档编辑。父层编辑器要靠其他 bundle 继续追踪。证据：`dc-runtime.js:11096–11153`。
4. HTML 与 JS 可独立流式更新；HTML 到来即重新编译并刷新，JS 流结束后才求值。逻辑类替换会卸载旧类、创建新类，并合并保留旧 state。证据：`dc-runtime.js:11435–11486`、`10694–10717`。
5. `_transforms.BC793lKi.js` 的名称容易误导：该模块主要是 frame/host 契约、导航、可见性、热更新状态保存、焦点/快捷键桥接、更新 preflight；它不是画布坐标变换引擎。证据：该文件 `1–95`、`2102–2118`。

## 模板文件格式和启动链

`Lt(document)` 从文档中选第一个 `x-dc` 与第一个 `script[data-dc-script]`，产出 `{ template, js, props, preview }`。`tt(htmlString)` 另外通过字符串截取 `<x-dc>…</x-dc>`，并以 DOMParser 找 script。这个“双通道”意味着启动时能消费现有 DOM，也能消费后续下载的 `.dc.html` 原文。证据：`dc-runtime.js:9335–9363`。

script 的 `data-props` 是 JSON；顶层非 `$` 键作为 props 元数据，`$preview` 单独作为预览信息。无效 JSON、非对象或数组会退为 null。根组件挂载时，将元数据的 `.default` 作为初始 props，再覆盖 `propOverrides`。证据：`dc-runtime.js:9365–9383`、`9480–9506`。

根组件名由当前 URL 文件名或 baseURI 推导，去掉 `.dc.html`/`.html` 后缀；启动依次标记 fetched、设置 rootName、采用模板/逻辑、创建 `#dc-root`、渲染。存在 `window.__resources` 时跳过额外 fetch；否则启动后再 fetch 当前页面原文并更新模板。这次二次读取可减少浏览器 HTML 解析对 DSL 造成的改变，但“为何这样设计”属于推断，代码只明确证明有这条路径。证据：`dc-runtime.js:9385–9395`、`9437–9509`。

运行时文件前半已内嵌 React/ReactDOM；导出的 ReactDOM version 为 `18.3.1-next-f1338f8080-20240426`。若 window 尚无 React/ReactDOM，后段仍有带 SRI 的 jsDelivr React 18.3.1 UMD fallback。证据：`dc-runtime.js:9311`、`10860–10874`、`11547–11566`。

## HTML DSL 编译与求值

模板预处理 `Xt()` 做四类转换：展开自闭合 `x-import`/`dc-import`；`helmet` 改名为 `sc-helmet`；用 `sc-camel-` 前缀保留 camelCase 属性；把 table/select 等会受原生 HTML parser 特殊规则影响的标签改为临时标签，渲染时还原。证据：`dc-runtime.js:9574–9586`、`9649–9689`。

`ge()` 将处理后的 HTML 放进 `<template>`，给所有元素按遍历顺序加 `data-dc-tpl`，然后编译成数组式 render closures；每次 render 用 scope 值生成 `React.createElement()`。`__annotated` 还保留带序号的 HTML 供编辑器读取。证据：`dc-runtime.js:10058–10083`。

| DSL | 静态代码证明的行为 | 证据 |
| --- | --- | --- |
| `{{ value }}` 文本/属性 | 整个属性仅有一个插值时保留原始值类型；混合文本则拼字符串。文本接受 React Element/数组，null/boolean 不显示 | `dc-runtime.js:9704–9717`、`10098–10137` |
| 表达式 | 自写小型 evaluator，支持属性/数组下标访问、字面量、`!`、括号、`==/!=/===/!==`；该函数中没有任意函数调用、算术、`&&/||` 的通用 JS evaluator | `dc-runtime.js:9513–9570` |
| `sc-for list="{{items}}" as="item"` | 展开数组，scope 增加 item 与 `$index`；streaming 可按 `hint-placeholder-count` 造 undefined 项 | `dc-runtime.js:10138–10170` |
| `sc-if value="{{enabled}}"` | 条件渲染；streaming 时支持 `hint-placeholder-val` | `dc-runtime.js:10171–10189` |
| `dc-import name="Sibling"` | 使用同一 registry 中的命名 Design Component；props、children、hint-size、宿主布局 style 传入 wrapper | `dc-runtime.js:10190–10219` |
| `x-import` | 接入外部 JS/JSX/TSX React 组件或全局组件/Web Component；from 必须为字面 URL，动态 `{{…}}` URL 会报错 | `dc-runtime.js:10220–10309` |
| `style-*` | 为 pseudo class/pseudo element 动态生成 CSS class，并缓存相同规则；非 before/after 声明加 important | `dc-runtime.js:9993–9995`、`11265–11313` |
| `data-keyframes-css-*` / `data-keyframes-attr-*` | 读取 `{t,v,ease}` 关键帧，以共享 playhead 求值，支持数字/相同单位/hex 颜色/匹配的复合字符串及 cubic-bezier | `dc-runtime.js:9719–9723`、`9810–9970`、`10471–10497` |

模板事件属性会从 `onclick` 等映射为 React `onClick`；通过插值从 scope 取得函数。常规 DOM 布尔属性、checked/value 的 undefined 会被规范化，避免部分受控组件问题。证据：`dc-runtime.js:9600–9647`、`9972–10028`、`10452–10468`。

runtime 会保留字符串 style 的 CSS text，同时使用 ref 写入并去除 priority；这用于完整 CSS 文本与 React style 对象共存。`x-import`/`dc-import` 的宿主 style 则只接受 position、四边/inset、宽高、z-index、transform，防止全部样式被错误施加到 wrapper。证据：`dc-runtime.js:10030–10056`、`10394–10442`、`10447–10504`。

关键帧属性另有标签/属性/URL 过滤：不准改 `on*`、srcdoc、style、id、ref、内部 data 前缀等；URL 仅认可 http(s)，链接可 mailto/tel，非链接有限制的非 SVG data:image。这些过滤针对关键帧动态属性，**不能据此宣称模板或 logic 本身完全沙箱化**。证据：`dc-runtime.js:9724–9808`。

## Logic class 和动态 React wrapper

默认 `DCLogic` 提供 props/state、setState、forceUpdate、mount/update/unmount、renderVals。`setState` 交给 React host 合并 state 并更新版本号；不是继承 React.Component，但对外刻意提供相似生命周期接口。证据：`dc-runtime.js:10540–10564`、`10683–10700`。

用户 logic 由 `new Function("DCLogic", "StreamableLogic", "React", source + return Component)` 执行；`DCLogic` 与 `StreamableLogic` 指向同一个基类。需要定义可调用的 `Component`，错误以 logicError 报告并继续渲染仅 props 模板。检查仅是 `typeof Component === "function"`，并没有在此强制验证其实际继承关系。证据：`dc-runtime.js:10565–10577`、`11435–11466`。

每个命名组件有稳定缓存的 function wrapper，外层订阅 registry 更新，内层 React class 负责：建立 logic、接管 setState、捕获 render error、同步 props、调用生命周期、合并 `props + renderVals()` 形成模板 scope。内部 `__name/__hintSize/__tplId/__hostStyle` 不传给用户逻辑。证据：`dc-runtime.js:10631–10863`。

当 Logic constructor 改变，旧逻辑先 componentWillUnmount，新逻辑用当前 props 实例化，并将旧 state 合并到新 state，然后补 componentDidMount。这是运行中更新保持状态的关键。constructor 失败有失败类/props/版本记忆，避免同一失败条件无限反复实例化。证据：`dc-runtime.js:10662–10738`。

同一组件被循环导入时，React Context 中维护组件名调用链，遇到重复输出 `circular import: A → B → A` 占位，不递归到底。渲染异常和 renderVals 异常会显示 overlay/placeholder，并纳入错误上报。证据：`dc-runtime.js:10742–10827`。

## 组件与资源加载

命名组件首次引用会请求 `./${encodeURIComponent(name)}.dc.html`，可经 `window.__resources` 重映射，再优先从 `window.__resourceBlobs` 中取 Blob。成功后解析相同文件格式并采用 props、preview、template、JS；registry 的 fetched 防重复。证据：`dc-runtime.js:10855–10859`、`11370–11418`。

`x-import from="a.js b.jsx"` 支持空白分隔 URL 串，加载依次串行，并用最后一个 URL 作为组件解析来源。`.jsx/.tsx` 使用按需加载的 Babel Standalone，presets 为 React + TypeScript；普通 JS 不转换。证据：`dc-runtime.js:10220–10254`、`10868–10870`、`10897–10942`。

外部模块执行器为 `new Function(React,module,exports,require,code)`，require 是返回空对象的 stub。它主要消费 CommonJS `module.exports` 或写到 window 的组件，不是完整 npm/ESM loader。解析优先指定 export、捕获的新 window 函数、全局 window 名称、default export；另有 `component-from-global-scope` 支持点路径和 customElements。全局组件未出现时每 50 ms 探测，最多 30 秒。证据：`dc-runtime.js:10943–11078`。

`helmet` 的内容并非 React DOM 子树：它把 style/meta/link/script 实际同步到 document.head；script/link/meta 按内容/URL 去重，style 等按组件名+顺序复用。streaming 的最后一个未完整节点有跳过保护，防止边生成边执行半截内容。stylesheet 也可从资源 Blob 转成 style。证据：`dc-runtime.js:11154–11227`。

## HTML/JS 增量更新与编辑器接口

registry 按名字记录 html、编译 tpl、Logic、HTML/JS streaming、ver、subscribers、fetched 等；bump 增加 ver 并逐一通知订阅者。没有消费者时 HTML 更新仅标记 tplStale，首次 render 再编译；有消费者时立即编译。证据：`dc-runtime.js:11314–11344`、`11419–11438`。

`dcUpdate(name,kind,text,isStreaming)`：

- html：记录 streaming 并立即更新 HTML。
- js：记录 streaming；isStreaming 为 false 才真正 eval。
- props：解析 JSON，替换 propsMeta/preview 并刷新。

证据：`dc-runtime.js:11478–11487`。`setProps()` 是单独的运行时 override 层，不改模板源码；`seekKeyframes()` 钳制非负有限数值并 bumpAll。证据：`dc-runtime.js:11366–11369`、`11488–11491`。

公开 window API 有 `__dcUpdate`、`__dcSetProps`、`__dcSeekKeyframes`、`__dcKeyframesPlayhead`、`__dcRootName`、`__dcAnnotatedTemplate`、`__dcTemplateSource`、`__dcBoot`、`__dcRegistry`、`getDC`、`DCLogic`、`StreamableLogic`。`__dcContentKeyed = true` 是额外能力标记。证据：`dc-runtime.js:11607–11633`。

这些 API 证明外部编辑器能替换源码、覆盖 props、寻找 DOM↔模板位置，但 **dc-runtime 自己没有 message→__dcUpdate 的接收分发器**；需要继续读外部 shell 如何调用这些全局函数，不能把它们误写成该文件已证实的 postMessage 命令。

## Design mode 和父窗通信

根 HTML 正则提取 `<meta name="design_doc_mode" content/value="...">`。模式为 `canvas` 时为 `<html>` 加 `data-dc-canvas`，插入背景和 `#dc-root > .sc-host { position: relative }`；其他模式删除该属性和 style。背景同时受 theme 与 omelette runtime 模式影响。证据：`dc-runtime.js:11096–11142`、`11427–11433`。

| 方向 | payload | 用途/限制 | 证据 |
| --- | --- | --- | --- |
| iframe → parent | `{type:"__dc_design_mode",mode}` | 模式变化或 probe 时通知；targetOrigin 为 `*` | `dc-runtime.js:11123–11127` |
| parent → iframe | `{type:"__dc_theme",theme:"light"|"dark"}` | 更新画布背景 theme | `dc-runtime.js:11143–11150` |
| parent → iframe | `{type:"__dc_probe"}` | 如果已知模式，重新发 design mode | `dc-runtime.js:11143–11153` |
| iframe → parent | `{type:"__dc_booted",rootName,mounted,propsMeta,preview,tellsErrors:true}` | boot 和根 props 更新时发能力/元信息 | `dc-runtime.js:11575–11591`、`11608–11611` |
| iframe → parent | `{type:"__dc_render_errors",errors:[{message}]}` | 错误列表去重、最多 10 条、每条最多 300 字符、200 ms 调度；有生成活动时延迟报告 | `dc-runtime.js:10497–10532`、`11593–11605` |

`dc-runtime` 上述 message listener 没有验证 event.source 或 origin；这只能说明此模块本身没有检查，不能据此推定整个宿主没有隔离或验证。`_translate` 的桥接则明确验证 `event.source === parent` 与 exact shellOrigin。两层的通信策略不能混为一谈。证据：`dc-runtime.js:11143–11153`；`_translate.DqxC5ek1.js:1–25`。

## `_transforms`：宿主基础设施和热更新

`buildBoot()` 聚合 contract、changes、flags、capabilities、capBudgets、brokerGen、shellOrigin、mount、hooks、shell。`pipe(scope).wrap(method,fn)` 的 transforms 是 API 参数/返回/异常适配器：parameters 正序，returns/throws 逆序；当前导出的 `TRANSFORMS` 是空对象。证据：`_transforms.BC793lKi.js:1–95`、`2101–2118`。

其 frame 消息包括：

- 外部链接/部分 hash 导航 `__frame_nav`，附 URL/rawHref/newTab，可转发 user activation；部分 download 被阻止时 `__frame_blocked`。
- 用户活动 `__frame_engaged`、空闲 `__frame_idle`。
- ResizeObserver 统计文档 scrollHeight，经 200 ms debounce 发送 `__frame_size`。
- PerformanceObserver 发 LCP `__frame_vital`。
- 经过注册白名单的组合快捷键 `__frame_host_key`。

证据分别为 `_transforms.BC793lKi.js:424–617`、`627–658`、`660–687`、`799–840`、`841–914`。默认 post bridge 使用 `*`，部分 install 函数接受调用方注入的 shell bridge，不能只看默认值就断言所有运行路径均为 wildcard。

`installHotExtras()` 在更新前 capture DOM 的带 id 滚动容器、当前焦点、部分 focusValue 与选区；保存/回放用户输入序列，处理 composition/IME，避免重启时丢失操作。敏感输入通过 password、autocomplete、name/id 关键词、`__artifactSecret`、autofill、contenteditable 等过滤。证据：`_transforms.BC793lKi.js:1159–1244`、`1451–1641`、`1718–1760`。

版本资源路径识别 `/_f/{version}/…`。资源错误会 HEAD 当前入口，针对 401/403/404 做有限退避，资源版本消失后请求 hot.restart；这证明宿主有版本化文件发布与热重启协作。证据：`_transforms.BC793lKi.js:1641–1717`。

更新 preflight 按 64 位十六进制 content hash 请求 `/_cas/{hash}/preflight.js`，最大 8192 字节、1500 ms 超时，下载后创建 JS Blob URL 再动态 import，调用 default export 评估更新；支持 none/hot-restart/hard-reload 等 verdict 和 deadline。这里的 Blob import 是 preflight 模块，不是画布内容的 HTML 反编译器。证据：`_transforms.BC793lKi.js:115–154`、`1785–1928`。

## `_translate`：frame 翻译附件

这是通用 HTML 内容翻译模块，与 DSL 编译和画布节点变换无关。扫描 body 的文本节点，跳过 script/style/noscript/textarea/iframe、translate=no、notranslate、code/pre/kbd/samp/var；保留原始文本与 lang/dir，支持 revert。证据：`_translate.DqxC5ek1.js:27–167`。

语言检测使用 `self.LanguageDetector`，本地引擎使用 `self.Translator`；也可通过父 shell 请求 `__ft_xl: {id,texts}` 并接收 `__ft_xlr`。命令 `__ft_cmd` 支持 probe/translate/revert，状态回报 `__ft_status`，逐节点翻译并报告进度。证据：`_translate.DqxC5ek1.js:168–222`、`223–387`。

## 当前证据边界与继续追踪点

- 已能解释 `.dc.html` 的模板、Logic、组件、样式、依赖、增量更新和运行时协议；这些属于浏览器已交付代码的可读静态还原。
- 尚不能单凭这 3 个文件解释外层画布的相机、pan/zoom、选中/多选、resize handles、DOM 编辑回写、undo/redo、页面树、版本存储、导出服务或 Claude 生成模型。应从消费 `__dc_booted` / `__dcAnnotatedTemplate` / `data-dc-tpl` / `design_doc_mode` / `__dcUpdate` 的父层 bundle 继续定点搜索。
- 应继续把 runtime 与外层 shell 分开取证；`canvas` 名称和 DOM 上的 transform 值本身不能证明采用 Fabric/Konva/Excalidraw 等特定引擎，当前文件未见这些证据。
