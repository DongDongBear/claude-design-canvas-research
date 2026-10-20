# Claude 画布实现：已加载前端代码的静态还原

本报告分析浏览器实际加载并已保存的 `app.js`（4,153,993 字节）、`app.css`、`dc-runtime.js`、`_runtime/_transforms.BC793lKi.js`、`_runtime/_translate.DqxC5ek1.js`。分析仅解析代码及字符串，没有执行下载的目标 JS。所有行号指向本目录的格式化副本，原文件、URL、SHA-256 以父目录 `asset-manifest.json` 为准。

## 核心结论

这个画布的主体实现是 **React 编辑器 + 以 CSS transform 移动/缩放的 DOM 世界层 + 每个 artboard 独立的 sandbox iframe + iframe 内的 HTML/React 模板运行时**。它把 HTML 当作可编辑内容事实，而不是把所有内容先转换为固定的图形节点树。编辑器保存 HTML 模板，运行时负责模板/逻辑渲染，注入的 picker 在真实 DOM 中命中元素、测量边框并回传编辑意图。

这不是仅凭页面外观的推断。`app.js:155355` 是 `data-testid="mega-canvas"` 外壳，`:155757` 是 `data-mega-world` 的 DOM 层，`:155919`创建 `data-mega-artboard` 的 absolute div；实际内容在 `:147426` 创建 `sandbox="allow-scripts allow-same-origin"`、`srcDoc=Lr` 的 iframe。相机在 `:87943` 拼接 `translate(...) scale(...)`，`:87982` 直接写 DOM 的 CSS 变量。

这里确实用到 `<canvas>`，已证实的用途是 HTML 截图、PNG/缩略图和导出栅格化，而不是上述主编辑平面。`app.js:68618` 把 clone 的 HTML 序列化到 SVG `<foreignObject>`，`:68672` 创建 canvas、drawImage，再 `:68717` 产生 data URL。不能把“bundle 中存在 canvas”当作画布以 Canvas 2D 绘制的证据。

## 可直接阅读的本地成果

- `formatted/app.js`：205,016 行，主编辑器及第三方依赖的可读副本。
- `formatted/app.css`：13,989 行，包含很有价值的原始 CSS 注释和模块名。
- `formatted/dc-runtime.js`：11,641 行，artboard 的模板运行时。
- `formatted/_transforms.BC793lKi.js`：2,118 行。
- `formatted/_translate.DqxC5ek1.js`：387 行。
- `embedded-scripts/03-string-L86812.js`：从 app.js 的静态模板字符串提取的 **242,544 字符 iframe picker 程序**，展开后 13,434 行；这段代码原本藏在一个字符串里，单纯 beautify 外层不会展开它。
- `embedded-scripts/02-supportJs-L61047.js`：45,305 字符的内嵌 export/support runtime。
- `embedded-scripts/01-reactDomUmd-L60779.js`、`04-r-L105087.js`：其他大段内嵌脚本。
- `embedded-scripts/index.json`：每段字符串在格式化 app.js 中的来源行、字节数、提取路径。
- `symbol-index.json`：9,558 个函数/对象/类符号的开始/结束行；这是定位索引，不代表恢复了原文件边界或原命名。
- `picker-protocol-index.json`：107 个静态 `type:` 字面量出现位置与 picker 的 96 个公开方法。
- `runtime-findings.md`：单独的 runtime/DSL/streaming 分析。

## 数据模型：画布布局与 HTML 内容分开

`app.js:64948` 的 `Yl(serializedDesign, files)` 从设计 JSON 与文件字典建立模型；`:65006` 的 `lh(model)` 规范化并 JSON.stringify 回去。核心形状可依据代码还原为：

```ts
interface Design {
  artboards: Artboard[];
  annotations?: Annotation[];
  pages?: Array<{ id: string; name: string }>;
  launch?: { view?: string; page?: string; file?: string };
  cover?: string;
  migrated?: true;
}
interface Artboard {
  file: string; // 通常 *.dc.html，内容在 files[file]
  x: number; y: number; w: number; h: number;
  title?: string;
  expand?: unknown; print?: unknown; paper?: unknown;
  page?: string; is_interactive?: boolean; frameless?: boolean;
  guides?: unknown; radius?: unknown;
}
```

这里 `unknown` 表示本报告没有完整恢复该字段的联合类型，不能误当作原 TS 源码。

证据：

- `app.js:65232` 的 `WR` 明确列出保存的 artboard 字段：`x/y/w/h/title/expand/print/paper/page/is_interactive/frameless/guides/radius`。
- `:64948–65005`：只接受在 `files` 中存在的有效 artboard 文件、去重；缺少布局条目的 `.dc.html` 自动补位；`<script data-props>` 中的 `$preview.width/height` 可提供初始尺寸（`:64916`）。
- `:64537`：未设 page 的节点归于第一页；不再存在的 page 归回第一页。
- `:65139` `UR` 是按 page 筛选 artboard 与 annotation 的视图。page 不是一张位图，而是布局集合的分组。
- `:64563` 的默认 artboard 尺寸为 800×600，间距常量 80；主 Host 的默认初始 camera 在 `:168880` 为 `{x:-60,y:-80,scale:0.5}`。
- `:191569` 的 `Wk` 规范化另一种持久状态：`v/title/launch/pages/boards/order/notes/designSystems/attachments`；`:191632` `ofe` 再转换为 `artboards/annotations` 视图。它同时保留有序表与按文件名查询的表。
- `:191674` 的 annotation 持久字段列出 x/y/w/h、x2/y2、旋转/翻转、颜色、形状种类、字体、图片/视频/链接等；路径 `d` 超过16K时拆成 `d` 与 `d1`（`:191702`）。

这些只是浏览器端持久/运行模型证据，服务端存储与同步算法需另看 shell/协议，不应从此推定使用 Yjs、Automerge 或某个后端数据库。

## 内容模型：真正编辑的是 detached HTML DOM

关键类为 `Vb`，见 `app.js:80264`。字段为 `tpl`、`byTid = new Map()`、class-rule cache、serialized cache、MutationObserver 等。

- 构造器在 `:80272` 创建 `<template>`，把 HTML 装入 `template.innerHTML`，调用 `restamp()`；该 DOM 用于编辑建模，不是可见 artboard。
- `restamp`（`:80765`）按 DOM 顺序为所有元素生成 `data-dc-tpl` 编号并建立 `byTid`。这是宿主模型与运行 iframe 之间的稳定于当前模板版本的寻址层，不是用户最终 HTML 必须保留的 ID。
- `serialize`（`:80367`）clone 模板、移除内部编号属性、序列化回 HTML；MutationObserver 用来使序列化 cache 失效。
- `setStyleProperty`（`:80415`）、`setInlineStyleAttr`、`setText`、`setAttribute` 直接改模型 DOM。
- `wrapElements`、`wrapTextRuns`、`unwrapElement`、`duplicateElement`、`insertHtml`、`moveRelative`（`:80799–81128`）是在 DOM 结构上实现编辑操作。
- class/inline style 合并与查询在 `:81130–81206`；outline 在 `:81362`；text-editable 过滤在 `:81290`。
- `.sc-host` / `data-sc-name` 是运行时组件边界；导入组件、循环生成内容、deck-stage 有编辑限制，模型中 `isUneditable`、`isLoopDriven` 和 parent-lock 检查分别见 `:80329`、`:80346`、`:80336`。

因此实现一个类似系统时，“HTML 原文/模板模型”和“浏览器当前渲染 DOM”必须分开。运行 DOM 中含组件生成内容、循环实例、动画和编辑标记，不能简单 `document.body.innerHTML` 永久覆盖回原模板。

## 相机、缩放与平移

camera 是 `{ x, y, scale }`。`x/y` 表示世界坐标系中视口左上角，而不是 DOM translate 的像素值。

- `app.js:87943` `z4(view)` 输出 `translate(-x*scale px, -y*scale px) scale(scale)`。
- `:87970` `NPe` 是 camera controller，提供 `get/rest/set/glide/settle/halt/subscribe/attach/stamp/paint`。它直接更新世界层 transform，通过 rAF 合并更新，通过 timeout 做静止后的回写。
- `:87982` 在被 stamp 的节点上写 `--mega-scale` 与倒数 `--mega-inv-scale`。标题行/控制点利用反向 scale 保持屏幕上的大小，例子见 `:156003`。
- `:105924` `BD` 按鼠标锚点缩放：先将锚点转换成 world coordinate，再算新的 x/y，使锚点不飘移。默认 clamp 到 0.05–40。
- `:105934` `gz` 把屏幕平移 delta 除以 scale 转成世界 delta；wheel factor 是 `exp(-deltaY*0.01)`，每次 clamp 到0.8–1.25（`:105939`）。
- `:106020` `pOe` 是原生 Pointer/Wheel/Touch/Safari Gesture 适配器。ctrl/meta wheel缩放，其他 wheel平移或允许内嵌滚动；双触点用距离比算缩放并根据中点变化平移。用 setPointerCapture 捕获手势，销毁时移除监听器。
- iframe 内相同手势通过 picker 的 `panZoom` 事件交给 host（picker `:6810`、`:6880` 附近），因此指针落到 HTML iframe 上也能操作整个画布。

CSS 还保留原模块名：`app.css:76` 写明 `host/camera.tsx` 对 `[data-mega-zoom]` stamp；`:89` 写明 `host/MegaCanvas.tsx` 控制拖动中的 iframe pointer-events。这是比压缩变量名更可靠的原源码线索。

## iframe 运行、消息与执行桥

主 artboard iframe 在 `app.js:147426`；拖拽 ghost 也用 iframe，见 `:151956`。主 iframe onLoad 若有 boot bundle，会 postMessage：

```js
{ __dc_doc: 1, doc: boot.doc, parts: boot.parts, urls: boot.urls }
```

运行时回应 `__dc_booted`。Host 在 `:144498` 检查 `rootName` 与该文件的预期组件名，名字不对会明确报 “live edits will not render”；props meta 也由该消息送回。其他消息包括 `__dc_render_errors`（`:144475`）。

编辑器不是直接依赖同源 `iframe.contentDocument` 来调用任意方法。`app.js:68840` 的 `Qr(iframe)` 构造适配器，通过：

```js
// host -> guest
{ __om_eval: 1, id, code }
// guest -> host
{ __om_eval_r: 1, id, ok, v /* JSON string or absent */, e }
```

相关执行请求有超时、pending Map 和匹配 id；回信还检查 iframe source。`app.js:66004` 的 `vg` 验证 `event.source === iframe.contentWindow` 以及 origin。`Qtn` 在 `:68828` 也筛 origin。

`executeJavaScriptUnchecked` 只是请求失败时吞掉异常的包装，并不代表下载分析时执行了这些代码。页面本身使用该通道把 picker 安装进去（`:86825`），随后调用 `window.__dcEditorPicker.*`。

## HTML 元素选择与编辑：注入 picker

原始注入字符串位于 `app.js:86812–86817`，已另存并格式化为 `embedded-scripts/03-string-L86812.js`，下列行号都针对提取文件。

picker 的职责包括：

1. 命中：`document.elementFromPoint`、`elementsFromPoint`、`closest('[data-dc-tpl]')`，识别 SVG、HTML、导入组件边界、shadow/slot parent；例子 `:2653`、`:3415`、公开 `pickAt:11830`、`pickIn:11880`。
2. 选择状态：记录 tids、component name、instances、part，并 post `select`；`:1966–1985`。Host 在 app.js `:135732` 把它交给选区状态与属性面板。
3. 编辑视觉：给运行 DOM 加 `data-dc-editor-selected/hover`；读取 getBoundingClientRect/computed style，输出 overlay几何。`:6094` 的 `Su` 向 host 发 `chrome`，包含 rings/stroke/measure/guides/artboard/pen/vec。
4. 持续测量：enable `:11531` 绑定 pointer/key/wheel/copy/paste/drop 等事件，安装 MutationObserver、ResizeObserver 与400ms巡检。disable `:11592` 对称释放并恢复状态。
5. 内联文本：在真实 DOM 上 contenteditable、Range/caret API，结束后发 textEdit 的 html/text/tid/name；`:9476–9500`。脚本绑定文本、props文本、imported文本分别有独立处理，不能一律改 innerHTML。
6. 拖拽/resize/rotate：实时 patch显示，提交时输出 move/resize/rotate意图；取消则 styleRevert。事件例子 `:4139`、`:5774–5782`。跨 artboard拖拽有 moveStart/moveHost/moveExit/dropPlanAt 的96方法 API中的一部分（`:12103–12362`）。
7. SVG：penPreview/penCommit/vecPreview/vecCommit 修改 path d，验证路径字符与长度，提交 pathEdit/strokeEndpoint；`:12441–12626`。
8. 属性检查：`inspect`（`:13177`）返回 tag、实例数、computed字典、父级display/flexDirection、是否真实rendered，以及可选geometry/background等。这是属性面板把作者写的style与浏览器最终computed style拼起来的依据。

picker 向父窗的事件封套为 `{ __dcEditorEvt: event }`，见 `:1822–1838`。Host 在 app.js `:135322` 获取它，在 `:135630–135650` 对move/resize/rotate分别校验和处理。在 `:136020–136160` 的属性应用路径中，先验证CSS值，再调用模型 `setStyleProperty/setAttribute`，记录undo，再推回guest。

**关键设计：** picker可以先提供流畅的视觉预览，但持久事实由host的HTML模型决定；有preview/revert/commit与scope检查，不能把每次mousemove直接保存为HTML。

## 页面、artboard、注释、形状

- 页面分组与切换：`UR`（app.js `:65139`），page add/rename的undo重放在 `:168100`。默认页 `{id:'page-1',name:'Page 1'}`（`:168095`）。
- artboard的外框、标题、工具条、resize handles由host渲染；内部HTML属于iframe。外框以absolute位置铺在世界层，选中/全窗/playing/frameless有不同overlay路径（`:155837–156365`）。
- 画布空白处添加矩形、椭圆、文字、箭头、线、自由绘制由MegaCanvas处理，`:155510–155735`。on release生成world coordinates，再交给持久编辑操作。自由绘制采样使用距离阈值，超过3000个点会降采样（`:155684`附近），最终生成SVG path数据。
- artboard外的annotations与artboard内的HTML元素是两个子系统。选择集合有files/notes，marquee对矩形与线段/路径分别测试（`:152077`）。不能把“图形工具能画矩形”误认成所有artboard内容都是矢量scene graph。
- snapping见 `:152138` `qkn`，同时计算alignment guides与equal gap guides；除以当前scale维持屏幕容差。

## Undo/Redo：多层历史与跨画板协调

至少有两层历史：artboard的HTML/props/script快照历史，以及画布布局/页面/annotation操作历史。

- app.js `:130304` 明确保留报错字符串：design-editor history is snapshot-based，禁止用通用UndoStack.exec/seed冒充。panel历史adapter转调apply/depths。
- HTML编辑删除路径在 `:136170` 把 `model.serialize()` push到undo并清redo，再变更模型。
- 主MegaEditor在 `:176770` 起先判断canvas操作栈，按kind逆向/正向应用；操作包含move/add/delete/rename/resize/print/paper/guides/radius/cover/order、所有annotation操作和page/tweak等。
- `:177045–177230` 的keeper/host协调各artboard的history，在当前page外也能加载或切换到需要undo的artboard；跨artboard move有atomic refusal与history changed提示。
- `:177338` 再次明确 “mega-editor history is snapshot-based”；主undo先尝试canvas历史，之后尝试artboard历史。
- 历史并不是粗暴复制整张画布每次覆盖，代码中会核对entry是否仍存在、文件history epoch/depth、other editor改动以及redo可达性。具体冲突与服务端同步机制仍需协议层分析。

## 导出：HTML ZIP是真文件，PNG是DOM截图

导出菜单在 app.js `:151650–151739`，包含PNG 1×/2×、单artboard PDF、HTML ZIP、全部/选中artboards PDF。

HTML ZIP路径是 `Tze`（`:179960`）：flushPending，递归收集所引用的artboard与文件，读取/补齐资源、改写目标内容，打包进ZIP。`:180015–180017` 明确添加 `support.js`、`vendor/react.js`、`vendor/react-dom.js`；还生成 README。这说明HTML导出保留可运行内容和运行时，不只是导出截图。

PNG/截图机制：

1. clone真实DOM并写入computed style（app.js `:68511`有原始注释）。
2. 内联图片、字体，去掉编辑outline/overlay，处理动画冻结、selection/root以及背景。
3. XMLSerializer序列化，包进SVG foreignObject（`:68612–68620`）。
4. 把SVG作为Image载入，再画到canvas（`:68672–68717`）。
5. 可裁剪alpha bounds、调quality/降分辨率满足体积上限。
6. PDF可带测量出的text runs、link rectangles与pagination bands；`:68639`附近按不切文字/媒体的窗口分页，回传pg/pt/t/tb等元数据。

这些细节意味着浏览器字体、跨域资源、动画稳定性、iframe可见性都会影响导出；bundle内含相应错误/降级路径，不是简单调用浏览器print。

## 仍保留的源码与技术栈线索

- `app.css:1–12`：直接称为design editor，说明使用Claude Design System（CDS），`components/colors.ts`为typed JS mirror。
- `app.css:24–27`：`picker.ts`、`guest/api.ts`、`dc-runtime/helmet.ts`共享画布背景值。
- `app.css:76–90`：`host/camera.tsx`、`host/MegaCanvas.tsx`。
- `app.css:228`：`untrusted/note-text.tsx`。
- `app.css:267`：明确的 `tailwindcss v4.3.3` banner。
- app.js `:61047`：supportJs中保留 “GENERATED from dc-runtime/src/*.ts … bun build.ts”。
- 主编辑器的React与ReactDOM version均为19.2.7（app.js `:794`、`:969`）；用于导出artboard的支持运行时另内嵌React18.3.1 UMD，真实guest dc-runtime内也有React18构建。宿主与guest运行不同React副本，不能把内嵌export版本混为主编辑器版本。
- 本次保存的app.js无 `sourceMappingURL`/`sourceURL`，常规源码文件边界已合并、许多自有符号已压缩。格式化还原控制流与字符串，不等于重新得到原始TypeScript、注释、Git目录或服务端源代码。

## 对复现工作的具体启示

可依据已提取代码实现同类技术路径：

1. 先定 Design/Page/Artboard布局与files内容字典；artboard HTML各自隔离运行。
2. 设计HTML模板模型，编号与可序列化变更分离，不以live DOM当唯一事实。
3. 相机用单世界层transform，控制点/标题反向缩放；高频指针走直接DOM+rAF，静止后同步业务状态。
4. 注入picker统一hit test/measure/inline edit，和host用typed事件/请求ID通信；host验证消息source/origin、模板代次/选区和编辑权限。
5. 预览与持久提交分开，所有取消能恢复，HTML/props/script与canvas布局分别记历史并协调跨artboard事务。
6. 导出管线应复用实际运行HTML，先稳定化、内联资源，再foreignObject栅格化；HTML ZIP同时带support runtime。

以上是根据前端实码得到的复现架构，不代表已完成或已授权在YouDesktop产品中引入实现。当前工作仅落在忽略目录的研究/还原成果中。
