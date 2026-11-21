import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/timeline';
import type { TimelineNode } from '../types/timeline';

interface MiniMapBarProps {
  nodes: TimelineNode[];
  scrollProgress: number;
  onJumpToNode: (nodeId: string) => void;
  onScrollStep: (direction: 'prev' | 'next') => void;
  onScrubProgress: (progress: number) => void;
}

export function MiniMapBar({
  nodes,
  scrollProgress,
  onJumpToNode,
  onScrollStep,
  onScrubProgress,
}: MiniMapBarProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [hoverNode, setHoverNode] = useState<TimelineNode | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);

  const handleRailMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setHoverPercent(pct);
    el.style.setProperty('--mini-x', `${event.clientX - rect.left}px`);
  };

  const handleRailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) return;
    const el = railRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    onScrubProgress(pct);
  };

  const hasSubset = nodes.length > 0 && (nodes[0].year !== SITE_CONFIG.startYear || nodes[nodes.length - 1].year !== SITE_CONFIG.endYear);
  const startYear = hasSubset ? nodes[0].year : SITE_CONFIG.startYear;
  const endYear = hasSubset ? nodes[nodes.length - 1].year : SITE_CONFIG.endYear;
  const span = Math.max(1, endYear - startYear);

  return (
    <footer className="minimap-shell" aria-label="时间轴缩略导航">
      <div className="minimap-bar">
        <button
          type="button"
          className="minimap-step-btn"
          onClick={() => onScrollStep('prev')}
          aria-label="向左滚动时间轴"
          title="向左滚动 (←)"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="minimap-year-edge">{startYear}</span>

        <div
          ref={railRef}
          className="minimap-rail"
          onMouseMove={handleRailMouseMove}
          onMouseLeave={() => {
            setHoverNode(null);
            setHoverPercent(null);
          }}
          onClick={handleRailClick}
        >
          {/* Floating hover tooltip */}
          {hoverNode && (
            <div
              className="minimap-tooltip"
              style={{
                left: `${Math.min(
                  92,
                  Math.max(8, ((hoverNode.year - startYear) / span) * 100)
                )}%`,
              }}
            >
              <span className="minimap-tooltip__year">{hoverNode.year}</span>
              <span className="minimap-tooltip__title">{hoverNode.title}</span>
            </div>
          )}

          <div className="minimap-rail__track" />
          <div
            className="minimap-rail__fill"
            style={{ width: `${Math.round(scrollProgress * 1000) / 10}%` }}
          />
          {hoverPercent !== null && (
            <div
              className="minimap-rail__cursor-glow"
              style={{ left: `${hoverPercent * 100}%` }}
            />
          )}

          {nodes.map((node, idx) => {
            // Compute normalized position by year, with gentle fallback spacing when years collide
            const yearPos = Math.min(1, Math.max(0, (node.year - startYear) / span));
            const leftPct = nodes.length === 1 ? 50 : 4 + yearPos * 92;
            const isNearHover =
              hoverPercent !== null && Math.abs(hoverPercent - leftPct / 100) < 0.08;

            return (
              <button
                key={node.id}
                type="button"
                className={`minimap-dot ${node.highlight ? 'is-highlight' : ''} ${
                  isNearHover ? 'is-lit' : ''
                }`}
                style={{ left: `${leftPct}%`, zIndex: isNearHover ? 10 : idx + 1 }}
                onMouseEnter={() => setHoverNode(node)}
                onFocus={() => setHoverNode(node)}
                onBlur={() => setHoverNode(null)}
                onClick={() => onJumpToNode(node.id)}
                aria-label={`跳转到 ${node.year} 年：${node.title}`}
              >
                <span className="minimap-dot__core" />
              </button>
            );
          })}
        </div>

        <span className="minimap-year-edge">{endYear}</span>

        <button
          type="button"
          className="minimap-step-btn"
          onClick={() => onScrollStep('next')}
          aria-label="向右滚动时间轴"
          title="向右滚动 (→)"
        >
          <ChevronRight size={16} />
        </button>

        <span className="minimap-percent" aria-live="polite">
          {String(Math.round(scrollProgress * 100)).padStart(2, '0')}%
        </span>
      </div>
    </footer>
  );
}
