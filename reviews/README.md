# 多 Agent 分工与交叉验证

| Owner | 主责与接口 | 独立交叉验证 |
|---|---|---|
| root | 浏览器采集、文件整合、原UI本机保存实验、修复adapter、最终GitHub交付 | 等待下列相互独立报告后提交 |
| rea_workflow | REA源码路线与实际离线分析 | 主代理与采集审计核对命令、输入SHA、heap失败边界 |
| canvas_static | 相机、模板模型、iframe/picker与运行时 | 另读project代理实现的本机adapter，追踪原消费者和保存payload；见architecture-review |
| project_format | 22文件格式、无损index、Worker、本机宿主适配器 | shell代理独立写HTTP契约测试；root用原UI验证保存/刷新 |
| shell_static | 外壳、权限、能力SDK与Dia差异 | 独立准备复现测试和CI，发现Origin/路径批次拒绝问题后由root修复 |
| primary_research | 官方一手资料 | 独立核对所有hash/JS解析与发布数据，发现并复核采集脱敏与动态脚本版本问题 |

- [架构与保存链复核](architecture-review.md)
- [发布数据审查](data-audit.md)
- [可复现验证](reproducibility.md)
- [浏览器行为证据](../evidence/browser-verification.json)

矩阵中的Agent名称是任务角色，不代表人类负责人签认。没有以Agent交叉验证代替用户对YouDesktop的桌面交互验收。
