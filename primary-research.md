# Claude Artifacts / Design 画布：公开一手资料核对

核对日期：2026-10-20。Owner：公开一手资料研究子代理。范围：官方帮助中心、Anthropic 官方公告、官方公开代码；不访问私人会话，不修改产品。目标链接的实际实现以主代理抓取的当前页面和 bundle 为准。

## 先给结论

用户的 `/artifact/…#page-…` 链接需要按**新版 Artifacts / Design 画布**调查。官方现在明确区分 2026-09-16 之前的 Legacy artifacts 与新的 Docs / Slides / Design 模板；旧的“React 组件运行在预览里”不能充分解释新版具有画板、图层、直接编辑和属性面板的画布。[官方 Artifacts 说明](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

公开资料能确认产品能力与一份官方的 HTML 打包工作流，**本轮未找到官方公开的生产画布编辑器源码或完整沙箱协议**。iframe 属性、桥接协议名、编辑数据结构、编译器与第三方库都必须由目标页的实际文件验证，不能从帮助文档补想出来。

## 官方证实的内容

| 主题 | 可证实事实 | 一手来源 |
|---|---|---|
| 新旧版本 | 2026-09-16 之前在聊天中创建的是 Legacy artifacts；原件继续工作，但不再新建。新的模板包括 Docs、Slides、Design、Dashboards、Motion。 | [Artifacts 说明](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) |
| 画布结构 | Design 的 canvas 由 artboards 组成；每个 artboard 有 text、shape、image 等 layers；layer 可包含子 layers。 | [Design 入门](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) |
| 编辑方式 | 对话、元素上的 inline comments、画布直接编辑并行；直接编辑支持拖动、调整大小和对齐。 | [Design 入门](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) |
| 选择与层级 | 有画板选择、进入层、进入嵌套层、退出层等操作；属性面板展示 layer list；选择上方有浮动工具栏。 | [Design 入门](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) |
| 布局语义 | 文档区分自由放置的 layer 与 row / column / grid 中的 layer；键盘移动前者改变位置，后者与邻居交换顺序。 | [Design 入门](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) |
| 编辑产物 | 模板 artifact 可直接编辑并实时更新；Design 可导出 ZIP、PDF、PPTX、Google Slides、独立 HTML，并可交给 Claude Code。 | [Artifacts 说明](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)、[Design 入门](https://support.claude.com/en/articles/14604416-get-started-with-claude-design) |
| 设计系统 | 从 codebase、React 组件库、图片、演示文稿等来源提取颜色、字体、组件、布局模式，并供后续 design / deck 使用。 | [设计系统设置](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design) |
| 初始发布形态 | 官方 2026-04-17 Design 公告描述 code-powered prototypes、直接文字编辑、调整控件、HTML 导出与代码 handoff。 | [Design 官方公告](https://www.anthropic.com/news/claude-design-anthropic-labs) |
| 生成环境 | 官方说明现在使用 computing environment 创建 HTML / React apps 等 artifacts；该环境运行在隔离容器中。 | [文件创建说明](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude) |
| 分享权限 | Artifact 默认私有；链接访问者使用自己的 connected apps 权限。可以查看、评论、编辑的权限分别定义。 | [分享说明](https://support.claude.com/en/articles/9547008-share-artifacts) |
| Legacy code | Legacy artifact 界面提供看代码、复制、下载；这一说明不能直接推导新版编辑器的完整源码可导出。 | [Artifacts 说明](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) |

## 能实际读取的官方公开代码

Anthropic 官方 `anthropics/skills` 仓库提供 `web-artifacts-builder`。这是**生成 artifact 内容的工具链**，不是 Claude.ai 生产编辑器源码。

- [SKILL.md](https://github.com/anthropics/skills/blob/main/skills/web-artifacts-builder/SKILL.md)：React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui；最后生成一个自包含 HTML。
- [bundle-artifact.sh](https://github.com/anthropics/skills/blob/main/skills/web-artifacts-builder/scripts/bundle-artifact.sh)：运行 Parcel build、显式关闭 source maps，再用 `html-inline` 将 JS / CSS / assets 内联到 `bundle.html`。
- [init-artifact.sh](https://github.com/anthropics/skills/blob/main/skills/web-artifacts-builder/scripts/init-artifact.sh)：初始化生成工程与依赖。
- 上述文件已原样下载到 `references/`，含来源 URL、字节数和 SHA-256 的记录见 [public-sources.manifest.json](references/public-sources.manifest.json)。

**解释边界：** 这证明 Anthropic 有“现代前端工程 → 单 HTML”公开工作流，不能证明目标页正在使用 Parcel、React 18、Tailwind 或同一套打包器。目标页的加载代码、内联代码和 source map 才能作实现证据。

## iframe / CSP / postMessage：需要避免混淆

官方 [interactive connectors 文档](https://support.claude.com/en/articles/13454812-use-interactive-connectors-in-claude)明确说 **MCP interactive connector UI** 使用 sandboxed iframe、严格 CSP、JSON-RPC 消息与外部域名预声明。该文描述 MCP Apps 的执行边界，不能替代 Design artifacts 的实现证据。

本次未找到官方文档公开 **Design** 的精确 sandbox flags、iframe origin、postMessage envelope、CSP 字符串或编译器协议。目标 bundle 中应核对以下证据：

1. 父页面创建 iframe 的代码、实际 `sandbox` / `allow` / `src` / `srcdoc`。
2. iframe 内的 runtime bootstrap 与 parent handshake。
3. 消息的 type / id / sequence / origin / source 验证。
4. artboard HTML 与编辑器自有 DOM 的边界，以及选中 / 高亮 / 更新 / 撤销的消息流。
5. CSP 或 Permissions-Policy 到底来自 HTTP 响应、内联 meta 还是创建页面的逻辑。

## 未验证的公开用户上报，仅作搜索线索

以下是在 Anthropic GitHub 仓库中的**第三方用户 issue**，不是 Anthropic 对实现的官方声明，不进入上方已证实事实：

| 线索 | 内容 | 后续在目标 bundle 里的检索词 |
|---|---|---|
| [#88710](https://github.com/anthropics/claude-code/issues/88710) | 上报 Design preview 内嵌 sandbox iframe、opaque origin、postMessage-only；artboard 源文件为 `.dc.html`；评论选择跨 iframe 丢失。 | `dc.html`、`postMessage`、`allow-same-origin`、selection、anchor |
| [#88789](https://github.com/anthropics/claude-code/issues/88789) | 上报 `canvas.json` 描述 artboards、`print: fixed`；每画板 PNG / HTML ZIP 导出。 | `canvas.json`、artboards、print、export |
| [#88326](https://github.com/anthropics/claude-code/issues/88326) | 上报每个 /design 发布页内嵌约 2MB 编辑器 JS；提到 runtime contract 0.1.31 和 `/api/frame/perm`。 | runtime、contract、frame、permissions |
| [#42064](https://github.com/anthropics/claude-code/issues/42064) | 较旧发布 artifact 的 origin mismatch 上报，带 `www.claudeusercontent.com` 与 requestHandshake 堆栈；现已关闭。 | claudeusercontent、requestHandshake |

这些旧 /design、旧 public artifact 和新 /artifact 页面可能走不同版本，不能直接混用其协议结论。

## 留存与覆盖

- Exa 共 6 次搜索，`sources_reviewed = 8 + 6 + 6 + 6 + 8 + 6 = 40`；按目标过滤了 Claude Code OS sandbox、Cowork 容器、MCP Apps 与第三方用户 issue。
- 相关帮助文档的 Exa 提取文本：`references/official-help-artifacts.exa.md`、`references/official-design-and-file-creation.exa.md`。
- 官方开源工具说明与脚本：`references/official-web-artifacts-builder*`。
- 官方 Design 发布页 HTTP 200 HTML：`references/official-design-launch.html`。
- 没有获取 Anthropic 后端源码、私有会话、凭据或原始未发布 TypeScript；没有把推测标为生产实现。

