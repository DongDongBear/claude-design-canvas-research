# TypeScript Demo：React、Guest 边界与 HTML 保真复核

范围：独立只读审查 `demo/src/components/`、`demo/src/guest/`、`demo/src/style.css`、`demo/src/contracts.ts`；为追接口读取 App 和模型消费点。未修改实现 owner 文件，未运行像素/纯展示自动化，也未用浏览器代替主任务验收。采用 `vercel:react-best-practices` 的组件、effect、事件、可访问性与重渲染检查项。以下为本次 owner 冻结后源码的静态复核，最终浏览器证据由主任务维护。

结论：当前审查范围没有尚未处理的静态阻断项。发现的问题已由对应 owner 整改；下列记录区分代码复核、业务契约用例与需浏览器确认的层面，不将其写成原产品验收通过。

## 已通过的边界

- React 组件按职责分文件，组件未内嵌定义其他组件；大部分状态、保存、历史与元素修改交给 DesignService / TemplateModel。App 用 useSyncExternalStore 订阅事实，用 useMemo 固定动作绑定。
- Canvas wheel listener 有对应清理，使用 passive:false 是为了 preventDefault 接管画布滚动，属于有意设置。高频拖动目前只更新 Artboard 的临时 presentation；pointerup 才提交一次动作，pointercancel 丢弃预览，不会每个像素触发持久化。
- GuestFrame 同时验证 `event.origin === location.origin` 和 `event.source === iframe.contentWindow`；GuestService 对入站同时验证父窗口 source、origin 和命令结构。发消息指定精确 targetOrigin。不同画板以 file 为 React key，不会把 sibling iframe 的事件误归到当前画板。
- GuestService 的 window/document/surface listeners、ResizeObserver、MutationObserver、字体监听及 requestAnimationFrame 均有释放路径，dispose 幂等。Guest React effect 返回 service.start 的清理函数，可承受 StrictMode 挂载/清理/再挂载。
- 模板以 DOMParser 在 detached document 中解析，脚本不作为普通 script 执行；script/iframe/object/embed/base/meta 等删除，on* 与 srcdoc 等属性删除，资源属性限制同源或选定 data image；Helmet 仅复制 style/title/合规 stylesheet。Logic 只接受空 renderVals 的静态形状，能力不足时明确显示错误。
- `guest.html` 已新增 CSP：拒绝外域 CSS import、字体、图片和 fetch，开发 WS 只准本机；与 sanitizeTree 合起来覆盖 CSS 中未改写的 url/@import。这条整改已静态看到；生产构建/HMR 是否仍正常由主任务浏览器验证。

## 发现、通知与整改状态

| 项目 | 具体影响与证据 | Owner / 状态 |
| --- | --- | --- |
| 同一模型的旧 Guest 文字回写缺文档代次 | 旧 iframe 文档已 post 的 text 消息可以排队；父 Properties 先将同 tid 的正文改成 B 并发新 document，旧 text(A) 后到时，receiveGuest 仅检查 tid 存在，会将 B 覆盖。跨模型唯一 tid 不能覆盖同模型存活节点的情况。 | 已整改并复核：contracts、GuestFrame、GuestService 带 revision，DesignService.receiveGuest 拒绝旧 text/pick/inspect/insert；model.test.ts 的同 tid 旧修订用例 覆盖同 tid 旧消息及当前消息。相机意图不受文档代次限制。 |
| 首版 Guest 无 CSP | style/helmet 原样支持 CSS，属性 URL 过滤不会阻止 @import/url 外域加载。 | ts_guest 已给 guest.html 加 CSP；静态整改通过。 |
| 容器正文操作提示与能力不一致 | Properties 对任何 element 显示可编辑 Text content，并称替换内容；TemplateModel 拒绝有子图层的元素，不能替换容器。用户会编辑整段容器文案后才收到错误。 | 已整改并复核：模型与 Guest 共用 isTextEditableElement；ElementDetails.textEditable 由事实层提供；Properties 的 textarea / Apply 按此禁用，并说明保留容器子层。 |
| 集成根容器高度与错误恢复条样式缺失 | App 新增 app-root 包裹，但初版 style.css 没有 app-root height，workbench 的百分比高度父级不确定；save-recovery 同样无定位样式，可能在 overflow:hidden 页面下被裁剪。 | 已整改并静态复核：style.css 已加入 app-root 全尺寸及 save-recovery 浮动恢复条；实际可见性由主任务浏览器确认。 |
| 宣传的快捷键尚未接入 | Toolbar / 空态提示 V/H/T/R/N 和 Shift+1，初版 App 仅处理 Undo/Redo，Guest 只处理 Space/文字提交。 | 已整改并复核：父 App 绑定工具/fit；Guest 发送有限枚举 shortcut，GuestFrame 验证，App 当前 onGuest 分支检查 revision 后处理 fit/undo/redo/tools；文字编辑态不转发全局快捷键。 |
| Inspector ARIA tabs 缺键盘行为 | role=tablist/tab 都在 Tab 顺序，没有 roving tabindex、箭头/Home/End 操作；这是可访问性语义与操作不一致。 | 已整改并复核：当前 tab 使用 roving tabindex，ArrowLeft/Right/Home/End 切换并移动焦点，tabpanel 可聚焦。 |

当前文档修订保护已按以下最小契约接通：父端每次发送新文档带递增/唯一 documentRevision；Guest 仅在接收 document 时更新当前 revision，并将其附在 pick/inspect/text/insert 事件中；父端接收时只允许匹配当前文档的编辑与选择事件，pan/zoom 可作为独立相机意图处理。这样拒绝的是已过期的源事实，而不是凭消息到达时间猜测谁更新。当前 revision 是整份设计的保守代次；Guest 对 HTML 相同的命令只推进代次，保留草稿。提交文字后将后续选择/插入意图延后到新代次，防止上一条写入与下一条操作乱序。这仍不是多人细粒度合并协议。

Guest iframe 的 sandbox 同时包含 allow-scripts 与 allow-same-origin，因此不能把 iframe 标签本身称为不可信脚本隔离；当前安全前提是严格的静态模板拒绝/过滤和 CSP。未来若启用原 Logic 或第三方脚本，须重新设计独立 origin/opaque sandbox 与消息协议，不能沿用此安全结论。

新增的 StyleFields 已交叉复核：所声明的布局、间距、文字和外观字段使用真实 onStylePropertyChange 回调，computed 值只作 placeholder；blur 才提交，Escape 通过 ref 标记取消后 blur，不会把取消值提交；草稿在元素 tid 改变时清理。模型负责 CSS 属性/值合法性，不在 UI 复制验证规则。

## 补充业务事务复核（已关闭）

GuestService.finishText 当前只有新文本同时不同于 edit.rendered 和 edit.original 才发 text 并等待下一 revision。它避免“显示空白与源码空白不同、但提交值恰等于原 source”时模型 no-op 没有新版本、后续 deferred pick/insert 永久等待。已复读 GuestService:343–355 与 GuestService.test.ts 的“恢复为源码原文”业务用例。

另复读到：父 select / document 中 selectedTid 变更会取消旧 deferredIntent，较新的父选区不会再被等待文字确认期间缓存的旧点击覆盖。对应 GuestService.test.ts 有回归。这里使用 jsdom 补 innerText I/O 模拟和消息序列来验证事务，不断言布局、宽高或像素。Guest owner 报告相关业务测试通过；本复核未重复执行其测试。

## HTML 保真边界

此 TypeScript Demo 是独立重建，不是原 app.js 的去混淆源码或 TypeScript 工程恢复。原始 runtime 的完整 DCLogic、事件、sc-for/sc-if、dc-import/x-import、动态 data-props、协作、权限与 Fast Edit 没有被此 React Guest 实现。Tweaks 明确说明原脚本和 Claude 服务不在范围内，报告不能将本地 demo 通过写成完整原产品恢复。

模型原样保留 x-dc 外侧 scaffold / Logic；没有编辑时应保持整个 source 字节，修改模板后由 DOM 序列化输出模板片段，可能规范化属性引号、实体、void element 等。Guest 的渲染还会删除 Helmet 包装、危险节点/属性、焦点行为，因此“保存源保留”与“浏览器渲染逐字/逐行为相同”是两件事；这份有限静态模板没有全量 HTML/DC 保真保证。

模型与 Guest 已共用 model/staticTemplate.ts 的 assertStaticDocument：TemplateModel 构造校验 与 guest/template.ts 均调用同一函数，动态 Logic/sc-* 属性在提交前被拒绝。原先“模型保存而 Guest 拒绝”的能力分歧已整改。

## 仍需浏览器核对的流程

主任务应覆盖初次挂载与 iframe ready、选中/取消、文字叶节点编辑及取消、容器限制、CSS 更新、拖移/缩放松手与取消、Undo/Redo、保存失败/重试、刷新后持久化、快捷键、关闭/恢复面板。需要重新加载 Guest 后确认 latest document 可重新握手，而不是只验证初次 ready。以上不以静态检查替代真实流程结论。
