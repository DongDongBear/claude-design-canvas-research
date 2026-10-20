# 抓取完整性独立审计

审计日期：2026-10-20。范围仅为本任务目录的 manifests、既有分析结论、已脱敏 Dia HAR，以及为 hash / 语法核对读取的对应本地字节。未启动浏览器、未执行下载的目标脚本、未访问账号或私人文件、未触发模型或远端写入。本审计只新增本文件。

## 结论

**目标发布版本的 22 个项目文件完整；当前观察到的 HTTP / Dia 脚本、样式与字体均有本地对应。** 这支持“已保存该版本公开发布物与本次观察到的前端资源”，不支持“恢复 Claude 全站、后端、原始 TypeScript 工程，或验证编辑保存全流程”。

本轮发现的两项问题已由主代理修复并经本审计复核：动态 Cloudflare 脚本覆写导致首轮 manifest 不一致；HAR 的 base64 JSON body 曾漏脱敏。原始首轮 Cloudflare 字节未留存，需要保留此限制。

## 字节与文件覆盖

| 核对对象 | 独立结果 |
|---|---|
| 公开 `_files.json` 的 22 个文件 | **22/22** 实际 SHA-256 和 size 匹配，合计 **6,073,770 bytes**；核对直接使用独立公开文件清单中的 sha256 / size。 |
| `index.html` 特例 | 原 HTTP 响应包含 Frame runtime 注入；核对使用 `analysis-project/recovered-index.html`。21 个直接下载文件加 1 个精确恢复文件，不能把未去注入的响应称为原始 index。 |
| `asset-manifest.json` | 当前 **37/37** 记录对应实际 hash 和 size。 |
| `http-resource-downloads.json` | 56 条记录中 **55 个成功响应全部匹配**；1 个匿名 boot API 请求失败，无响应文件 hash。该 boot 数据另有 CDP / Dia 采集，不是静态 JS/CSS/font 缺口。 |
| `dia/resource-manifest.json` | **33/33** 实际 hash 和 size 匹配；boot 副本是已脱敏内容，不能声称保留原响应字节。 |
| `analysis-rea/inputs-manifest.json` | **25/25** 实际 hash 和 size 匹配。 |
| 公开资料 references manifest | **4/4** 下载物实际 SHA-256 匹配。 |
| 已记录静态依赖 | `analysis-shell/dynamic-dependencies.json` 的 37 条引用均有可用本地响应对应；没有由这份列表推出的缺失 URL。 |

HTTP 成功文件包括 **47 个 JavaScript、1 个 CSS、3 个 woff2**，以及 SVG、favicon、HTML。公开项目 manifest 还包含单独的编辑器图标字体。早期 `page-assets/manifest.json` 的两个字体抓取失败已被后续 HTTP 下载补齐；其 SVG 也有任务目录内的稳定副本，交付无需依赖临时目录。

Cloudflare 的 `cdn-cgi/challenge-platform/scripts/jsd/main.js` 是动态外围脚本。初审时发现原 manifest hash / size 与后抓文件不同；主代理已使当前主记录与现有文件相符，并在 `initialCapture` 保留首轮 hash、大小和 `retained:false`，另记于 `capture/integrity-adjustments.json`。**只能保证当前版本，不能声称首轮全部原始字节仍在。** 设计项目和核心脚本未发现此类不一致。

## Dia HAR 覆盖

脱敏 HAR 保留 38 条请求。所有成功的脚本 / 样式 / 字体共 **28 个唯一 URL**：

| 类型 | 成功项 | 本地对应 | 缺失 |
|---|---:|---:|---:|
| JavaScript | 24 | 24 | 0 |
| CSS | 1 | 1 | 0 |
| Font | 3 | 3 | 0 |

25 个 script/CSS 响应含 HAR body；逐一比较解码 body 与本地响应，**25/25 字节完全一致**。3 个字体的 HAR 没有 body，但同 URL 有匿名 HTTP 下载物，且实际文件 hash / size 与下载 manifest 匹配。没有待列出的成功 script/css/font 缺失项。

覆盖范围受本次实际页面和操作限制。尚未触发的分支、其他作品、其他发布版本或新的动态模块不在此完整性声明内。

## 脱敏复核

首次审计发现 `dia/dia-editing-initial.har` 的 boot JSON 以 base64 保存，11 个 token 字段未随外置 JSON 副本脱敏。只向主代理报告了字段路径，没有输出任何潜在值。主代理已逐条解码并递归清理，再次复核结果：

- boot 解码 JSON 中 **13 个敏感字段均为 REDACTED**，覆盖 token、email 与 avatar grant。
- 未发现保留值的 Authorization / Cookie / Set-Cookie 等凭据 headers；request / response cookies 均未保留条目。
- 外置 boot 文件的对应敏感字段也已脱敏；`body-redaction.json` 记录了本次对解码 HAR body 的补充处理。
- `tokenExchangeEnabled` 等布尔功能开关不是 token 值，不作为泄漏处理。

HAR 的 `response.content.size` 仍记录原网络 body 大小 12,188；脱敏后解码 JSON 为 11,653 bytes。该 size 是原网络元数据，不能用来证明脱敏文本等于原响应字节。涉及 boot 的交付 hash 应对应明确标记的脱敏文件。

## 语法与 source map

本审计使用仓库已安装的 `@babel/parser`、`sourceType: unambiguous` 对下载记录与项目 manifest 中去重后的 **48 种 JavaScript 字节序列**独立做 parse-only 检查，**48/48 通过**，没有运行目标代码。既有 `analysis-canvas/static-verification.json` 另记录了 8 个格式化 / 提取脚本的解析结果。

对 manifests 中 **71 个脚本路径**检查，均未发现 sourceMappingURL 注释声明；HTTP 下载与 HAR 响应也未见 SourceMap / X-SourceMap header。正确结论是“已抓资源未声明 source map”，**不能扩大为外部 .map 不存在或原始源码已被完整恢复**。

## 身份、编辑与保存结论

证据包含两个不同状态，应该并列说明：

- 初始内置浏览器公开页显示 Read-only / Sign in。
- 后续 Dia 目标页 boot 表明当前 viewer 是 owner、`can_edit:true`，同时 `appFlags.design_fast_edit:false`。可编辑权限不表示每项模型能力已开启。

Properties / Code / Tweaks 与选中图层只能证明对应 UI 可查看、选择和检查。既有分析对 HTML 模型、picker、undo、Fast Edit、文件发布、generation 与 ACK 的描述主要来自静态代码。**没有修改设计、没有远端保存、没有验证保存 ACK、多人同步、模型调用或云端导出的实际成功。** 对这些流程继续使用“静态实现证据”，不能写成“完整编辑保存已验证”。

