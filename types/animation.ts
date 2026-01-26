export type AnimationType =
  | 'hero'           // 全屏视差 + 文字淡入
  | 'alternating'    // 左右卡片交替
  | 'parallax'       // 视差滚动
  | 'cards-stack'    // 多卡片叠加展开
  | 'horizontal'     // 水平滚动
  | 'sticky-full'    // 全屏粘滞
  | 'text-reveal'    // 文字逐字显示
  | 'waterfall'      // 瀑布流
  | 'comparison';    // 多观点对比

export interface AnimationConfig {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
}

export interface GSAPTimelineConfig {
  duration?: number;
  ease?: string;
  delay?: number;
}
