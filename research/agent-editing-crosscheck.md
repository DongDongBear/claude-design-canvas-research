# Claude 紫色光标与 Agent 编辑链路：独立交叉核对

日期：2026-10-20。研究对象：本仓库已经保存的目标版本浏览器 bundle。先独立搜索 app、dc-runtime、Frame SDK 与 shell，再与另一研究 owner 交换定位结果；没有先依赖对方报告。只做静态读取，没有调用 Claude 模型、发送账号票据或改动远端作品。

## 结论

**原始发布包确实包含紫色 Claude 箭头与标签，但可见箭头不等于 Agent 在远端逐次移动鼠标。** 已找到三类需要区分的实现：

| 实现 | 数据来源 | 能证实什么 |
|---|---|---|
| Claude 专属 creation / working 光标 | 宿主传来的 working 布尔、画板清单与文件到达进度；空状态另用随机路径动画 | 是发布包本身的“Claude 正在工作”反馈，落点可由前端推导。 |
| 通用协作光标 | `room presence.cursor = {s,x,y,t,m?}` | 有实际坐标输入；协议支持 agent peer，但本次未捕获 Agent 发出坐标的真实运行记录。 |
| Fast Edit 中间预览 | 模型文本 → Worker DOM 副本 → html / op / done / preview | 能展示内容逐步形成；本次识别的路径没有传输鼠标坐标、点击或拖动轨迹。 |

因此可以准确复现原包的 working 装饰，但应将其标为**本机可控工作状态演示**；不能写成已接入真实 Claude Agent 或已重放它的真实鼠标动作。

## 1. 紫色与图标的直接证据

- 专属光标组件 `Z6`：`app.js:119741–119789`。其箭头与标签使用 `var(--cds-${tint}-500)`。
- `TDt`（158065）、`CDt`（158150）以及空画布 working 调用传入 `tint: "violet"`。
- `app.css:9073` 定义 **`--cds-violet-500: #6250d6`**。这就是本版本专属紫色 Claude 光标的直接颜色来源。
- SVG 图标 `YH`（`app.js:76806–76820`）是 **16×16** 的自绘箭头，填充传入颜色、白描边 1.2、round line join；`app.css:13042` 添加阴影。它是页面中的 SVG，不能称为系统鼠标指针。
- 协作者 1 的紫色另走 `--cds-editor-collaborator-1 → --cds-violet-450`，本版本为 **#7161e0**（CSS 9967、9072）。`who.c` 的旧色值只是映射 key，不能直接当作最终显示色。

仅凭“看见紫色箭头”无法区分专属 working 光标和协作 peer；需要同时确认 CSS class、标签以及数据路径。

## 2. working 状态只传布尔值，没有 Agent 坐标

Shell 接受来自可信 Claude 宿主的：

`{ __frame_chrome: true, cmd: "claude_activity", working: boolean }`

随后向作品 iframe 发送：

`{ __frame_claude_activity: true, working: boolean }`

证据在 `frame-shell-deferred-Br0hC66Q.js:3780–3839`、11722–11738、12172–12175。宿主来源检查见 12135–12137；转发使用作品 exact origin。目标还要满足 tokened 当前挂载等 eligibility 条件（11722）。

作品 app 的 `wmn`（101437–101485）检查 `event.source === parentWindow`，订阅 `__frame_claude_activity`，仅将状态设为 unknown / working / idle；首次订阅发 `__frame_claude_activity_ask`。这条消息**没有 x/y、元素 id、动作种类或 tool-call 轨迹**。

`mh`（101498）把状态提供给多个 UI 消费者；它也用于屏幕阅读器播报和加载反馈，不能把所有消费者都解释为光标动作。

## 3. 专属 Claude 光标的落点由前端计算

`FDt`（158288–158470）观察文档订阅与 `listedBoards()`，维护 awaited / boxed / arrived / cover 集合。后者（193676–193695）识别已经写入画布 index、但 HTML 文件尚未到达的画板。这使“Claude 正在生成这里”的反馈可以先于完整 HTML 出现。

`ADt`（158165–158197）输出以下状态：

- `box`：正在到达的占位画板；优先尚未 arriving 的条目，或最后一个 box。
- `rest`：本轮已有内容到达后，停在最后一个可用画板附近。
- `tips`：页面仍为空且处于 working，显示工作提示。
- `none`：不满足显示条件。

`CDt`（158138–158156）再把状态转成世界坐标：box 是画板左上加 **18 / scale**；rest 是画板左上向上 **72 / scale**。图标以 **1 / scale** 保持屏幕尺寸。代码不需要知道 Agent “刚点了哪个像素”。

`Z6` 支持 `glideMs`，CSS 13221 也提供 transform 过渡；但本版本找到的 TDt / CDt 两个调用点**都没有传 glideMs**，默认值为 0。不能把这些锚点变化描述成原包已经提供的平滑真实行动轨迹。

空画布还有独立装饰动画：`GSt`（101286–101364）用 `Math.random()` 初始化路径，通过弹簧积分更新标签和箭头的 transform，结束后隔一段时间再挑新路径。`A1e`（101366–101432）仅在 working 时挂载，并处理 reduced-motion。**这里的移动是本地生成的视觉反馈。**

## 4. 协作 presence 有坐标，但不能据此补出真实 Agent 行为

`mmt`（76967–77064）把指针发布为：

`cursor: { s: surface, x, y, t: timestamp, m?: message }`

发送经受限 room capability 的 `presence()`；有约 33 ms 的发送节流、坐标变化阈值、离开与 idle 清理。实际画布调用可覆盖默认阈值。相应 surface 区分 page 与 canvas，不能把各坐标空间混用。

`_in`（77066–77109）过滤 sameTab、surface、超时及非法数值，得到可显示 peer。`rre`（77154–77200）调用 toLocal 换算，再绘制箭头和姓名 / 短消息；CSS 13030 的 **80 ms linear** 过渡平滑的是收到的 peer 坐标。

Broker（18125–18162）将 `actor` 以 `agent:` 开头的消息标记为 `kind:"agent"`，其他为 viewer；Room SDK（`room.BYRHiLCc.js:730–745`）保留该分类。**这证实协议容纳 agent presence。**

但 app 的这条 peer overlay 不按 kind 分支，也没有在此生成 agent 鼠标坐标。本次材料未包含 Agent 实际发出 presence.cursor 的帧序列、动作关联或浏览器运行证据，因而不能进一步断言“Claude 编辑每个元素都会移动真实协作光标”。

Guest picker 的 `pointerPresence` / `pointerAt`（135346–135357）来自画板指针事件，经宿主换算坐标；名称本身不构成 AI 来源证据。

## 5. Agent 的批量文件修改与可见变化

慢速完整 Agent 的作者契约以 `canvas.json` 和 `.dc.html` 文件为修改对象。App 的文档层 `applyRemote`（192640 起）消费 changed paths / SHA，处理本机未保存修改、hold 与冲突，再通知订阅者；`V3`（101594–101600）单独识别 remote 更新，排除加载状态切换。

这条链可以概括为：

**远端发布文件变化 → 文档层核对版本与合并 → 编辑器采用 HTML / 布局变化 → guest runtime 更新渲染。**

App 的 `__dcUpdate` 调用生成见 90270；`dc-runtime.js:11478–11487` 分开消费 HTML / JS / props 更新。HTML 可流式刷新；JS 在流结束后求值，逻辑替换还保留部分 state。它解释“内容持续改变”的机制，而不是 Agent 用真实鼠标一步步操作属性面板。

## 6. Fast Edit 是另一条内容路径

`GBt`（196096–196114）接平台 sample 的流式文本；Fast Edit 让 Worker 在 DOM 副本上执行受约束的 jQuery 修改，再送回：

- `onHtml`：受影响文件的中间 HTML（202242）。
- `onPreview`：尚未完成语句的内容预览（202326）。
- `onOp` / `onDone`：结构操作与语句完成（202260、202308）。
- `onTouch`：本路径仅增加计数（202395–202397），**不是鼠标 touch 坐标**。

Ghost / preview 由 `data-fast-edit-ghost`、`data-fast-edit-preview` 包住独立 iframe（196225–196287），显示“正在形成的内容”；cover 时仅使用 CSS progress cursor。最终通过 `tLn`、模板与快照验证、flushPending / saveNow 进入保存链（203320–203368）。

本次捕获的已登录元数据中 `design_fast_edit:false`。静态代码证明功能存在，不代表目标页面已启用、模型服务已调用或远端保存 ACK 已验过。

## 7. 本轮能交付与不能声称的部分

可交付：原包紫色 / SVG / CSS、working 消息契约、creation 锚点与随机空状态动画、presence 坐标协议、远端文件同步与 Fast Edit 预览链的有据解释。

若 Demo 用受控本机事件演示原包的 working 反馈，应明确显示“本机演示”；模型驱动、真实 agent presence、远端发布与保存结果须另有真实消费者证据。当前材料不支持把演示生成的轨迹、鼠标点击或时间线当成 Anthropic Agent 的真实行动记录。

交叉核对结果：另一 owner 独立定位的紫色 token、SVG、Z6 调用点、working 布尔桥、creation 锚点及 peer presence 路径与本报告一致；未发现相反的已捕获 Agent 动作证据。
