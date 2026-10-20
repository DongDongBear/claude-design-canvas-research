# 紫色 Claude 光标与 Agent 编辑链路

结论：已经定位到原包里的紫色 Claude 光标。它是 React 渲染的 HTML/SVG 叠加层，专属色为 **`#6250d6`**。当前取得的代码能证明两种 Claude 工作提示，以及另一条通用协作指针链；**不能将它们直接称为模型实际执行的系统鼠标轨迹**。Fast Edit 的实质是模型流式生成 jQuery 语句，在线程隔离的 DOM 副本上执行，再把 HTML 结果应用回设计。

本次只读本地取证文件，没有调用模型、发布 room 事件、编辑真实画布或触发上游保存。所有片段、来源 SHA-256、行号和判断分类保存在 [agent-cursor-evidence.json](../research/agent-cursor-evidence.json)。下面的 E01–E54 对应该文件中的证据 ID；行号属于已保存的格式化副本，JSON 同时保留原始制品哈希。

## 1. 紫色、图标和标签均有原始实现

| 对象 | 真实样式或实现 | 证据 |
| --- | --- | --- |
| Claude 专属颜色 | `tint: "violet"` → `var(--cds-violet-500)` → **`#6250d6`**（RGB 98,80,214） | app.js 158040/158066/158151；app.css 9073；E01/E03/E07 |
| 箭头 | `YH`：16×16 SVG，共享固定 path，填充上述紫色；白色描边 1.2、round join | app.js 76806–76822；E02 |
| 箭头阴影 | `drop-shadow(0 1px 1px #00000040)` | app.css 13042–13045；E05 |
| Claude 名签 | 白字、紫底，11px 字体、16px 行高；pill 圆角；相对箭头偏移 left 12px、top 14px，padding 1px 6px | app.css 13046–13059；Z6/uDe 119704–119800；E01/E05 |
| 光标容器 | `.mc-claude-cursor`，绝对定位，`pointer-events:none`；不是 OS cursor，也不会靠自身接收点击 | app.css 13213–13257；E06 |
| 另一种协作紫色 | `who.c="#7a6ba8"` 是映射 key → collaborator 1 → `--cds-violet-450` → **`#7161e0`** | app.js 76833–76854；app.css 9967/9072；E02/E04 |

因此不能把 `#7a6ba8` 写成 Claude 专属箭头的最终颜色。用户所述“紫色、标着 Claude”更吻合专属组件，但一个 `who.n="Claude"` 的协作 peer 也可能显示紫色；没有当时的动态记录，颜色回忆无法唯一判定是哪条链。

## 2. Claude 专属光标由工作状态和画板进度驱动

`Z6` 是专属组件，定义在 [app.js:119741](../analysis-canvas/formatted/app.js:119741)。捕获的整个 app 中只发现两处调用：`TDt` 158065（空画布提示），`CDt` 158150（画板旁定位）。两者都传 violet，**都没有传 `glideMs`**；该参数默认 0。组件虽然支持 `data-glide` 缓动，此处不能声称存在模型指针平滑轨迹。（E01/E07）

`CDt` 在世界坐标叠加层中寻找目标画板，锚点直接计算：

```text
box:  (board.x + 18 / scale, board.y + 18 / scale)
rest: (board.x,              board.y - 72 / scale)
glyphScale = 1 / scale
```

这让箭头在缩放画布时保持屏幕尺寸。`rre` 协作光标与 `CDt` 创建光标在同一个 world overlay 内相邻挂载，因此外观接近，容易被当成同一系统。（app.js 183165–183196；E23）

真正决定位置的是 `ADt`，输入包含 `working/heard`、`editing`、当前页、待到达画板、文件到达状态与时间，不是 mousemove/click action：

| 条件 | 输出 |
| --- | --- |
| `on=false`，或不在编辑状态，或当前没有有效工作/进度 | `none` |
| 当前页有待到达画板 | `box`，优先第一个尚未 arriving 的画板，否则最后一个 pending |
| 正在工作、当前页为空且没有 pending | `tips`；本轮从未有待到达画板时才轮换提示 |
| 正在工作、已有内容，本轮有画板到达/创建，且有 `lastHere` | `rest`，指向当前页最后一个非 frameless 画板 |

`FDt` 的 `creating` 在挂载时根据功能开关、`doc.listedBoards()` 能力，以及初始空画布或已有 awaited 画板确定。`listedBoards()` 来自 index/manifest 中已经声明、但内容文件尚未到达的画板；这解释了为什么生成期间可以先出现占位框和 Claude 箭头。`V3` 只把 `remote===true` 且不是加载状态切换的文档更新当成远端进度。（app.js 158165–158392、193676–193696、101594–101602；E08/E10/E12/E13）

`heard` 在首次收到 working 后保持 true。收到 idle 后 `ETn` 等约 2 秒再结束；尚未收到可信活动信号时，文件进度仅提供 10 分钟占位有效期、90 秒光标有效期。提示文本前 3 秒为 “Claude is working…”，之后每 5 秒轮换；这些计时属于 UI 状态呈现，不是推理步骤数。（E08/E09）

活动通知的 wire 可以完整恢复：

```json
{"__frame_chrome":true,"cmd":"claude_activity","working":true}
{"__frame_claude_activity_ask":true}
{"__frame_claude_activity":true,"working":true}
```

第一项为宿主→shell 的上游状态；第二项为内容页向父窗询问当前状态；第三项为 shell→内容页的结果。shell 的 `ta` 还检查 frame eligible/tokened、挂载/导航，内容页 `wmn` 检查 `event.source===parent`。不能把任意页面注入一个布尔值称作真实 Agent 工作证据。（app.js 101435–101505；deferred.js 3780–3839、11722–11740、12169–12179；E11/E15–E17）

## 3. 确实还有一段“像人在移动”的随机动画

`A1e` 的 working 空态没有使用模型坐标。它挂载 `GSt`，用 `Math.random()` 播种 `HSt`，生成 `zSt/VSt` 路径；`C1e` 在曲线上求目标位置，再以常量 1600/76 的弹簧积分产生跟随效果。目标和箭头分别写入 `style.transform`，结束后等待随机 12–26 秒再换路径；reduced motion 会关闭运动。（[app.js:101286](../analysis-canvas/formatted/app.js:101286)，E14）

它显示紫色箭头及 “Claude is working…” 标签。**这一段是可直接证明的装饰运动，不能当成 Agent 实际正在选中、点击某个元素。** 若用户看到的是工作空态附近飘动的紫色指针，这条实现比“系统鼠标自动操作”更符合源码。

## 4. 通用 room presence 支持移动和协作选中，但尚未证明实际 AI 用它发指针

编辑器先获取 `claude.use("room")`，旧接口回退至 `claude.room`。发布端 `mmt` 写 presence patch；接收端通过 `onPeers`→`xtn`→`bg`→`_in`→`rre` 渲染。可重建数据形状如下，时间占位必须替换为当前毫秒数：

```js
room.presence({
  who: { n: "Claude", c: "#7a6ba8" },
  cursor: { s: "canvas:<pageId>", x: 280, y: 180, t: Date.now(), m: "短消息" }
});
// 清除：room.presence({ cursor: null })
```

`s` 是 surface，嵌入状态还带 `memoryScope + "/"` 前缀；主画布为 `canvas:<pageId>`，画板内为 `page:<规范化文件名>`。主画布 `onPointerMove` 用 camera pan/scale 将 client 坐标换成世界坐标后再发送；不是未经转换的屏幕坐标。（app.js 65981、142856、155416–155428、175130–175175；E21/E22）

主画布 reporter 使用 `minDelta:2`、约 33ms 限流；peer renderer 只匹配同 surface、有限坐标且非 sameTab 的记录，15 分钟过期，60 秒后淡化。移动动画为 CSS `transform 80ms linear`。名字来自账号缓存或 `who.n`；短消息使用 `cursor.m`，另有保留和淡出计时。（app.js 76967–77198；CSS 13023–13064；E05/E18–E20）

broker 接到 `room:presence` 时，以 actor 前缀 **`agent:`** 分类 agent/viewer，并向内容 frame 发：

```js
{ __frame_room_ev: true, ev: {
  arm: "presence", peer, by, isMe, sameTab,
  kind: "agent", p: { cursor: {s,x,y,t}, who: {n,c} }
} }
```

这是“room 协议可以承载 agent presence”的直接证据。但 app 的 `xtn` 没保留 kind，`_in/rre` 也没有专属 agent 分支。当前没有捕获到实际 AI 会话发出上述 cursor，所以只能说**结构上支持**，不能宣称已经证明生产 AI 的指针轨迹来源。（broker 17590–17614、17755–17772、18122–18172；E24–E26）

选中是另一份 presence 数据，不是 cursor 的 click 标志：`presence.context.selected` 保存元素引用，`selectedArtboards` 保存整板引用；`Iin/Tyt/Eln` 按同页、模板 tid 和本机矩形绘制协作 selection rings。`cursor` 自身没有 observed click/down/up 或 selection 字段。当前同样没有动态证明 AI 发过这些选择数据。（app.js 77500–77563、88170–88242；E46/E47）

## 5. Agent 知道用户在看哪里，但上下文刻意去掉可见指针

`AOt` 将画布状态作为 `room.presence({context:...})` 发布，预算约 3 KiB；超过预算时采用 lean 投影或清除。app 实际构造的字段与随包 `view-state.md` 一致：

```text
mode, page, pageName,
visibleArtboards, selectedArtboards,
dirty, selected, selection,
erroredArtboards, firstError,
edits（每个 tab 的手工编辑计数，发布器补充）
```

`visibleArtboards≤20` 是当前视口相交画板列表，`selectedArtboards≤20`；`selected≤20`，形如 `<encodedFile>.dc.html#<tid>:<path>`；`selection≤5` 附 `{id,kind,label}`；errors≤10。元素 tid 从 `<x-dc>` 内所有元素 DFS 编号，path 为 element-child-index 路径；循环选择模板节点，import 内选择父文件的 import 元素。Agent 可以据此读取对应 HTML 并定位元素，**该公开 context 没有 camera/x/y/zoom**。（app.js 175179–175255、143102–143194；view-state.md 61–139；E36/E37/E53/E54）

更关键的是 broker 的实际过滤：`CC.publish` 去掉 `cursor/follow`，`OC` 再去掉 who；`sendToClaudeSession` 附带 presence 的 `mu` 也去掉 `cursor/who/follow`。这与文档明说 pointer/display name 不进入 `<artifact-view-context>` 一致。**用户看见光标不等于模型获得它，更不等于模型在控制它。**（broker 8846–8898、21675–21764；view-state.md 12–20；E38/E39/E52）

宿主桥的几个 capability 不能混为执行工具：

| 能力 | 观察到的作用与 wire |
| --- | --- |
| `viewer-context` | ambient 上下文；`{__frame_chrome_state:true,state:"viewer_context",mode:"ambient",uuid,context}`。宿主可用 `{__frame_chrome:true,cmd:"viewer_context",id}` 拉取，以 `re:id` 回应；变化约 500ms 限流 |
| `context-card` | explicit context card：同 state，但 `mode:"explicit",card`；单独声明和校验 |
| `context-send` / `context-send-held` | `sendToClaudeSession` / `canSendToClaudeSession`；data 为最多约 4 KiB 的 plain JSON；stage/send 行为分开 |
| `vouched-send` | 宿主已证明并有相应许可时的发送路径，可附 `vouched:true`；不是任意模型消息绕过浏览器手势的通行证 |

发送路径要求同步发生于可证明的 click/keypress；有来源、权限、限频与撤销状态门。相关消息有 `id/data/presence/deliver/senderActivated/heldSend?`。这些字段描述把用户上下文送入聊天，不是 Agent 编辑 HTML 的鼠标操作指令。（E38–E42）

## 6. 慢链改文件，快链在 Worker 中改 HTML 模板副本

**慢 Agent 的公开契约是文件级 read/edit/publish。** 捕获的 `SKILL.md` 描述 type 文件只读，用户项目写在 `project/`；index 为 `project/canvas.json` v3，画板各自是一份完整 `.dc.html`。修改先读取目标源文件，发布只发改动文件；布局/增删板/标题等变化才重新读取并发送 index，并发冲突需要重读重做。（E48–E50）

随包文档给出的接口形状包括：

```js
// 读文件
{ action: "read", url: "<canvas URL>", path: "project/Main.dc.html" }
// 一种文件映射发布方式
{ url: "<canvas URL>", root: "<scratch folder>",
  file_path: "<root>/project/canvas.json",
  files: { "project/Main.dc.html": "project/Main.dc.html" } }
```

`files[path]=null` 表示删除；另一种聊天工具用绝对路径列表。这里记录的是**随包契约文本**，未看到那次历史慢 Agent 的调用日志，因此没有把文档要求写成已发生的生产操作。

完整画板的程序契约是 **DCLogic / `text/x-dc`**，捕获文档没有 `DOMscript` 这个字面 API 名：

```html
<x-dc><button onClick="{{ pick }}">{{ title }}</button></x-dc>
<script type="text/x-dc" data-dc-script>
class Component extends DCLogic {
  renderVals() { return { title: "…", pick: () => this.setState({ /* … */ }) }; }
}
</script>
```

文档要求 classic JavaScript，无 TS/import/export；UI 放 `<x-dc>`，`renderVals()` 提供 flat 值、数组、handler 和 ref，另有 `sc-if/sc-for`、`data-props`、`$preview`。**画板代码里的 onClick 是作品自己的交互逻辑，不是 AI 发出的系统点击。**（format.md 112–165；E51）

**Fast Edit 则是另一条明确的流式代码链：**

```text
选中/评论+设计上下文 → sample capability → 模型文本 onText
→ 逐行 jQuery/selector handles → nonce 保护的 iframe → Worker DOM副本
→ html/preview/op/done/touch → ghost/preview → 编辑事务与保存门
```

原始提示 `sjt` 要求模型输出一行一个 jQuery statement，针对临时 element handles；`.css/.text/.attr/.append/...` 等改动作用在副本上。它明说副本没有布局，无法测量；作品脚本/设置、外部数据等超出快链能力时使用 `askClaude()` 委托更慢的大 Agent。（app.js 204718–204780；E35）

具体实现证据：

- `design_fast_edit` 功能开关与 `design_fast_edit_sample` 模型配置；tier `quick/default/complex`，effort `low/medium/high`，默认 quick；Worker 原字节有 digest 检查。（E45）
- sampler 的 host 内部 POST 为 `/api/frame/sample/call`，body 为 `slug/token` 加 `prompt` 或 `messages`，可选 `modelTier/model/effort/images/format/tools`。本研究没有读取实际 token 值或调用该接口。（broker 19390–19421；E43）
- `GBt` 包装调用与 AbortController；`onText` 将新增且完成换行的内容 feed 到 sandbox；`session.busy` 和 timer 管并发、取消、恢复。（E28/E34/E44）
- Worker 桥上行只有 `ready/beat/html/done/touch/preview/view/handles/op/error/log`；下行是 `chunk/flush/view/handles/end`，带 nonce 和父窗口校验。此执行协议没有 observed pointer move/click queue。（E27）
- `onTouch` 回调在宿主只做 `Ee += 1`。名称 touch 指执行触及画板的计数，不能解释为浏览器 touch/pointer 事件。（E30）
- 可见预览由 `OS/Ah` 和 `ZBt` 渲染 sandboxed iframe，原文标题分别为 “What Claude is making” 和 “What Claude has written so far”。跨 peer 草稿走 `room.emit("draft", {s,n,i,k,h})` 分片，再 `room.on("draft")` 组装 HTML；与 `presence.cursor` 是两条协议。（E29–E33）

所以在已取得的实现中，**编辑器可以让人看到“Claude 正在工作/这里正在变化”的紫色指针与逐步预览，而真正的快链修改来自代码执行，不需要先让一个系统鼠标选中元素再点击属性栏。** 慢 Agent 是否有未加载客户端或服务端的其他工具，仍然未知，不能把当前结论扩大为 Claude 所有模式。

## 7. 可重建边界与下一步动态验证

可以原样重建：`ADt` 状态投影、`CDt/Z6/YH` 视觉、working 通知桥、pending/arrival 生命周期，以及本地 fixture 驱动的 room cursor/selection 投影。演示中的 working、pending、arrival 或 peer 事件必须标为事件样本；不能以此伪称真实模型运行、真实 AI 指针轨迹或生产保存成功。

若需最终确认用户那次看到的光标，应在一次用户已授权的真实编辑期间同时记录：活动消息、对应 DOM class、room presence 事件和文档 remote 变化。`.mc-claude-cursor` / `.mc-claude-empty` 指向上述工作提示；`.mc-peer-cursor` 且 `actor` 为 agent、`p.cursor` 变化才是 agent presence 坐标的证据。选中环需另查 `presence.context.selected`，不能从指针位置推定点击。

本报告与 `primary_research` 的独立源码核查一致；文档契约另由只读子 Agent 核查，三套 `recovered-project/project-files/replay/editor` 的 SKILL、format、view-state 逐字节一致。**尚未动态证明：用户当时看到的具体分支、AI actor 是否实际发送坐标、慢 Agent 历史工具调用，以及上游编辑/保存结果。**
