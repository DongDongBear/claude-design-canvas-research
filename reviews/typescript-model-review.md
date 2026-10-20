# TypeScript 还原版：模型、协议与本机 I/O 独立复核

日期：2026-10-20。复核范围为 `demo/src/model/**`、`demo/src/contracts.ts`、`demo/src/services/**`，以及判断实际消费所必需的 App/GuestFrame/Artboard/GuestService调用点。只修改本报告；没有修改任何实现owner文件。此报告区别于 `architecture-review.md`：后者审核原捕获bundle的本机回放，本报告审核新写的React + Vite + TypeScript实现。

**本次模型、协议与本机I/O复核通过；已发现问题均已关闭。** 文档revision、同内容草稿保留、文字→选择ack队列、no-op以及Host较晚选择优先级已贯穿真实消费点；最终实际typecheck通过，7个测试文件的47项测试全部通过。activity接入与释放也已补审。该结论限于代码、契约和本机逻辑证据，不代替主代理的浏览器流程或用户本人验收。

## 实现与原画布的对应关系

| 能力 | 新TypeScript实现 | 与原始bundle的关系 |
| --- | --- | --- |
| HTML内容事实 | `TemplateModel` 在detached `<template>`中编辑，保存时移除`data-dc-tpl`，保留外侧HTML与Logic scaffold | 对应原`Vb`模型思想；不是恢复出的原TypeScript源文件 |
| 布局事实 | `parseCanvas/serializeCanvas`保存boards/order/title并保留未知原字段 | 对应原canvas.json布局和artboard HTML分开；未还原所有page/annotation规则 |
| 相机 | `DesignService.pan/zoomAt/fit`保存`{x,y,scale}`，UI世界层CSS transform | 对应原world transform与锚点缩放公式；未复制原完整camera controller |
| 元素测量与输入 | 受限同源Guest iframe读取DOM rect/computed，发送pick/inspect/text/pan/zoom/insert意图 | 对应原picker职责；不是使用242KB原picker或原动态React runtime |
| 模型/历史/保存owner | `DesignService`唯一管理模型、选区、快照undo/redo与保存状态，注入`DesignPort` | 继承职责边界，未复现原跨artboard协作历史与远端合并 |
| 本机I/O | `BrowserDesignPort`单key localStorage aggregate存canvas和files | 与replay的Python文件overlay是两个独立demo；不是原`self.publish`云端保存 |

原始证据参见 `analysis-canvas/findings.md` 与原bundle定位：Vb模板模型80264行、相机87943行、iframe147426行、原保存链65477/98760/191992行。

## 已核对的正确边界

- 构造器注入 `DesignPort`，Service初始化才执行load；React通过`useSyncExternalStore`订阅，App绑定层转发意图，不在组件中实现持久化。
- 内容编辑、画板增加/删除、undo/redo均先捕获模板事实；`TemplateModel.serialize`不保存内部tid标记。HTML外部Logic不在模型里执行。
- `BrowserDesignPort`的load首先验证保存envelope；坏JSON/schema/files不会被默认原件静默覆盖。保存以一次setItem替换canvas+files，quota/security异常抛给Service。
- 保存队列串行，以epoch、revision和disposed检查阻止迟到异步结果错误覆盖UI状态；错误如实显示，原模型保留，可重试。initialize现先等待旧save完成再load新scope，关闭了“仅过滤状态、旧持久写仍落地”的问题。
- GuestFrame验证消息origin及source，Guest也验证parent/source/origin；完整未知payload在UI边界判别后才交给typed Service。保存Port对unknown canvas和files进行I/O校验。
- 新增`model/staticTemplate.ts`由模型与Guest共享能力拒绝；动态binding/sc-*与非空动态Logic不会出现“模型保存成功、Guest拒绝渲染”的假成功。

## 审查发现与修复状态

1. **拖动高频写入与历史耗尽：已修。** 初版Artboard每个pointermove调用updateBoard，使每帧生成全量模板快照、历史与localStorage保存。已独立读取最终Artboard diff：move只更新本组件presentation，pointerup一次onBoardChange，pointercancel丢弃。纯坐标预览不改变领域事实，一次拖动只提交一次模型变更。
2. **节点删除后tid复用：已修。** 当前TemplateModel用实例前缀和递增tid，存活节点沿用原标识，删除标识不移交另一节点；重建模板获得新前缀。
3. **合法属性值中`>`破坏模板切分：已修。** 当前templateRange scanner处理引号、注释和raw-text元素上下文，不再用第一个`>`作为起始标签边界。
4. **void元素文字无法序列化：已修。** setText明确拒绝void标签；含子图层的容器同样拒绝整体textContent替换，避免破坏结构。
5. **模型与Guest静态能力不一致：已修。** 两端共用assertStaticDocument，动态模板在模型提交之前拒绝；测试fixture需同步采用合法静态Logic，另测动态Logic拒绝且不执行。
6. **旧scope的异步保存仍能改写持久层：已修。** initialize先flush旧写再读取新scope，迟到load与状态回写仍受代次限制。
7. **同一tid的旧文档文字消息：已修。** contracts要求document命令与非ready事件携带revision；Canvas→Artboard→GuestFrame传当前revision，GuestService记录并回报；DesignService.receiveGuest对text/pick/inspect/insert先匹配revision，再查模型tid。实际重跑的旧revision文字测试证明旧文字不能覆盖较新的属性编辑，当前revision的文字仍可提交。pan/zoom不改内容，未被不必要拒绝。

8. **相同HTML的revision更新取消未提交草稿：已修。** GuestService按file+html判断sameDocument；相同内容只推进revision/选区/tool，不替换DOM。实际内容变化才取消旧草稿并载入新文档。GuestService.test验证同一DOM节点和草稿保留，之后Enter使用新revision提交。
9. **文字提交紧接选择的异步代次竞态与无操作等待：已修。** Guest提交文字后记录awaitingRevision，后续pick/insert缓存到新文档确认后重放；外部更新选择会清理过时缓存。finishText同时比较rendered与原source文字，无内容变化不等待不存在的ack。测试覆盖text→pick新revision、恢复原文no-op、外部选择优先与非父窗/非同源拒绝。
10. **Host较晚选择被文字提交拉回（P2）：已修。** Service的text分支只修改模型文字，保留当前selection。新增`model/selection.test.ts`使用真实注入Port consumer：Host选择B后提交A当前revision文字，断言A落盘、selection/element仍B、历史与保存状态正确；本复核独立执行通过。Guest侧“不发旧pick”与Service消费回归两层现在均覆盖。

## activity与快捷键最终接入

- main创建独立ActivityService并注入App；App把boards/camera投影交给activity，经Workbench传至Canvas，Overlay/Controls放在world transform之外的屏幕层。坐标消费位置正确，避免重复scale。
- ActivityControls明确标记“模拟事件 · 不调用 Claude”；activity不接DesignPort、不修改设计文件、不把模拟状态写进localStorage。App卸载调用activity.dispose，后者取消wake/idle计时并清除listeners。
- `research/agent-cursor.md/.json`来自rea_workflow的独立源码对照：deriveActivity对应原ADt，屏幕定位对应原CDt+world transform。该owner没有执行tests；本复核实际执行的47项中包含10项activity状态/时钟/释放测试，不能把二者混写成其独立测试通过。
- 当前App是单页消费者，未提供artboardsHere/page/frameless信息；ActivityService支持显式artboardsHere，但不能把当前接入称为完整多页生成协议。原动态模型/协作仍未还原。
- GuestFrame校验shortcut动作白名单及source/origin，Guest回报revision；App先匹配Service当前revision，再把undo/redo/fit/tool意图交给Service/视口绑定。App和Guest都会避开编辑输入及composition，dispose移除监听。只补审协议消费，不据此替代实际键盘浏览器验收。

## 性能及能力覆盖边界

- `DesignService.refresh`目前在inspect/pick等读取路径也重新生成每个模板的preview并扫描layers；单个23KB参考作品可运行，但多画板/大DOM下是已知扩展成本。可按模板变更失效缓存preview/layers；这不是当前单画板研究Demo的阻断项。
- 历史是至多100个全量snapshot，localStorage也保存整包aggregate；不是原实现中按文件dirty、冲突重试和跨artboard历史协调的性能规模。
- 只支持静态x-dc与空Logic；原dc-runtime的动态props、renderVals、sc-for/sc-if、x-import、流式生成、热替换状态保留、关键帧等未重建。新增文字/矩形/便笺属于静态HTML编辑子集。
- 画板布局、选区、文本与CSS的TypeScript源码可审查，但不能因UI相似就称为原Claude完整源码还原，也不能把localStorage成功写成云端/生产保存成功。

## 验证记录

- 本复核实际执行 `npm run typecheck`：通过。
- 首次实际执行 `npm test -- --reporter=dot`：9/18失败，并有2个未处理rejection；根因是能力校验修复后旧普通fixture仍含动态Logic副作用。已立即通知model和测试owner；要求修fixture与拒绝场景，不准放宽能力规则换通过。
- 前轮修复后实际执行27项测试通过；本次activity/Guest补审及最后Host选择窄修后再次执行 `npm test -- --reporter=dot`：7个测试文件、47项全部通过，无未处理rejection；再次 `npm run typecheck` 通过。中途曾发现测试helper把document命令返回值宽化为GuestCommand导致TS分支错误，owner收窄helper类型后本复核重验通过；没有放宽实际协议。
- 已补读最终revision消费点：contracts.ts的GuestCommand/GuestEvent，Canvas→Artboard→GuestFrame.props，GuestService.post/receive/dispatchIntent/finishText，DesignService.receiveGuest。统一格式化后不沿用旧行号；边界消息具source/origin检查，内容消息经revision过滤。
- 模型回归覆盖quoted `>`、假标签/脚手架保留、void文字拒绝、动态能力拒绝、稳定tid/重建scope、同源码no-op、旧load/旧save、save失败重试及localStorage坏envelope。高频拖动的修复为实际组件diff审查，未新增像素测试。

本报告不代替浏览器业务流程或用户本人验收；浏览器结果由主代理另行记录。

最终复核源码指纹（SHA-256）：

| 文件 | SHA-256 |
| --- | --- |
| `demo/src/model/DesignService.ts` | `a56af08877edf1803882e682d6dadeeae06c94d1bc8e9478c645a5724d84005b` |
| `demo/src/model/TemplateModel.ts` | `a49716c3ab5727f91bbf9fe8c888f63a03601318dc7bd00374e7c262bf667e47` |
| `demo/src/model/canvas.ts` | `5e13b7ec40da8948b54e54c6ddd633f8c13e5447aa6e6432a4b42923f36d1e18` |
| `demo/src/model/staticTemplate.ts` | `a26c33c2700e9f8693869b09f75a4d48422d0e077732b0e2260cb5569098d7a4` |
| `demo/src/contracts.ts` | `a465b4b05785f7353486d478c8ca36a5de1ad01830ccb906b69353ed24adc1f2` |
| `demo/src/services/BrowserDesignPort.ts` | `43561fd640ca85a0e72c760b5a6e486de99787f691bb62e85db5ec45b7190074` |
| `demo/src/App.tsx` | `6305363a4ae73706fb048ade1b58eedb8edd4be0d79b270974028b8f858b982f` |
| `demo/src/components/Workbench.tsx` | `f24e63b727c10a25bfacb950357d394e1b89ff010bc4cf37c1f58115a46c9c56` |
| `demo/src/components/Canvas.tsx` | `5bf780c962e762ff830517f16c270c0480b7448bc5c64b7b1b718045d429dbca` |
| `demo/src/components/GuestFrame.tsx` | `a34517d56c44e38758a377d643dea85ef35528062d1826102468a49b51ae6369` |
| `demo/src/guest/GuestService.ts` | `9a8a1929053faed5a88cb5f38f5d9ad152d0c5a089fb25d3d5ef7ba5087edad7` |
| `demo/src/guest/GuestService.test.ts` | `8f27ce711ea0a5a2c97e329b5e64060e4da3c201c03d48f07fadd6f230857934` |
| `demo/src/model/selection.test.ts` | `d6d3a86c6d35c0b64f4bbded4f7102e1ea9a91d63a3a264f04f4d1918a6ace85` |
| `demo/src/activity/ActivityService.ts` | `31d36cba507db094cc3bd6b912dff7046f5f33d8fb4d4ef3aeafd1886d335b47` |
| `demo/src/activity/activityState.ts` | `c7ac3093f72114df8ee0cc2b4f4a40d0d828b2311f9067ecf3b056ea905c1d3b` |
