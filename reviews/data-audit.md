# GitHub 公开发布前数据审查

审查日期：2026-10-20。审查 owner：独立数据审查子代理。范围：首批公开范围 320 个文件及下文记录的第二批增量，均读取 Git index 中实际待提交内容；三个大型 REA gzip 输出解压后扫描。原任务目录的 raw HAR、已登录 boot、原生截图和其他浏览器上下文不在本次可公开范围内。本审查仅写本文件。

## 当前结论

**已审查的当前暂存公开范围未发现已识别的活动登录票据、用户账号凭据或未处理的个人元数据阻断项，可以按本报告限定范围公开。** 首轮发现的机器路径与组织标识已经清理，以下记录保留发现与整改，不复述真实值。本结论只覆盖本次待提交内容，不是第三方代码完整安全审计。

### 首轮发现与已完成整改

| 路径 / 字段 | 问题与处理 |
|---|---|
| `analysis-rea/*run.json`、`*orchestration.stdout.jsonl` | `cwd`、`env_overrides.TMPDIR`、`env_overrides.XDG_CACHE_HOME`、`stdout.json.path`、`stderr.txt.path` 含采集机器绝对路径和用户名。转换为仓库相对路径或明确占位值。 |
| `analysis-rea/inputs-manifest.json` | `[].source`、`[].path` 含同类机器路径；公开版本使用相对路径，保留原始输入文件 hash。 |
| `analysis-rea/*retry4096.stdout.json` | `data.subject.local_path`、`data.normalized_result.input_path` 含机器路径。 |
| `analysis-rea/syntax-*.json`、`syntax-summary.json`、`syntax-fallback.stdout.json` | `path` 字段含机器路径。 |
| `analysis-rea/canvas-analysis.stdout.json.gz` | 解压文本有 2 处机器路径。 |
| `analysis-rea/shell-analysis.stdout.json.gz` | 解压文本有 2 处机器路径。 |
| `analysis-rea/results-summary.json.gz` | 解压文本有 44 处机器路径。压缩归档修订后更新公开 archive manifest 的字节数/hash，并注明这是公开脱敏副本。 |
| `asset-manifest.json[29].url`、`browser-assets-initial.json.assets[0].url` | 带有不必要的组织查询参数；公开记录删除该参数，不改变响应文件字节。 |
| `capture/network-reload.json.events[13].url`、`http-resource-downloads.json[16].url` | 同一组织查询参数。 |
| `dia/sanitization.json.removedPaths[1]` | 已删除请求的路径仍包含组织 UUID。改成组织标识占位路径；无需为描述脱敏动作公开真实组织标识。 |

本审查不在报告中复述用户名、组织 UUID、邮箱或任何潜在票据值。

## 整改复核

- 对当前 320 个暂存文件重新扫描，机器用户绝对路径、组织查询参数、JWT、Anthropic / GitHub / AWS 票据、长 Bearer 和敏感 token 查询模式均无未处理命中。
- 上表四处组织 URL 查询参数均已移除；`dia/sanitization.json.removedPaths[1]` 的组织 UUID 已改为占位。
- 三个 gzip 解压后均无机器用户路径；其解压字节数及 SHA-256 **3/3** 与 `analysis-rea/archive-manifest.json` 对应。manifest 明确 `publicMachinePathsRedacted:true`，并保留原始本机 hash 作为历史追溯；公开档案是去标识化副本，不冒充原始日志字节。
- 当前暂存文件不含 raw HAR、已登录 boot 或原生浏览器截图。
- 当前检查时新的 `demo/` React / Vite / TypeScript 源文件尚未暂存；后续加入该部分须做增量凭据模式扫描，本结论不提前覆盖尚未提交检查的文件。

## 已执行检查

- 首轮全部 317 个暂存文件、复核当前 320 个暂存文件扫描 JWT、Anthropic API / session key、GitHub token、AWS access key、长 Bearer 票据、敏感 token 查询参数等具体模式；未命中活动凭据候选。
- 三个 REA gzip 归档解压后使用相同具体模式扫描；未将“压缩后看不到明文”当成通过。
- 对采集 JSON 的结构化字段检查 Cookie / Set-Cookie / Authorization / session key / token 等实际值；未发现保留的会话凭据。
- 匿名 boot 文件的结构检查未发现 token、邮箱或已登录账号字段；Dia 目录没有 raw HAR 或已登录 boot。
- 检查保存的 AX 文本、目标范围摘要和浏览器证据路径；未发现私人页面标题、当前用户邮箱或账号菜单的身份文本。Demo 证据来自 localhost；不把这些证据解释为远端 Claude 写入验证。
- 邮箱命中来自 npm registry 的公开作者元数据、Anthropic 静态代码中的官方支持常量，以及官方帮助文档内容；未识别为当前采集用户的账号邮箱。第三方公开出处与版权信息保留。
- 静态 bundle 中的 `token` / `cookie` / `session` 字段名、错误信息和协议定义，未误当成已登录会话材料。

## 私钥模式命中的归属

`project-files/artifact-type/fast-edit-worker.js` 及其 recovered / replay / formatted 副本包含完整 PEM private-key 字面量。静态上下文明确属于 **Happy DOM Virtual Server** 的固定 cert/key；证书可解析且归属 Happy DOM。它来自原发布 worker 的第三方依赖，不是本次浏览器登录票据或用户私钥。

为保留取证 hash，不在第三方原始 bundle 中悄悄删改该常量。公开交付应保留其第三方固定测试材料归属说明；通用 secret scanner 可能命中，需要依据路径和上游来源处理，不能据此宣称发现用户凭据。

## 保留边界

公开作品 slug、作品 UUID、版本路径、浏览器脚本内容 hash 属于被研究公开对象与字节追溯所需标识，可保留；它们不应与无研究必要的组织标识、机器用户名混淆。

本次模式扫描不是数学意义上的“绝无秘密”证明；未对第三方 bundle 的全部高熵字符串做无界猜测，也没有执行下载代码。公开范围限定为静态发布资源、相应源码分析、裁剪摘要和 localhost Demo；以后新增账号响应、HAR、浏览器上下文或截图需重新审查。



## React / Vite / TypeScript 第二批增量审查

2026-10-20 对第一批公开提交之后当前 **60 项真实暂存 diff** 再次读取 Git index；范围包括 `demo/` 源码、package-lock、workflow、research 和 review 文档。

- JWT、Anthropic API / session key、GitHub / AWS 凭据、长 Bearer、敏感查询参数、URL 内嵌用户名密码、机器用户绝对路径、邮箱均无命中；结构化 JSON 中未发现实际会话凭据值。
- 新增文件未命中私人 UUID，也未发现 raw HAR、原生浏览器截图、`dist/` 或 `node_modules/` 进入暂存。
- `demo/package-lock.json` 的 **125 个 resolved URL** 全部使用公开 npm registry，无 URL 用户名密码。
- 这是凭据与个人数据增量审查，不替代 React / TypeScript 语义代码审查；源代码中协议 nonce、cursor、session 等字段名不等于真实身份材料。
- 最后补查 `research/agent-cursor.md` 及 54 条证据 JSON。报告初次暂存含 3 处机器用户绝对路径，主代理已改为相对路径 / 占位；再次读取 index 确认全部消失。最终 MD 为 16,164 bytes、证据 JSON 为 151,864 bytes，未发现凭据 / 身份模式命中；3 个相对文件链接均可解析。
- 最初这 **60 项增量及本审查报告**未发现数据公开阻断项；后续新增内容的最终复核见下一节。


## 最终冻结复核：67 项暂存差异

在提交第二批之前，再次直接读取当前 Git index 的 **67 项差异**，覆盖最终选区窄修、`selection.test.ts`、研究报告、README / review 更新及本机浏览器证据。文本文件中的凭据 / 邮箱 / 机器用户路径模式没有未处理命中，最终公开范围**无数据审查阻断项**。

- `evidence/typescript-network.json`：44 条请求、44 个 URL 均指向 `127.0.0.1`；35 个浏览器扩展请求已排除，归档中没有剩余扩展 URL、外部 HTTP 请求或 URL 内嵌凭据。结构化字段没有保留 Cookie、Authorization 或实际 token 值。
- `evidence/typescript-browser-verification.json` 与本轮 review / research 文本同样通过身份与路径扫描；没有加入私人页面、账号响应或原始登录上下文。
- `evidence/typescript-purple-cursor.jpg` 实际编码为 **JPEG，73,033 bytes**；主代理已将原 `.png` 后缀修正为 `.jpg`，未改图像字节，并同步 README 与 verification JSON。独立解析 JPEG segments 只见常规图像头 / 压缩表 / 图像数据，**没有 EXIF、IPTC 或 comment 段**，没有机器用户路径或身份元数据。格式与后缀现已一致。
- 本轮没有重新解读第三方原始大归档；其先前解压扫描与脱敏 hash 复核结论保持，新增扫描聚焦本批实际变化与图像元数据。

本次数据审查到此冻结。后续若再加入真实账号材料、HAR、原生截图或不同页面上下文，需另做对应增量审查。
