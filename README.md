# AI History - AI 全史

面向研究人员和开发者的双语 AI 历史网站，按年代梳理重要论文、模型、软件、人物与里程碑。当前收录 80 个事件，覆盖 1943—2025 年；首页提供章节叙事，时间线用于筛选浏览，技术谱系按学派、方法与技术组织知识，事件详情提供背景、相关事件和来源链接。

## 当前功能

- 中文与英文路由：`/zh`、`/en`，可在导航中切换语言。
- 首页覆盖起源、早期 AI、专家系统、统计学习、深度学习、Transformer、大模型与未来展望。
- 时间线：`/zh/timeline`、`/en/timeline`，按年份分组，支持年代、类别、关键词及正序／倒序筛选。
- 时间线筛选保存在 URL 的 `decade`、`category`、`q`、`order` 参数中，可复制链接保留筛选状态，支持浏览器前进／后退。
- 技术谱系：`/zh/knowledge`、`/en/knowledge`，通过 35 个可展开节点浏览流派、方法和技术，查看关联事件、参考文献与节点交叉链接；URL 的 `node` 参数保存选中节点，`q` 参数保存分支搜索。技术谱系与时间线提供两种浏览入口。
- 双语事件详情页、标签页与搜索页；支持中文片段与多关键词搜索。
- 搜索对 Unicode 文本进行 NFKC 归一化，忽略大小写，使用子串匹配并要求所有查询词命中，优先展示标题匹配的结果。
- 亮色、暗色与跟随系统三种主题偏好；手动选择可保存在浏览器中。
- 桌面侧边导航、移动端菜单、章节滚动高亮与阅读进度条。
- GSAP 滚动动画，支持减少动画偏好；移动导航支持键盘焦点管理与 Escape 关闭。

时间线筛选示例：

```text
/zh/timeline?decade=2010&category=paper&q=attention&order=desc
```

## 技术栈

- **框架**：Next.js 16（App Router）、React
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **字体**：本地系统字体栈，构建时无需下载 Google Fonts
- **动画**：GSAP + ScrollTrigger
- **国际化**：next-intl
- **搜索**：客户端 JSON 索引与轻量匹配排序；当前实现不使用 FlexSearch，安装依赖中暂时仍保留该包
- **检查**：ESLint、TypeScript、Node.js 测试运行器 + tsx

## 快速开始

安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

打开 [中文首页](http://localhost:3000/zh) 或 [英文首页](http://localhost:3000/en)。

构建并启动生产服务器：

```bash
npm run build
npm start
```

开发与构建前会自动生成搜索索引，修改事件数据后无需额外配置。

## 检查与测试

```bash
npm run lint
npm run typecheck
npm test
```

`lint` 使用 `eslint .`，`typecheck` 使用 `tsc --noEmit`。目前包含 17 个搜索、时间线和技术谱系测试，覆盖双语与多词检索、索引加载与重试、筛选排序、按年分组、节点引用、交叉关联及全部事件覆盖。浏览器交互与生产构建需分别验证，单元测试不替代这些检查。

## 项目结构

```text
ai-history/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx          # 章节叙事首页
│   │   ├── timeline/         # 时间线浏览
│   │   ├── knowledge/        # 技术谱系与关联事件
│   │   ├── event/[slug]/     # 事件详情
│   │   ├── search/           # 搜索页
│   │   ├── tag/[slug]/       # 标签页
│   │   └── layout.tsx        # 语言布局与公共导航
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── navigation/           # 导航、主题切换、阅读进度
│   ├── providers/            # 主题与动画上下文
│   ├── search/               # 搜索输入与结果状态
│   ├── knowledge/            # 技术树与节点详情
│   ├── sections/             # 首页章节
│   └── timeline/             # 事件卡片与时间线浏览器
├── i18n/                     # 国际化配置与导航工具
├── lib/
│   ├── data/                 # 事件、章节与技术谱系数据
│   ├── hooks/
│   ├── search/               # 索引生成、客户端搜索、类型
│   └── utils/                # 动画与时间线筛选工具
├── messages/                 # 中文、英文文案
├── public/search/index.json  # 生成的搜索数据
├── tests/                    # 搜索、时间线与技术谱系测试
└── types/
```

## 章节

| 章节 ID | 时期 | 内容 |
|---------|------|------|
| hero | 序章 | AI 全史 |
| origins | 1940s—1950s | 起源：从图灵到达特茅斯 |
| early-ai | 1960s—1970s | 早期 AI 的探索与挫折 |
| expert-systems | 1980s | 专家系统与 AI 寒冬 |
| statistical-learning | 1990s—2000s | 统计学习的兴起 |
| deep-learning | 2010—2016 | 深度学习爆发 |
| transformer | 2017—2019 | Transformer 与注意力机制 |
| llm-era | 2020s | 大模型与生成式 AI |
| future | 未来 | 机遇、挑战与争议 |

## 添加事件与章节

在 `lib/data/events.ts` 添加双语事件，使用唯一 `id` 和 `slug`，保持 `date` 与 `year` 一致：

```typescript
{
  id: 'example-paper-2025',
  slug: 'example-paper-2025',
  date: '2025-01-01',
  year: 2025,
  title_zh: '论文中文标题',
  title_en: 'Paper title',
  description_zh: '中文摘要',
  description_en: 'English summary',
  content_zh: '中文背景与影响',
  content_en: 'Background and impact',
  category: 'paper',
  tags: ['machine-learning'],
  links: [{ title: 'Original paper', url: 'https://example.org/paper', type: 'paper' }],
  related_events: ['turing-1950'],
}
```

类别可选 `paper`、`model`、`person`、`conference`、`milestone`、`software`、`book` 或 `product`。新增事件还需加入 `lib/data/sections.ts` 对应章节的 `eventIds`，并检查首页展示；时间线直接读取完整事件数据。

新增章节时更新 `lib/data/sections.ts` 和 `app/[locale]/page.tsx`，需要特殊内容或动画时在 `components/sections/` 添加组件。内部链接使用 `i18n/routing.ts` 导出的 `Link`，传入不含语言前缀的路径，如 `/event/example-paper-2025`，由导航工具添加语言前缀。

## 技术谱系数据

编辑 `lib/data/knowledge-tree.ts` 添加节点、双语说明、`eventIds`、参考文献与 `relatedNodeIds`。父节点自动聚合下级事件并去重，交叉关联用于跳转，不会继承关联分支的事件。一个事件可以出现在多个方法分支；应用与研究生态单独组织，以避免对未公开的产品架构作出假设。

## 搜索索引

`npm run dev` 与 `npm run build` 分别通过 `predev`、`prebuild` 调用 `search:index`，将事件数据写入 `public/search/index.json`。也可手动生成：

```bash
npm run search:index
# 实际命令：node --import tsx lib/search/index.ts
```

客户端首次搜索时加载并校验该文件，复用并发加载请求；加载失败时界面提供重试。索引包含标题、摘要、标签、类别与年份，不包含详情正文。

## 动画与视觉

GSAP 工具位于 `lib/utils/animation.ts`。新增动画应先检查 `shouldAnimate()`，通过 `gsap.context()` 限定作用范围，并在组件卸载时调用 `context.revert()` 清理。事件卡片默认可见，避免动画关闭时隐藏内容。

视觉设计参考 [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)。浏览器兼容性、性能与更多无障碍场景仍需持续验证。

## 后续计划

- 持续补充历史事件，核对日期与来源。
- 添加专门的分享功能；目前可复制时间线筛选 URL。
- 添加引用导出（BibTeX、APA）。
- 添加历史数据可视化。
- 根据实际测量改进加载与滚动性能。

## 贡献与许可证

欢迎提交 Issue 和 Pull Request。项目使用 MIT 许可证。
