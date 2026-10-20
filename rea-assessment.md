# REA 对 Claude Artifact 画布调查的适用性

调查日期：2026-10-20。REA 源码版本：`052956af3416fa01d93837e54fdec3ad2739f6d1`；`package.json` 声明版本为 `6.7.0`。本报告只检查仓库源码和文档，没有安装 MCP、修改用户配置或执行下载的安装脚本。[版本证据](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/package.json#L1-L9)

## 结论

REA 很适合把“已经由浏览器获取的前端制品”变成带来源、哈希、范围和未知项的分析材料。它不是能恢复服务端源码、原始仓库或任意缺失变量名的万能反编译器。本任务应把交付目标定义为：**归档当前 Artifact 页面及其实际可达场景的前端资源，恢复尽可能多的可读源码或模块，解释宿主与画布之间的执行、渲染和通信边界，并明确未取得的部分。**

必须分清两层：`claude.ai` 宿主页，与用户生成的 Artifact 内容/预览执行环境。它们可能跨 origin、iframe、worker、独立 bundle。需要由实际 DOM、frame tree 和请求记录确认，不能把宿主全站 React bundle 都当成“这个画布的实现”。REA 的捕获默认限定主页面当前 origin，跨 origin 资源或 frame 需要明确纳入；这正是容易漏掉 Artifact 执行环境的地方。[边界文档](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L180-L190) [排除规则](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L333-L338)

## 仓库实际提供的链路

| 阶段 | REA 实际能力 | 关键限制 |
| --- | --- | --- |
| 页面清点 | `list_browser_targets`、`inspect_web_page` | 需要 Chromium CDP 入口；被动 provider 不点击、不导航；附加之前的网络活动不可得 |
| 主动复现场景 | `capture_browser_scenario` | Playwright 的声明动作；连接模式会先导航至 `start_url`；默认仅最终 URL，不默认留 DOM 或 body |
| 脚本取得 | 被动 `include_script_sources` 或场景 `capture.network.response_body` | 被动来源为 Debugger 暴露文本，场景来源为 `Response.body()`；均不等于线上压缩 wire 原字节 |
| 可验证导出 | `export_web_scripts` | 只导出已保留的 JavaScript；不抓 CSS、字体、图片，不补下载，不抓 source maps |
| 静态分析 | `analyze_web_bundle`、`analyze_javascript_application` | 观察与有界推断，不执行制品；`complete` 只表示已捕获输入的检查范围 |
| 模块恢复 | application analyzer 的 bundler table 分析；可选 Wakaru | Webpack/Rspack/esbuild 有明确实现；Wakaru adapter 只声明 Linux x64 支持 |
| 原始位置 | `trace_web_source_location` | 必须已有本地 map，且由调用者选择 script/map 配对；不证明部署真实性 |
| 原生 import 关系 | `trace_web_module_imports` | 保留 URL/import-map 语义；计算式 dynamic import 仍未知；不补抓资源 |
| 动作定位 | `observe_web_execution`、`inspect_web_event_listeners` | coverage 会重置计数并影响优化；仅主 frame，不覆盖子 frame/worker；不证明 UI 因果 |

证据：[浏览器能力清单](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L15-L38)、[provider 区别](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L67-L75)、[脚本导出](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/website-script-export.md#L3-L28)、[bundler 实现](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/javascript/javascriptStaticAnalysisBundler.ts#L38-L170)。

## 本任务可实际落地的调查步骤

### 1. 先固定入口和场景

记录原始 URL（含 `#page-dcb81aee8d83`）、最终 URL、时间、浏览器版本、页面标题、初始截图和 DOM/frame 清单。以真实页面出现的控件定义场景：初次加载、切页/导航、画布操作、代码/预览切换、全屏/分享等；不存在的控件不虚构。逐场景记录起点、动作、实际结果和新增资源 URL。

浏览器 UI 的操作由 CUA 或声明场景负责。REA 的**被动** browser provider 明确没有通用 `Runtime.evaluate`、导航、输入或下载；不要把该限制误写成 REA 全部不支持交互，因为它另有 Playwright scenario provider。[被动非目标](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L426-L430) [动作分工](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/.agents/skills/reverse-engineer-anything/references/runtime-observation.md#L27-L47)

### 2. 先保全资源，再做反混淆

应保存三份互补材料：

- **浏览器实际取得的内容**：主 HTML、子 frame HTML、外链/内联 JS、CSS、字体、图片、WASM、worker 脚本、data/blob 派生内容和观察到的 API body。对每条响应保留 URL、类型、状态、时间、关联 frame/initiator、内容长度、SHA-256 和磁盘路径。
- **执行时 DOM**：`outerHTML`、iframe/srcdoc、shadow roots（可访问范围）、canvas/SVG 数量和关键属性。原始网络 HTML 与脚本渲染后的 DOM 分开保存，不能互相替代。
- **流量与覆盖清单**：每个实际场景的请求列表、失败/阻止/无 body/流式未结束状态、最终截图。需要明确浏览器自身缓存、service worker 和预加载对流量的影响。

REA 的 `export_web_scripts` 只解决其中的脚本部分；“加载的所有文件”需要浏览器响应归档器或 HAR/body 导出补齐。脚本可按浏览器 Debugger 文本额外保全，因为网络响应遗漏时仍可能取得已解析脚本。REA 明确指出，附加之前解析的脚本仍可枚举，而之前的网络请求不会被补回。[附加窗口限制](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L411-L413)

同 URL 多次加载、query/fragment 版本、响应重定向和不同 frame 必须保留各自身份，不能只按文件名覆盖。REA 的 exporter 已专门处理 URL 路径、冲突、query 和 inline script 的隔离命名，可沿用它的 manifest 思路。[导出身份](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/website-script-export.md#L36-L65)

### 3. 以真实加载为主，有限扩展显式引用闭包

先对初始加载加各场景取 URL 并集，然后只扩展已取得文件中的明确引用：HTML script/link、CSS `@import`/`url()`、JS literal imports、bundler runtime 明确 chunk URL、manifest 中公开列出的资源和已声明的 `sourceMappingURL`。新增 URL 每项记录“由哪个原始文件哪一处发现”。

不要把静态 bundle 中每个路由、字符串或 endpoint 都当成当前画布实际运行逻辑。REA 的 AST 分析会提取 imports、require、importScripts、route 与 endpoint 候选；计算字符串、加密配置和服务端行为可保持未知。[AST 检查](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/webBundleAnalyzerInspection.ts#L124-L218) [明确限制](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/webBundleAnalyzerResult.ts#L398-L404)

### 4. 优先 source map，其次模块抽取和可读化

发现 `sourceMappingURL` 时保留原声明、实际请求 URL、HTTP 结果和 map 原字节；若 map 含 `sourcesContent`，逐 source 导出并保留 source index 与 digest。不能只因路径写着 `src/foo.tsx` 就断言拿到了官方原始文件：它是 map 内嵌文本，身份依据是 map 捕获与文本哈希。

REA 可在 `analyze_web_bundle` 中选择抓 source maps；抓取不带 credentials、cookie 或 referrer，并执行 exact-origin 重定向检查。鉴权 map 或跨 origin map 可能拿不到，失败应入清单。该操作不应该被理解为绕过鉴权。[map 抓取边界](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L413-L424)

没有 map 时，先格式化副本；原字节永远不覆盖。对 Webpack/Rspack bundle，REA application analyzer 可从 chunk registration/table 找 module key、factory、entry、async chunk 关系；对 esbuild 可找 `__commonJS`/`__esm` wrappers。应保留 module 的原始字节范围，再对提取结果命名、注释和建立索引。源码中的 Next.js/React 字符串指纹仅为候选，不能替代模块证据。[Webpack/Rspack table 实现](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/javascript/javascriptStaticAnalysisBundler.ts#L38-L97) [独立 bootstrap 与 esbuild](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/javascript/javascriptStaticAnalysisBundler.ts#L99-L170) [框架指纹](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/webBundleAnalyzerInspection.ts#L491-L546)

Wakaru 是额外可选路线，不能成为本机调查前置阻塞。REA adapter 只接受调用者提供的 Linux x64 Wakaru `^1.13.0`，报告 parser 在 `1.14.0` 验证；当前 macOS 不能声称跑通这条 REA adapter。即使恢复成功，原变量名和任意运行时等价性仍未知；scope-hoisted bundle 也可能只得到单文件。[平台要求](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/javascript-recovery.md#L8-L28) [解释边界](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/javascript-recovery.md#L110-L128)

### 5. 从具体动作追到具体实现

用页面出现的文本、Artifact ID、page fragment、iframe URL、postMessage type、DOM `data-*`、代码/预览相关字符串等作为搜索种子。从模块 factory 和调用关系回溯，回答：

- 画布是否是原生 HTML DOM、SVG、Canvas/WebGL，或 iframe 中的完整 Web 页面？
- 入口数据从初始 HTML、RSC/JSON、API response、blob 还是 postMessage 进入？
- 宿主如何创建预览 frame，设置 sandbox/CSP，传递代码/资源/尺寸/主题？
- 页码或画布导航状态由 hash、history、宿主 React state 还是 Artifact 自身维护？
- 缩放、拖动、选取、编辑、刷新等实际存在的动作由哪个 DOM listener/模块负责？

REA 可对主 frame 直接监听器取得 callback 坐标；React 常用委托监听，直接 listener 缺失不代表没有 React handler。执行 coverage 只定位观察窗口中执行过的范围，嵌套范围不能相加，而且不覆盖子 frame/worker；Artifact 在 iframe 内时必须单独采集相应目标。[coverage 与坐标](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/web-runtime.md#L18-L39) [监听器限制](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/web-runtime.md#L41-L49)

### 6. 整理成能复查的本地证据集

建议结构（根目录已有主代理统一所有权）：

```text
capture/                 # 原始 HTML、DOM、网络事件、frame tree、截图
assets/                  # 原始响应 body，内容哈希避免覆盖
maps/                    # 原始 source maps
derived/beautified/      # 可读化副本
derived/modules/         # 有字节范围 provenance 的提取模块
derived/sources/         # map 内嵌 sourcesContent
analysis/                # 架构结论、具体文件/范围引用
manifest.json            # URL → 请求/帧 → 文件 → SHA-256 → 场景
limitations.json         # 无法访问、未触发、无 body、map 缺失、解析失败
```

每个结论区分：直接观察、静态推断、派生源码、尚未验证。保存 REA 完整 Evidence envelope，而非仅摘要；`normalized_result` 是操作结果，`evidence_id` 是稳定引用；缺失或 partial 不能当成不存在。[Evidence 约定](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/.agents/skills/reverse-engineer-anything/references/evidence-workflows.md#L3-L25)

## 可用 CLI 路线与当前不适用项

REA skill 说明无 MCP 时可直接 CLI 分析，不要求安装 Hopper/Ghidra，不必为本任务改 Codex MCP 配置。若已有 `rea` 优先用已有版本；新取包应固定版本并核对工具 schema，仓库 main 不保证等于已发布 npm 能力。[连接说明](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/.agents/skills/reverse-engineer-anything/SKILL.md#L16-L25) [CLI fallback](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/.agents/skills/reverse-engineer-anything/SKILL.md#L67-L82)

```sh
# 有 CDP 入口时，先清点目标，再按实际 ID 和已观察 origin 捕获。
rea list-browser-targets http://127.0.0.1:9222 --json
rea inspect-web-page http://127.0.0.1:9222 TARGET_ID --include-script-sources --json

# capture.json 必须保存完整成功结果；导出目录必须不存在。
rea export-web-scripts /ABS/capture.json /ABS/exported-scripts --json
rea analyze-javascript-application /ABS/exported-scripts/files --json
```

以上是源码确认的路线示例，不代表本次已经执行。REA 需要 Chrome-family browser；内置浏览器若只暴露私有通道或 debugging pipe，REA 无法附加，不能猜 CDP 端口。已有 CUA 能力仍可继续完成浏览器观察，独立响应采集器也可归档相同制品。[CDP 入口限制](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/docs/browser-observation.md#L112-L119)

以下不属于本次必要路线：原生 Hopper/Ghidra、Android、Frida、固件、Packet capture、WebMCP 工具发现、账户/凭据存储枚举。它们不能直接帮助解释当前 HTML 画布，且会扩大调查范围。不要运行 `setup` 来“获得更强反编译”；它主要修改 MCP/skill 注册，不能增加网站提供的源码。

## 完成条件与无法承诺的范围

- 当前入口与实际观察场景的资源 URL 并集全部有结果：已落盘且 hash 验证、明确无 body、明确失败/阻止/未完成。
- 宿主/Artifact 的 frame 与 origin 边界有截图、DOM 与网络证据；画布渲染方式有实际 DOM/模块证据。
- 每个派生文件能追到原始制品或 source map；所有结论能指出文件、范围或响应记录。
- 明确公布 source maps、懒加载场景、跨 origin frame、worker、权限页面和服务端源码的覆盖限制。

不能承诺“Claude 网站全部代码”或“恢复开发仓库”：浏览器只能取得服务端交付给当前浏览器/身份/场景的前端制品，服务端实现、未发布源文件和从未触发的动态入口并不在其中。REA 自身也明确将完整性限定在已捕获输入。[静态分析限制](https://github.com/morluto/rea/blob/052956af3416fa01d93837e54fdec3ad2739f6d1/src/domain/webBundleAnalyzerResult.ts#L398-L404)

## 本次实际执行补记

随后已下载并校验官方 `rea-agents@6.7.0` npm 包，在 `analysis-rea/` 内用 `--ignore-scripts` 安装隔离依赖，通过 Python 编排现有 Node 执行公共离线 CLI。完整记录见 [analysis-rea/README.md](analysis-rea/README.md)。npm 编译产物与上述 repo commit 分开归属，不声称内容相同。

首轮 25 个输入中，shell 22 源完成 21 源，canvas 3 源完成 fast-edit-worker；app、dc-runtime、vendor 在静态语义阶段耗尽 heap。对失败源明确加至 4 GiB 后仍失败，已保留四次原始 JSON 和未知项，未把 exit 0 宣称为全面成功。随后直接调用同一 REA 包的纯 JavaScript parser/traversal 原语，三个失败源均无错误解析；这份 fallback 只提供语法事实和坐标，已与公共 CLI Evidence 分开标注。实际浏览器采集与人工源码分析可继续利用这些结果。
