# AI History - 视觉规范与样式指南

## 设计理念

"科技感大片"风格：克制、高级、强调叙事与信息层级，类似 Apple 官网的滚动体验。

---

## 一、排版系统

### 字体家族
- **主字体**: Inter (sans-serif)
- **展示字体**: Cal Sans (可选，用于大标题)

### 字号层级

```css
/* Hero 标题 */
text-hero: clamp(3rem, 10vw, 8rem)
/* 响应式：移动端 48px → 桌面端 128px */

/* 章节标题 */
text-section: clamp(2rem, 5vw, 4rem)
/* 响应式：移动端 32px → 桌面端 64px */

/* 卡片标题 */
text-card: clamp(1.25rem, 2vw, 1.75rem)
/* 响应式：移动端 20px → 桌面端 28px */

/* 正文 */
text-base: 1rem (16px)

/* 大段正文 */
prose-lg: 1.125rem (18px)
```

### 字重
- **Light**: 300 (辅助文字)
- **Regular**: 400 (正文)
- **Medium**: 500 (强调)
- **Semibold**: 600 (小标题、按钮)
- **Bold**: 700 (标题)

### 行高
- 标题: 1.1 - 1.2
- 正文: 1.6 - 1.8

### 字间距
- 大标题: -0.02em
- 章节标题: -0.015em
- 卡片标题: -0.01em
- 正文: normal

---

## 二、色彩系统

### 主色调 (Primary - 蓝色系)
```
primary-50:  #f0f9ff
primary-100: #e0f2fe
primary-200: #bae6fd
primary-300: #7dd3fc
primary-400: #38bdf8
primary-500: #0ea5e9  /* 主色 */
primary-600: #0284c7  /* hover */
primary-700: #0369a1
primary-800: #075985
primary-900: #0c4a6e
primary-950: #082f49
```

### 暗色系 (Dark - 深蓝灰)
```
dark-50:  #f8fafc
dark-100: #f1f5f9
dark-200: #e2e8f0
dark-300: #cbd5e1
dark-400: #94a3b8
dark-500: #64748b
dark-600: #475569
dark-700: #334155
dark-800: #1e293b
dark-900: #0f172a  /* 背景 */
dark-950: #020617  /* 深背景 */
```

### 语义色彩
- **成功**: green-500
- **警告**: yellow-500
- **错误**: red-500
- **信息**: blue-500

### 渐变
```css
/* 主渐变 */
bg-gradient-to-r from-primary-600 to-purple-600

/* 深色渐变 */
bg-gradient-to-b from-dark-950 to-primary-950

/* 标题渐变 */
bg-gradient-to-r from-white via-primary-100 to-purple-200
```

---

## 三、背景与质感

### 章节主题
- **Light**: 白色背景，适合内容密集的章节
- **Dark**: 深色背景，适合沉浸式章节
- **Gradient**: 渐变背景，适合过渡章节

### 背景装饰
```css
/* 模糊光晕 */
<div className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />

/* 噪点纹理（可选） */
background-image: url("data:image/svg+xml,...")
```

### 玻璃态效果
```css
glass: bg-white/80 backdrop-blur-md border border-white/20
glass-dark: bg-dark-900/80 backdrop-blur-md border border-dark-700/50
```

---

## 四、组件样式

### 按钮
```css
/* 主要按钮 */
px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors

/* 次要按钮 */
px-6 py-3 bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-white rounded-xl font-semibold

/* 图标按钮 */
w-12 h-12 flex items-center justify-center rounded-xl
```

### 卡片
```css
/* 基础卡片 */
bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700

/* Hover 效果 */
hover:shadow-2xl hover:border-primary-500/50 transition-all duration-300
```

### 输入框
```css
/* 搜索框 */
w-full px-6 py-4 rounded-2xl bg-white dark:bg-dark-800 border-2 border-gray-200 dark:border-dark-700
focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20
```

### 标签
```css
/* 类别标签 */
px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm

/* 关键词标签 */
px-2 py-1 bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 rounded-md text-xs
```

---

## 五、间距系统

### 基础间距
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)
- 2xl: 4rem (64px)

### 章节间距
- Section padding: py-24 (6rem / 96px)
- 全屏章节: min-h-screen

### 内容间距
- 标题与描述: mb-4
- 卡片间距: gap-6 ~ gap-8
- 段落间距: space-y-6

---

## 六、动效规范

### 动画时长
- **快速**: 150-300ms (按钮hover、工具提示)
- **标准**: 300-500ms (卡片展开、淡入淡出)
- **慢速**: 500-800ms (章节切换、复杂动画)

### 缓动函数
```css
/* 标准缓动 */
ease: 'power3.out'

/* 弹性进入 */
ease: 'back.out(1.7)'

/* 平滑滚动 */
scrub: true
```

### 滚动触发区间
```javascript
// 标准触发
start: 'top 80%'
end: 'bottom 20%'

// 粘滞章节
start: 'top top'
end: 'bottom bottom'
```

### 动画类型
1. **淡入**: `opacity: 0 → 1`
2. **上滑**: `y: 30 → 0` + opacity
3. **缩放**: `scale: 0.8 → 1` + opacity
4. **视差**: `yPercent` 绑定滚动

---

## 七、响应式断点

```css
/* 移动端 */
< 768px

/* 平板 */
768px - 1024px

/* 桌面端 */
> 1024px

/* 大屏 */
> 1280px
```

### 响应式调整
- 侧边导航: 移动端 → 底部浮动按钮
- 卡片列数: 1列 → 2列 → 3列
- 字号: clamp() 响应式缩放
- 间距: 移动端减半

---

## 八、阴影系统

```css
shadow-sm:   小阴影 (卡片默认)
shadow-lg:   大阴影 (卡片hover)
shadow-2xl:  超大阴影 (模态框)
shadow-primary-500/20: 彩色阴影
```

---

## 九、可访问性

### 对比度
- 正文文字: 最低 4.5:1
- 大文字: 最低 3:1
- 交互元素: 最低 3:1

### 焦点状态
```css
focus:outline-none focus:ring-4 focus:ring-primary-500/20
```

### 减少动画
```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

### 屏幕阅读器
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  /* ... */
}
```

---

## 十、性能优化

### will-change
```css
will-change-transform: { will-change: transform }
will-change-opacity: { will-change: opacity }
```

### 图片懒加载
```html
<img loading="lazy" ... />
```

### GPU 加速
```css
transform: translateZ(0)
```

---

## 十一、使用示例

### Hero 章节样式
```tsx
<SectionWrapper id="hero" theme="dark" fullHeight>
  <h1 className="text-hero font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-purple-200">
    AI 全史
  </h1>
</SectionWrapper>
```

### 事件卡片样式
```tsx
<div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700 hover:shadow-2xl transition-all duration-300">
  {/* content */}
</div>
```

### 按钮样式
```tsx
<button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors">
  了解更多
</button>
```

---

**备注**: 所有样式已集成在 `tailwind.config.ts` 和 `app/globals.css` 中，直接使用 Tailwind 类名即可。
