# 紫色 Claude 光标的可读重建

本目录只消费外部活动、等待画板、文件抵达和相机事件，不请求 Claude，也不写设计文档。界面中的“本机协议演示”显式标注为模拟输入；不能作为真实 AI 编辑成功的证据。

## 对照证据

行号对应仓库 `analysis-canvas/formatted/app.js` 与 `app.css`：

| 原包入口                                  | 已重建的语义                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| `YH`，app.js:76806                        | 16×16 SVG 路径、白色 1.2 stroke、圆角连接；紫色由 CSS 变量提供                              |
| CSS:9073、13042–13062                     | `#6250d6`、箭头阴影、Claude pill 的 left 12 / top 14、11px / 16px 字号行高                  |
| `Z6`，app.js:119741                       | 光标与标签作为一组，绝对位置、不拦截指针                                                    |
| `CDt`，app.js:158138                      | box 偏移 `18 / scale`；rest 偏移 `-72 / scale`；字形 `1 / scale` 抵消世界缩放               |
| `ADt`，app.js:158165                      | working / heard 优先级；按页等待队列；box、rest、tips、none；缺省活动信号的 90s / 600s 超时 |
| `ETn`，app.js:158257；`eM`，app.js:101503 | idle 的 2s grace，新的 working 取消待定 idle                                                |
| `xDt` / `SFe`，app.js:158005 / 158008     | 3s 后展示首条 tips，之后每 5s 换一条，共 9 条循环                                           |

`activityState.ts` 将上述判断写成可测试纯函数；`ActivityService` 管外部 store、定时器和生命周期；两个 React 组件各自只渲染一个职责。原 `FDt` 的创建模式闸门只在 feature flag 开启、有 `listedBoards` 能力，并且初始画板为空或存在 awaited 时开启；本目录把这个闸门暴露为 `enabled` 输入。按钮在受控样本中显式开启它，没有把任意编辑操作自动解释为原站生成模式。

原包还包含空画布装饰性的随机轨迹与弹簧跟随（`GSt`，app.js:101286）。这里没有用伪鼠标轨迹暗示 AI 正在操作页面；真实 AI 的补丁执行、生产保存 ACK、协作消息未接入本机演示。tips 保留原文以便对标，不代表其中提到的分享、评论能力已在 Demo 实现。

## 接入

在画布视口中（不是已缩放的 world 内）放置 `ActivityOverlay` 和 `ActivityControls`。由绑定层在设计状态变化后调用 `updateProject({ boards, camera, enabled: true })`。Service 应由 owner 构造并在卸载时 `dispose()`；生产协议若接入，可调用 `setWorking`、`setAwaitedBoards`、`arriveBoard`，不必经过模拟按钮。

单页 Demo 的 `boards` 也是当前页画板。多页消费者必须额外提供 `artboardsHere`，值为当前页且已排除 frameless 的画板，避免把其他页误判为空画布的 `lastHere`。

`npm test -- activity.test.ts` 覆盖纯状态、相机变换、2s grace、tips 周期及取消资源；没有像素镜像断言。
