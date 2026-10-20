# 独立复现验证

本 owner 负责 `tests/test_demo_contract.py`、`scripts/verify.py` 和 `.github/workflows/verify.yml`。验证过程不运行浏览器、不执行下载的 JavaScript、不访问 Claude 或任何外网，也不导入仓库里的 `replay/server.py`。后者导入时会建立状态目录，因此 HTTP 测试先把 replay 复制到系统临时目录，排除已有 `state/`，再运行本次新增的 Python server。

## 复现命令

在仓库根执行：

```sh
python3 scripts/verify.py
```

只依赖 Python 标准库与 PATH 中的 Node.js；无需 npm/pip 安装。所有工程引用由脚本自身位置解析，归档清单使用仓库相对路径。HTTP server 仅监听临时副本的 `127.0.0.1` 随机端口（`--port 0`），每个测试结束自动终止并删除临时副本；不会连接或修改现有 38471/38472 服务。

CI 使用官方 actions 的明确版本标签：checkout v4.2.2、setup-python v5.6.0、setup-node v4.4.0；运行时固定 Python 3.13.3、Node 22.15.0，runner 为 ubuntu-24.04。CI 的 checkout/工具链安装由 GitHub 提供；验证程序自身只发 loopback HTTP 请求。本地结果不冒充 GitHub Actions 已运行结果。

## 覆盖与证据

| 验证 | 断言 |
| --- | --- |
| 22 个 recovered-project 文件 | 路径集合恰好等于捕获的 `_files.json`；每项字节数与 SHA-256 均同时匹配公开文件图、recovered-project-manifest.json 和磁盘字节；无重复或越界清单路径 |
| replay 拷贝完整性 | copy-manifest.json 覆盖 editor/leaf 全部 25 项，逐项验证 bytes/hash，未改副本与对应 recovered-project 原件字节相同，leaf 别名亦相同 |
| 改写范围 | rewrite-manifest.json 的源/输出 hash 正确；body 字节完整保留；四个共享原件未变，新增 adapter 路径有效，leaf/support alias 与源字节相同 |
| JavaScript 语法 | 对我方 offline-adapter.js，以及原 app.js、dc-runtime.js、fast-edit-worker.js 执行 `node --check`；只解析，不执行 |
| 保存与 readback | 正确 ifMatch 覆盖，返回 SHA/seq，GET 字节及 listing SHA 与提交一致；原 editor 文件保持原字节；重启临时 server 后仍可读回 |
| CAS 与删除 | stale ifMatch 或已有文件配 ifMatch:null 返回 409；多文件批次中任何 CAS 冲突整批不写；创建、删除及删除后的正常重启符合清单/读取契约 |
| 路径边界 | 非 project、绝对路径、../、./、重复斜杠、反斜杠、NUL 被拒；同批祖先/后代路径及已有文件作为祖先整批拒绝 |
| 同源边界 | 外部/缺失/错误 scheme 或 port 的 Origin、非法 Host，以及 localhost/127.0.0.1 的交叉 Origin/Host 组合均返回 403 |
| 路由边界 | 编码的 HTTP 遍历被拒，server.py 与 state 路由不可读；拒绝请求前后比较整棵临时 replay 文件 hash、health 内存状态及完整 listing，确认未产生旁路写入 |

## 实际结果

2026-10-20 最终本机执行 `python3 scripts/verify.py`：Python 3.14.7、Node v22.22.3。四个 JavaScript 语法检查通过，10 个 unittest 全部通过；unittest 精确输出为 `Ran 10 tests in 1.261s`、`OK`。

独立审查期间发现的严格同源判断及同批祖先路径问题，已交给 server owner 修复。测试保留了对应断言，没有通过放宽 HTTP 成功条件或删减失败场景换取通过。

## 证据范围

这些检查证明归档字节与本机保存适配器的相邻协议行为；不证明画布的像素、布局、浏览器完整交互或 Claude 生产保存服务。没有添加展示 UI 自动化。

`atomic_write` 的保证限于单个文件 replace。本次正常重启和预检冲突测试不证明多文件提交在任意 OSError、进程崩溃或断电下具有事务原子性；本机 mock 不宣称实现生产事务。GitHub CI 在提交和推送后由实际 run 状态另行确认。
