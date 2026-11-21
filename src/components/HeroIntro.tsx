import { ArrowRight, Keyboard, Mouse, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/timeline';

interface HeroIntroProps {
  totalNodes: number;
  highlightNodes: number;
  onStartJourney: () => void;
}

export function HeroIntro({ totalNodes, highlightNodes, onStartJourney }: HeroIntroProps) {
  const yearSpan = SITE_CONFIG.endYear - SITE_CONFIG.startYear;

  return (
    <section className="hero-panel" aria-label="站点导言">
      <div className="hero-panel__eyebrow">
        <span className="hero-status-dot" />
        <span>{SITE_CONFIG.englishTitle}</span>
        <span className="hero-panel__divider">/</span>
        <span>BY {SITE_CONFIG.author}</span>
      </div>

      <h1 className="hero-panel__title">
        <span className="hero-panel__title-main">{SITE_CONFIG.title}</span>
        <span className="hero-panel__title-years">
          {SITE_CONFIG.startYear}
          <span className="hero-panel__arrow">→</span>
          {SITE_CONFIG.endYear}
        </span>
      </h1>

      <p className="hero-panel__tagline">{SITE_CONFIG.tagline}</p>
      <p className="hero-panel__desc">{SITE_CONFIG.description}</p>

      <div className="hero-stats">
        <div className="hero-stat-card">
          <span className="hero-stat-card__value">{yearSpan}+</span>
          <span className="hero-stat-card__label">跨度年份</span>
        </div>
        <div className="hero-stat-card">
          <span className="hero-stat-card__value">{String(totalNodes).padStart(2, '0')}</span>
          <span className="hero-stat-card__label">时间节点</span>
        </div>
        <div className="hero-stat-card">
          <span className="hero-stat-card__value">{String(highlightNodes).padStart(2, '0')}</span>
          <span className="hero-stat-card__label">核心里程碑</span>
        </div>
      </div>

      <div className="hero-actions">
        <button type="button" className="hero-cta-btn" onClick={onStartJourney}>
          <span>开启时光轴</span>
          <ArrowRight size={16} />
        </button>

        <div className="hero-hints">
          <span className="hero-hint-chip">
            <Mouse size={13} />
            滚轮 / 拖拽横滑
          </span>
          <span className="hero-hint-chip">
            <Sparkles size={13} />
            鼠标所至即点亮
          </span>
          <span className="hero-hint-chip">
            <Keyboard size={13} />← → 键切换
          </span>
        </div>
      </div>
    </section>
  );
}
