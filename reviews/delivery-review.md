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
