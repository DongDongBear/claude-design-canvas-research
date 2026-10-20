# 画布与本机 Demo 独立架构复核

复核日期：2026-10-20。最终差异复核的 `replay/server.py` SHA-256 为 `2a6f35c283c403d998dae9c332ad53d9417ee3de3bf4add00d02cd20eb96128a`。复核范围：`replay/offline-adapter.js`、`replay/server.py`、编辑器入口改写、四个原始 bundle 的一致性、原 UI 保存消费点，以及已落地的浏览器/HTTP证据。此复核只读取代码和证据，没有代替用户进行人工验收，没有触发额外写入，也没有修改 Demo 实现。

结论：**在“运行已捕获的前端编辑器、观察画布实现、把本机编辑保存到隔离目录”这一 Demo 范围内，未发现阻断使用的架构问题。** “HTML 模板 + DOM 世界层 + iframe/picker”的实现论断成立；宽度和 CSS 修改沿原编辑器状态与保存链进入本机文件，不能归为只改截图或注入静态样式。模型调用、多人协作、生产鉴权及云端保存没有被重建，不能宣称已复现完整 Claude 服务。

## 1. 四个核心发布物未被替换

独立读取下列两组文件并比较内容，结果逐字节相同：

| 回放文件 | 原捕获文件 | 字节数 | SHA-256 |
| --- | --- | ---: | --- |
| `replay/editor/artifact-type/app.js` | `project-files/artifact-type/app.js` | 4,153,993 | `88c663e57d5ce369138272ef13f45267b87104626c2fb69943a5dc2cf7304368` |
| `replay/editor/artifact-type/app.css` | `project-files/artifact-type/app.css` | 481,552 | `471ea680e9469e7a18cc3ab628c63e282bbab26065d21d6baf22ba79be6d9bf0` |
| `replay/editor/artifact-type/dc-runtime.js` | `project-files/artifact-type/dc-runtime.js` | 187,897 | `3f160299989dc595cf434dac7b7f3e6fd20ed015a2d99e075c3eac09dffe0f10` |
| `replay/editor/artifact-type/fast-edit-worker.js` | `project-files/artifact-type/fast-edit-worker.js` | 983,903 | `18e7e4395b5e25f4a482f14c74fa91959d4772ce7ca3a23411abeb1505efc8b1` |

`analysis-project/recovered-index.html` 与 `replay/editor/index.html` 的独立文本 diff 仅显示：head 注入 `/offline-adapter.js` 和副本说明、title 增加回放标记、字体 URL 改为已捕获的本机字体。原编辑器脚本主体没有因构建 Demo 被改写。具体改写可见 `replay/rewrite-manifest.json`。

## 2. 最关键实现论断有直接代码证据

以下行号对应仓库中的 `analysis-canvas/formatted/app.js`，不是原压缩文件行号。

| 论断 | 原始实现证据 | 复核判断 |
| --- | --- | --- |
| 世界层是 DOM、相机通过 CSS transform 更新 | `z4` 在87943行生成 `translate(-x*scale,-y*scale) scale(scale)`；`NPe` 在87970行起直接设置世界层 transform；155757行是 `data-mega-world` div | 成立 |
| artboard 外框是 DOM，内部独立运行 | 155919行以 absolute div 标记 `data-mega-artboard`；147426行创建带 srcDoc 和 `allow-scripts allow-same-origin` 的 iframe | 成立 |
| 可编辑内容保留 HTML 模板 | `Vb` 在80264行起把模板装入 detached `<template>`，用 `byTid` 查询元素；80765行赋 `data-dc-tpl`；80367行序列化时移除内部编号 | 成立；不能扩大为“所有状态都在 HTML 中” |
| layout、page、annotation 与内容分开 | 64948行 `Yl`、65006行 `lh`；65232行 `WR`；191569行 `Wk` | 成立：画布布局持久在 canvas JSON，artboard正文和logic在各 `.dc.html`，并可引用其他项目文件 |
| picker 在真实运行 DOM 上选择/测量/预览 | 86812行内嵌 picker；已静态提取至 `analysis-canvas/embedded-scripts/03-string-L86812.js`；该文件13177行 `inspect` 读取 computed style，1822行起发送 `__dcEditorEvt`，11531行起注册真实DOM事件 | 成立 |
| 主画布不是全部栅格绘制到一个 canvas | 上述DOM/iframe消费路径完整；68618行的SVG foreignObject→canvas用于导出截图 | 成立；不表示应用完全不使用Canvas |

需要保留的表述边界：HTML 模板是内容编辑事实；live DOM 还含组件、循环实例、动画与编辑标记。不能把 iframe 当前 `body.innerHTML` 无条件保存为原模板。该实现通过模型、组件边界、tids与序列化完成回写。

## 3. 原 UI 到文件持久化的调用链没有被 Demo 绕过

根据原 bundle 消费点，属性/样式修改的路径为：

```text
原 React 属性面板 / iframe picker 编辑事件
  → 校验CSS/属性值、Vb.setStyleProperty / setAttribute / setText
  → 模型dirty、模板快照历史、运行时push预览
  → n1e / UMe 合并原.dc.html的template、script与props
  → qa.writeFileVersioned / qa.writeFile
  → _s().set('file/…') / Ate文档seam
  → dBt.updateContent → xr标脏、提交原保存队列
  → port.publish → window.claude.self.publish
  → 本机adapter编码内容与ifMatch
  → POST /__replay/publish
  → replay/state/project/* 与 state.json
```

关键原消费点：

- `analysis-canvas/formatted/app.js:136020` 起为属性编辑应用；136106行起的批量应用先验证值，再修改模型，进入原历史/push链。
- `:98079` 的 `UMe` 把编辑后的模板合并回原 `.dc.html`，同时处理pending script/props和版本基线。
- `:98760` 的 `n1e` 管理模型、dirty、回写与scope；98960行起调度dirty；99138行使用 `qa.writeFileVersioned`。
- `:65477` 的 `qa` 把写入交给 `_s().set(Qs(path), text)`；`Qs` 是 `file/` 键前缀。
- `:65383` 的 `Ate` 只处理 `file/` 文档键并调用文档 `updateContent`。
- `:193484` 的 `dBt.updateContent` 触发保存调度；192550行附近的 `xr` 把修改标为dirty并提交queue；191992行调用原 `port.publish`，191265行调用 `self.publish`。

本机适配器只提供外部能力：`replay/offline-adapter.js:39–63` 定义publish，72行注入 `window.claude`；它没有改写 `Vb`、picker、面板、undo或原保存queue。因此原UI编辑体验与源模板处理仍由下载的原发布物完成。

## 4. adapter/server 契约与保存证据吻合

`offline-adapter.js:43–53` 将原 `self.publish` 的各path内容转成字节/base64，保留 `contentType` 与 `ifMatch`；删除支持null和 `{delete:true}`。仅接受 `project/` 前缀，失败响应作为原协议错误抛回。

`server.py` 的对应点：

- 103行提供原编辑器消费的 `/editor/_files.json`，含 `ver`、SHA、size、contentType。
- 105行起的项目GET优先读取状态overlay，未改文件回到捕获副本。
- 120行起接收publish；121行要求Origin精确对应实际Host，不能在localhost与127.0.0.1之间交叉借用；132–141行先验证所有路径与内容。142–156行在LOCK内预检同批祖先/后代路径冲突、现有目录目标及文件祖先，全部通过后157–162行才校验ifMatch，发生冲突返回409。
- 165–177行写入隔离的 `replay/state/project/` 并保存state manifest；178行返回 `{version,seq,shas,changed}`，原文件端口能够消费这一结果。
- 188行绑定127.0.0.1；93行、121行检查Host/Origin；18行CSP及adapter中同源fetch策略控制常见外部请求。这是本机回放隔离措施，不是生产sandbox实现。

已独立读取并交叉核对的证据：

1. `replay/browser-width-save-response.json`：对 `project/canvas.json` 的publish返回200与新SHA；`browser-width-after-reload-ax.txt:147`：reload后原属性面板的Artboard width显示1300。与原始canvas.json中的1280构成实际before/after。
2. `replay/browser-css-save-network.json`：requestId `94440.126` 的POST只写 `project/Composed.dc.html`，响应200。独立解码base64后，HTML中确实出现根内容 `background: #fff5ed`；该payload SHA为 `d1538a7e335ab4e6b97f08a99df9ea5dda848abb033010d212dfb450627421e1`，与 `browser-css-file-evidence.json` 的文件SHA完全相同。
3. CSS请求的ifMatch是原作品SHA `9b0e45beacd42c1088e76bec223e51b38505f3acbfaf0479d9c01ee4c6ebf991`；payload仍有一对 `<x-dc>`，不含 `data-dc-tpl`、`data-dc-editor-selected` 或 `__dcEditorPicker`。这证明保存的是模板HTML，而不是把编辑器标记污染进作品。
4. `replay/http-smoke.json` 记录静态入口/文件、create、旧ifMatch拒绝等必要HTTP验证。`replay/atomic-smoke.json` 记录同一普通文件的create/delete成功。

这些是既有执行证据的独立核对；本复核没有再次操作UI，也没有把日志200单独等同于用户验收。原1280宽度与白背景的恢复由主代理另外负责，交付后运行生成的state应保持忽略，不应混入原始归档。

## 最终两处差异复核

在初次复核后，只补读了server的两处实际变更：

- `server.py:121` 的Origin必须等于 `http://{Host}`，同时仍经过Host白名单检查；原先两种loopback名称独立放行的问题已关闭。
- `server.py:142–156` 的新预检全部位于写循环之前且在同一LOCK内。排序后检查同批祖先/后代路径；对磁盘已有目录目标、已有文件祖先直接拒绝；不会先写同批前一个文件再遇到这些可预知冲突。

独立测试owner在 `reviews/reproducibility.md:25–35` 记录：10个unittest全通过，包含交叉Origin/Host拒绝、保存/readback、遍历与路径冲突拒绝后的文件hash/health/listing不变。本架构复核只核对该测试记录与代码，不另跑或扩大审查。前述“研究Demo范围内无阻断架构问题”结论适用于上述最终SHA；后面的batch crash限制仍保留。

## 5. 非阻断限制与不应扩大宣称的内容

- **多文件publish不是崩溃原子事务。** `server.py:165–177` 逐文件执行atomic replace，最后才写manifest。各单文件替换是原子的，预校验在任何写入之前完成；但若途中发生磁盘I/O故障或进程崩溃，可能已写入部分文件。`atomic-smoke.json` 只证明create/delete，不证明整个batch的all-or-nothing或crash recovery。这不阻断单用户研究Demo；README与报告不应称其为事务存储。
- 原始脚本允许用户logic执行，需要 `unsafe-inline/unsafe-eval`；adapter与CSP不是可运行任意敌意项目的安全产品。当前验证对象是已捕获作品，不能扩大到不受信任第三方任意代码运行平台。
- `__replayInfo.unavailable` 明确列出sample/db/room/comments/assets/downloads/paste/mcp等未实现能力。Demo证明原UI与本机文件回写链，不证明模型生成、协同、所有导入/导出或云端权限功能已可用。
- 原bundle没有source map；格式化、字符串提取和模块索引恢复的是交付前端逻辑。原始TypeScript类型、全部源码模块边界、服务器与模型代码未因此恢复。

复核产物仅此文件；没有在本复核中提交、推送、发布或修改原始存档。
