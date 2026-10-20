# 首次提交与推送审查

范围为独立研究仓库的首个提交：公开发布物、字节恢复与可读副本、研究报告、隔离本机适配器、标准库文件服务、10项契约测试和GitHub Actions。用户已请求在GitHub建立项目并运行Demo；目标为DongDongBear/claude-design-canvas-research，用户最新明确授权的公开仓库，分支codex/research。YouDesktop代码及原工作区的无关dirty不在此次提交中。

## 架构适用性

Workbench/DI：不适用。该仓库不改变YouDesktop Renderer、Pane、Service、IPC、宿主清单或Electron身份；研究新增部分仅在独立loopback HTTP进程替换外部文件I/O。原画布算法、模型和保存队列保留，归档原件不属于我们新增的产品实现。具体接口与原消费者由architecture-review独立核对。

## 实际暂存审查

已读最终暂存的server、adapter、验证脚本、测试和CI diff，并对文档、原始/改写文件清单与独立review交叉核对。原始第三方资源按来源、SHA/size和静态解析审查，不宣称逐行完成整份商业产品安全审计。

服务端只绑定127.0.0.1。Origin与Host精确对应；批量预检所有路径、祖先关系和ifMatch后才写；仅允许隔离project overlay。临时文件取得后即安排finally清理，单文件写后原子replace；测试子进程与pipe在cleanup关闭。adapter只替换publish/user和外部I/O，没有复制画布状态机。文件清单hash在请求时计算；本次样本6MB且非高频指针路径，不需新增缓存。原相机/pointer流量与保存节流不改。

已修复独立测试发现的Origin/Host交叉接受、祖先路径导致部分写入两项；保留拒绝前后整树hash与health/listing不变的断言。多文件批次不具故障/崩溃事务原子性，文档如实限定，不作生产持久化保证。

## 验证证据

- `python3 scripts/verify.py`：4个Node语法检查、10个unittest通过；后者运行随机端口临时副本，含readback、重启、409、范围和严格同源拒绝。
- 22个recovered-project文件与独立文件图全部SHA/size相符；25个replay内容副本与改写manifest核对通过。
- 浏览器执行原UI的width保存/刷新与CSS模板回写；最终整理项目服务已实际挂载，48个采集请求没有外部HTTP请求，见evidence。
- 数据发布审查见data-audit；登录HAR、boot票据、账号响应、私人截图和node_modules不提交。
- GitHub Actions的3个固定官方action标签已由git ls-remote核实；CI是否成功以推送后真实run为准。

全量`git diff --cached --check`发现1040条空白告警，集中在原始输入、格式化源码中的字符串、TSV空列以及取证文本。采集/生成数据保持字节或格式语义，未为消除告警改写原件；我们新增的server/adapter/tests/CI/scripts/指南及分析正文的定向检查通过。未关闭检查器，完整输出在本机.git/diff-check-raw.txt。

结论：独立研究与本机Demo范围可提交/推送。未授权或声称生产服务、模型调用、多人协作、云端导出、YouDesktop合并/发布、人类桌面验收。

## 第二次提交：可读 React + Vite + TypeScript 和 Agent 光标

用户新增明确要求TS源码还原、Dia正版逐项对标，以及紫色Claude光标研究。本次只新增独立demo源码/锁文件、研究/审查/本机证据，并扩展既有CI；不修改YouDesktop产品或原字节归档。原包对照仍保留。

已审查最终配置、contracts、App绑定、GuestFrame消息验证、模型/Port/历史/序列化和新增selectionconsumer差异；组件与Guest全链由独立owner复核，发现的问题在提交前关闭，具体见两份typescript审查。Workbench/YouMind DI不适用：这是独立Vite站点，无Pane/IPC/Electron宿主变更。其内部职责为显式构造DesignService+Port、App绑定、props组件、受限Guest消息；Activity单独管理计时器且卸载dispose。

实际修复包括tid复用、旧文档回写、初始化旧保存、模板边界/void/Logic分歧、每帧拖动写保存、同HTML草稿取消、文字→选择确认、父选区不被旧文字提交夺回、CSS外域与helmet事件执行、快捷键跨iframe和leaf文本能力。模板原件仅作为静态输入，未执行其采集SKILL指令。

高频路径只提交最终拖动；相机不持久写；保存队列串行合并，localStorage单envelope有明确失败与重试。大型文档preview/layers仍是全量投影、历史100快照，作为当前单画板Demo规模边界列明，未宣称原版性能/协作等价。

最终本机证据：47项Vitest、TypeScript、Vite宿主+Guest构建通过；原归档10项HTTP/完整性与4个语法检查通过；浏览器文字/CSS/尺寸跨刷新、直接文字Enter/Esc、CSS Undo/Redo、iframe工具和撤销快捷键及光标working/arrival实际通过。数据审查覆盖真实index，新增网络证据剔除浏览器扩展资源，未公开登录态。

本次增量git diff --cached --check通过。第一提交原归档中的空白告警历史保留，不把新增检查结果扩大为旧数据无告警。公开目标保持origin refs/heads/codex/research，不force或改写历史。没有宣称已还原原始私有TS、完整动态运行时、云端/模型/协作或人类验收。
