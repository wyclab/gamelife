export type TimelineCategory = 'pc' | 'console' | 'vibecoding' | 'life';

export type CoverTheme = 'retro' | 'cyber' | 'steam' | 'console' | 'vibe' | 'memory';

export interface TimelineMetaItem {
  /** 字段名称，例如：游戏时长 / 人生阶段 / 通关状态 */
  label: string;
  /** 字段内容，例如：300+ 小时 / 高中 / 全成就 */
  value: string;
}

export interface TimelineLink {
  /** 链接文字，例如：阅读相关博客 / 查看项目 */
  label: string;
  /** 完整链接地址 */
  url: string;
}

export interface TimelineNode {
  /** 唯一标识，建议格式：year-slug */
  id: string;
  /** 年份（用于时间轴排序、刻度定位与底部缩略导航） */
  year: number;
  /** 展示日期标签，例如 "2000 · 夏" 或 "2025.03" */
  dateLabel?: string;
  /** 所属篇章 / 时代名称 */
  era: string;
  /** 主标题：游戏名称 / Vibe Coding 项目 / 人生事件 */
  title: string;
  /** 可选副标题：英文名、版本或当时的一句注脚 */
  subtitle?: string;
  /** 广义游戏分类 */
  category: TimelineCategory;
  /** 平台或载体，例如 "PC · Steam" / "小霸王" / "Switch" / "Cursor · AI" */
  platform: string;
  /**
   * 封面图片路径：
   * - 可放本地图片到 public/images/ 后填写 "/images/example.jpg"
   * - 也可直接填写网络图片 URL
   * - 留空时自动渲染对应风格的科技感默认封面
   */
  image?: string;
  /** 详情弹窗中的更多回忆截图或老照片（可选） */
  gallery?: string[];
  /** 留空图片时的默认封面风格 */
  coverTheme?: CoverTheme;
  /** 卡片预览文案（建议 30~70 字） */
  summary: string;
  /** 详情弹窗中的完整回忆正文（每项为一段，可选） */
  story?: string[];
  /** 一句话回忆 / 当时的心境（可选） */
  quote?: string;
  /** 关键词标签 */
  tags?: string[];
  /** Steam 风格数据徽章（时长、平台成就、阶段等，可选） */
  meta?: TimelineMetaItem[];
  /** 关联博文或作品外链（可选） */
  link?: TimelineLink;
  /** 是否标记为重要人生里程碑（获得金色高光与节点星环） */
  highlight?: boolean;
  /** 框架示例占位标记：替换成你的真实内容后可删除或设为 false */
  isPlaceholder?: boolean;
}

export interface CategoryMeta {
  id: TimelineCategory | 'all';
  label: string;
  shortLabel: string;
  description: string;
}

export interface SiteConfig {
  title: string;
  englishTitle: string;
  author: string;
  startYear: number;
  endYear: number;
  tagline: string;
  description: string;
  links: {
    home: { label: string; url: string };
    blog: { label: string; url: string };
  };
}
