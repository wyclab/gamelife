import { ExternalLink, Gamepad2, Moon, Sun } from 'lucide-react';
import { CATEGORIES, SITE_CONFIG } from '../data/timeline';
import type { ThemeMode } from '../hooks/useTheme';
import type { TimelineCategory } from '../types/timeline';

interface NavbarProps {
  activeCategory: TimelineCategory | 'all';
  onSelectCategory: (category: TimelineCategory | 'all') => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  totalCount: number;
  filteredCount: number;
}

export function Navbar({
  activeCategory,
  onSelectCategory,
  theme,
  onToggleTheme,
  totalCount,
  filteredCount,
}: NavbarProps) {
  return (
    <header className="navbar-shell">
      <nav className="navbar-pill" aria-label="主导航">
        {/* Brand */}
        <a
          href="#top"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            const scroller = document.getElementById('timeline-scroller');
            scroller?.scrollTo({ left: 0, behavior: 'smooth' });
          }}
        >
          <span className="navbar-brand__icon" aria-hidden="true">
            <Gamepad2 size={17} />
          </span>
          <span className="navbar-brand__text">
            <strong>{SITE_CONFIG.title}</strong>
            <span className="navbar-brand__span">
              {SITE_CONFIG.startYear}—{SITE_CONFIG.endYear}
            </span>
          </span>
        </a>

        {/* Category Filter Tabs */}
        <div className="navbar-tabs" role="tablist" aria-label="按游戏类型筛选">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`navbar-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
                title={cat.description}
              >
                <span className="navbar-tab__full">{cat.label}</span>
                <span className="navbar-tab__short">{cat.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right Utility Actions */}
        <div className="navbar-actions">
          <span className="navbar-counter" title="当前显示的节点数量">
            {filteredCount} / {totalCount}
          </span>

          <button
            type="button"
            className="theme-toggle-pill"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色科技模式'}
            title={theme === 'dark' ? '切换浅色模式（云川白）' : '切换深色科技模式（Steam 暗夜）'}
          >
            <span className="theme-toggle-pill__icon">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </span>
            <span className="theme-toggle-pill__label">
              {theme === 'dark' ? '浅色' : '暗夜'}
            </span>
          </button>

          <a
            href={SITE_CONFIG.links.home.url}
            target="_blank"
            rel="noreferrer"
            className="navbar-ext-link"
          >
            {SITE_CONFIG.links.home.label}
          </a>

          <a
            href={SITE_CONFIG.links.blog.url}
            target="_blank"
            rel="noreferrer"
            className="navbar-blog-cta"
          >
            <span>{SITE_CONFIG.links.blog.label}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </nav>
    </header>
  );
}
