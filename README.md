# AI History - AI 全史

从图灵测试到GPT：探索人工智能的完整发展历程。

一个长滚动叙事型网站，采用 Apple 风格的滚动驱动动效，展示 AI 发展史上的重要事件、论文、模型和人物。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: GSAP + ScrollTrigger
- **国际化**: next-intl
- **搜索**: FlexSearch

## 功能特性

- ✅ 双语支持（中文/英文）
- ✅ 长滚动叙事页面
- ✅ 侧边目录导航（点击跳转 + 滚动高亮）
- ✅ Apple 风格滚动动效
- ✅ 事件详情页
- ✅ 标签页
- ✅ 实时搜索（客户端索引）
- ✅ 响应式设计
- ✅ 性能优化（懒加载、GPU加速）
- ✅ 可访问性（减少动画、焦点状态）

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
ai-history/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 语言路由
│   │   ├── page.tsx       # 首页（长滚动）
│   │   ├── event/[slug]/  # 事件详情页
│   │   ├── search/        # 搜索页
│   │   ├── tag/           # 标签页
│   │   └── layout.tsx     # 语言布局
│   ├── globals.css        # 全局样式
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── navigation/        # 导航组件
│   ├── sections/          # 章节组件
│   ├── timeline/          # 时间线组件
│   ├── search/            # 搜索组件
│   └── providers/         # Context Providers
├── lib/                   # 工具库
│   ├── data/              # 数据文件
│   ├── hooks/             # 自定义 Hooks
│   ├── utils/             # 工具函数
│   ├── search/            # 搜索索引
│   └── i18n/              # 国际化配置
├── messages/              # 翻译文件
├── types/                 # TypeScript 类型
└── public/                # 静态资源
```

## 章节规划

| 章节ID | 时期 | 标题 | 动效类型 |
|--------|------|------|----------|
| hero | - | 序章 | 视差 + 淡入 |
| origins | 1940s-1950s | 起源 | 交替卡片 |
| early-ai | 1960s-1970s | 早期AI | 视差滚动 |
| expert-systems | 1980s | 专家系统 | 卡片叠加 |
| statistical-learning | 1990s-2000s | 统计学习 | 水平滚动 |
| deep-learning | 2010-2016 | 深度学习 | 全屏粘滞 |
| transformer | 2017-2019 | Transformer | 文字揭示 |
| llm-era | 2020s | 大模型 | 瀑布流 |
| future | Future | 未来展望 | 对比卡片 |

## 添加新事件

编辑 `lib/data/events.ts`：

```typescript
{
  id: 'unique-id',
  slug: 'url-slug',
  date: '2024-01-01',
  year: 2024,
  title_zh: '中文标题',
  title_en: 'English Title',
  description_zh: '中文描述',
  description_en: 'English description',
  content_zh: '中文详细内容（可选）',
  content_en: 'English detailed content (optional)',
  category: 'paper' | 'model' | 'person' | 'conference' | 'milestone' | 'software' | 'book' | 'product',
  tags: ['tag1', 'tag2'],
  links: [
    { title: 'Link title', url: 'https://...', type: 'paper' }
  ],
  related_events: ['event-id-1', 'event-id-2'],
}
```

## 添加新章节

1. 在 `lib/data/sections.ts` 添加章节配置
2. 在 `app/[locale]/page.tsx` 添加章节 JSX
3. 在 `components/sections/` 创建章节组件（如需自定义动效）

## 自定义动画

所有动画使用 GSAP + ScrollTrigger，参考 `lib/utils/animation.ts`：

```typescript
import { gsap, ScrollTrigger } from '@/lib/utils/animation';

useEffect(() => {
  // 淡入动画
  gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
```

## 搜索索引构建

项目使用 FlexSearch 实现客户端搜索。构建时自动生成索引：

```bash
npm run build
# 自动运行: tsx lib/search/index.ts
```

手动生成索引：

```bash
npx tsx lib/search/index.ts
```

## 视觉规范

详见 [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)

## 性能优化

- ✅ 图片懒加载
- ✅ 虚拟滚动（长列表）
- ✅ GPU 加速（transform、opacity）
- ✅ will-change 提示
- ✅ 防抖/节流（滚动事件）
- ✅ 减少动画模式（prefers-reduced-motion）

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器（iOS Safari、Chrome Mobile）

## 待办事项

- [ ] 添加更多历史事件数据
- [ ] 实现时间线浏览页
- [ ] 添加分享功能
- [ ] 添加引用导出（BibTeX、APA）
- [ ] 优化首屏加载性能
- [ ] 添加暗色模式切换
- [ ] 添加阅读进度条
- [ ] 添加数据可视化（图表）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

---

**Made with ❤️ for the AI community**
