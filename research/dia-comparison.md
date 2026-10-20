# Dia 正版画布现场对标

观察日期：2026-10-20（本轮任务）。目标为 [Files grid directions](https://claude.ai/artifact/5ZbyQywWA1edfqHDeTtVZJ#artboard-3a36b3d1734f)。

本记录使用 `cua.getApp('company.thebrowser.dia')` 读取已登录 Dia 的原生无障碍树，并在单独标签页中打开目标。仅执行选择元素、切换面板、展开编辑入口、查看右键菜单等操作；没有输入提示词，没有发送 AI 请求，没有改宽高、文字、CSS 或其他原作品数据。没有保存登录信息、组织标识、聊天历史、私人标签标题或全窗口截图。唯一检查过的图像在内存中裁掉浏览器侧栏、顶栏和账号区，只保留目标画布。

证据层次：以下「正版」来自本轮 Dia 实际 UI；「Demo」来自 `demo/src/components/` 及对应模型源码的静态核对。本文不把 Demo 源码核对写成浏览器交互验收。

## 现场看到的结构

页面外层是 Claude Artifact 宿主，内层是 `*.frame.claudeusercontent.com` 编辑器，再由 `about:srcdoc` 展示画板 HTML。原作名称是 `Files grid directions`，画板名称是 `Chosen · A layout with D folders`，文件提示为 `Composed.dc.html`。

当前选中画板时显示 82% 缩放，宽 1280、高 1420；其正文是 Atlas Redesign 文件网格。原作与已捕获项目的标题、文件名、画板尺寸及可见内容一致。这能证明本轮操作的对象与取证项目一致，不能据此推断远端服务已被还原。

## 逐项对比

| 区域                | Dia 正版现场证据                                                                                                                                                                                                              | 当前 React Demo                                                                                                                                                                                                                               | 差异与边界                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 工具条              | Page 1；Select、Hand、Text、Artboard、Note；Pencil 及更多绘图；Rectangle 及更多形状；Play；Properties；缩放菜单                                                                                                               | Select、Hand、Text、Rectangle、Note；新增画板按钮；Inspector 开关；缩放与 fit                                                                                                                                                                 | Demo 没有原作 Artboard 绘制工具、Pencil、其他形状及 Play。不得把这些写成已还原。                                                                 |
| 画板选中            | 标题、四角选择框；打开画板全窗；Export 下拉                                                                                                                                                                                   | 标题拖动、选择框、右下角 resize、fit                                                                                                                                                                                                          | Demo 的标题 fit 按钮不等价于原作打开画板全窗。Export 尚未补齐。                                                                                  |
| 图层                | 原生 `outline Layers`；树形层级；展开/折叠；每层 Hide；选择 h1 后自动展开祖先                                                                                                                                                 | 扁平 depth 列表、可点击 tid；可反映选中                                                                                                                                                                                                       | Demo 尚无折叠、隐藏、同级语义分组和自动展开祖先。                                                                                                |
| 画板属性            | Width、Height、Height actions；Print mode Flow/Fixed；Paper Letter/A4；Background；Radius 与逐角编辑；Layout guide                                                                                                            | Name、W/H/X/Y、文件名、删除画板                                                                                                                                                                                                               | Demo 只有几何和基础元数据。打印、纸张、背景、圆角、布局辅助尚未还原。                                                                            |
| Code：选中画板      | Code 标签保持选中，内容仍显示 Artboard 属性                                                                                                                                                                                   | 已按现场观察改为回退 Artboard 基础属性                                                                                                                                                                                                        | 仅基础几何与元数据；原作打印、背景等画板属性仍待还原。                                                                                           |
| Code：选中 h1       | `CSS and attributes` 可编辑区域；h1 的 margin、font-size、line-height、font-weight、letter-spacing；继承自父 div 的 font-family、color；Select parent 和 Set on this element                                                  | 只编辑 inline CSS，显式 Apply；显示 tag/label/tid                                                                                                                                                                                             | Demo 尚未显示属性、继承来源及把继承值写到本元素的操作。现场只读取原作内容，没有测试原作 CSS 提交时机。                                           |
| Properties：选中 h1 | Size；Width/Height 的 Hug 模式；Position Inline；Grow；Padding、Margin 与分侧编辑；Text style、Font、Weight、Size、Line height、Letter spacing、Color、Align；Fill、Opacity、Radius、Border；Effects、Export、Advanced、Debug | 已补 19 项 CSS 字段：display/position/width/height/gap/flex-grow、padding/margin、font-family/size/weight/line-height/letter-spacing/color/text-align、background-color/opacity/border/radius；computed 作 placeholder，blur 提交真实属性回调 | 尚无 Hug/Fill 等语义模式、分侧/逐角编辑、Text style token、Effects/Export/Advanced。不是完整原作属性面板。此处为源码接入证据，待浏览器主链验证。 |
| Tweaks              | 真实空态说明本设计没有 tweakable controls，用户可描述需求让 Claude 添加；此标签下隐藏 Layers                                                                                                                                  | 真实能力边界说明；已按现场观察隐藏 Layers                                                                                                                                                                                                     | 没有可声明为已工作的 tweak 控件。AI 添加控件依赖宿主能力。                                                                                       |
| 右键菜单            | Element actions：Cut、Copy、Copy as PNG/SVG/HTML、Paste、Duplicate、Move、Group/Ungroup、Flip、Detach、Wrap in flex/grid、Delete；部分项按选择禁用                                                                            | 无原作右键菜单                                                                                                                                                                                                                                | 现场查看的菜单里没有 Ask Claude 项。未观察到不等于全产品不存在。                                                                                 |
| AI 编辑入口         | 页面外层 `Start chat with Claude` 按钮；点击后进入聊天工作区，右侧仍是原 Artifact                                                                                                                                             | 无 Claude 宿主聊天                                                                                                                                                                                                                            | AI 编辑入口在 Claude 宿主层，不能用本机画布保存代替。                                                                                            |

## AI 编辑入口的实际观察

点击 `Start chat with Claude` 后，页面先进入 artifact 的 `chat` 路径，随后进入既有聊天工作区。实际可见：

- 左侧聊天输入框 `Write your prompt to Claude` 为空，`Send message` 禁用。
- 右侧 `Artifact panel: Files grid directions` 内继续嵌入同一画布，仍能选择标题。
- 嵌入地址的 host capability 名称包含 `context-card`、`context-send`、`vouched-send`、`chat-beside`、`viewer-context` 等。这里只记录能力名称，不保存带身份上下文的完整地址。
- 本轮画布工具条和标题元素右键菜单没有出现单独的 AI 光标工具；聊天输入框是实际看到的 AI 入口。没有输入、发送或尝试调用这些宿主能力。

「AI 上下文发送由宿主提供」是结合宿主按钮、导航后 UI 和 capability 名称得出的推断；本轮未发送请求，所以不能据此声称已经验证元素上下文如何编码、远端如何执行或生成结果如何写回。

## 本轮 Demo 修正与剩余差异

1. `TemplateModel.setText` 拒绝包含子元素的容器。Properties 已改为读取模型提供的 `textEditable`，只有文字叶节点可编辑，容器显示明确说明；没有删除子层来迁就 UI。
2. Inspector 已补单一 tab stop、左右/Home/End 键盘切换及焦点移动。
3. Tweaks 已隐藏 Layers，保持真实空态。
4. 画板选中时，Code 已回退到画板基础属性。
5. 新增 `StyleFields`，布局、间距、文字和外观共 19 个主要字段只负责表单草稿与 blur/Enter 意图；Esc 取消，样式解析/保留其他声明由 Service/模型处理。UI 没有复制 CSS 业务算法。
6. 模式化属性 UI、继承 CSS、树折叠/隐藏、右键菜单、绘图/形状、播放与导出仍在差异清单。没有协议/模型实现前，不增加只表现成功的控件。

以上 UI 修正是源码层完成记录。具体浏览器链路、保存、撤销与 Guest 代次验证以主集成报告为准，不在此提前签认通过。

## 操作结束状态与限制

本轮尝试回到原始 Artifact 地址后，下一次原生状态突然显示另一条 `127.0.0.1` 的 YouMind Debug UI 活动标签，且标签清单中仍有目标 Artifact。无法从这次观察判断是用户还是其他并发任务切换了 Dia，因此立即停止原生输入，避免干扰其他工作；没有继续操作或截图该页面。

原作品内容没有收到本轮编辑或 AI 发送操作。面板/元素选择属于可恢复的视图变化。本轮没有执行原作保存、导出、联网生成、协作或版本恢复，也没有将 Agent 操作记录作为人类产品验收。
