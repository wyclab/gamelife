import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { TimelineCategory, TimelineNode } from '../types/timeline';
import { CoverArt } from './CoverArt';

interface TimelineNodeCardProps {
  node: TimelineNode;
  index: number;
  position: 'top' | 'bottom';
  onOpen: (node: TimelineNode) => void;
  wasDragged: () => boolean;
}

const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  pc: '电脑游戏',
  console: '主机 · 掌机',
  vibecoding: 'Vibe Coding',
  life: '人生记忆',
};

export function TimelineNodeCard({
  node,
  index,
  position,
  onOpen,
  wasDragged,
}: TimelineNodeCardProps) {
  const handleClick = () => {
    if (wasDragged()) return;
    onOpen(node);
  };

  return (
    <article
      id={`node-${node.id}`}
      className={`timeline-item timeline-item--${position} ${
        node.highlight ? 'is-highlight' : ''
      } timeline-item--cat-${node.category}`}
      data-timeline-node="true"
    >
      {/* Top half slot */}
      <div className="timeline-item__slot timeline-item__slot--top">
        {position === 'top' ? (
          <button
            type="button"
            className="memory-card"
            data-glow-card="true"
            onClick={handleClick}
            aria-label={`查看 ${node.year} 年回忆：${node.title}`}
          >
            <div className="memory-card__glow-border" aria-hidden="true" />
            <div className="memory-card__spotlight" aria-hidden="true" />
            <div className="memory-card__inner">
              <div className="memory-card__cover-wrap">
                <CoverArt
                  image={node.image}
                  title={node.title}
                  year={node.year}
                  platform={node.platform}
                  coverTheme={node.coverTheme}
                  isPlaceholder={node.isPlaceholder}
                />
              </div>

              <div className="memory-card__body">
                <div className="memory-card__meta-row">
                  <span className={`cat-pill cat-pill--${node.category}`}>
                    {CATEGORY_LABEL[node.category]}
                  </span>
                  <span className="memory-card__era">{node.dateLabel ?? node.year}</span>
                  {node.highlight && (
                    <span className="milestone-pill" title="重要里程碑">
                      <Sparkles size={11} />
                    </span>
                  )}
                </div>

                <h3 className="memory-card__title">{node.title}</h3>
                {node.subtitle && <p className="memory-card__subtitle">{node.subtitle}</p>}
                <p className="memory-card__summary">{node.summary}</p>

                <div className="memory-card__footer">
                  <div className="memory-card__tags">
                    {(node.tags ?? []).slice(0, 3).map((tag) => (
                      <span key={tag} className="memory-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="memory-card__more">
                    详情 <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="timeline-year-echo timeline-year-echo--top">
            <span className="timeline-year-echo__index">
              NODE {String(index + 1).padStart(2, '0')}
            </span>
            <span className="timeline-year-echo__year">{node.year}</span>
            <span className="timeline-year-echo__era">{node.era}</span>
          </div>
        )}
      </div>

      {/* Optical fiber connector + precision node anchor on the center rail */}
      <div className="timeline-item__axis" aria-hidden="true">
        <span
          className={`timeline-fiber timeline-fiber--${position}`}
        />
        <span className="timeline-beacon">
          <span className="timeline-beacon__halo" />
          <span className="timeline-beacon__ring" />
          <span className="timeline-beacon__core" />
        </span>
      </div>

      {/* Bottom half slot */}
      <div className="timeline-item__slot timeline-item__slot--bottom">
        {position === 'bottom' ? (
          <button
            type="button"
            className="memory-card"
            data-glow-card="true"
            onClick={handleClick}
            aria-label={`查看 ${node.year} 年回忆：${node.title}`}
          >
            <div className="memory-card__glow-border" aria-hidden="true" />
            <div className="memory-card__spotlight" aria-hidden="true" />
            <div className="memory-card__inner">
              <div className="memory-card__cover-wrap">
                <CoverArt
                  image={node.image}
                  title={node.title}
                  year={node.year}
                  platform={node.platform}
                  coverTheme={node.coverTheme}
                  isPlaceholder={node.isPlaceholder}
                />
              </div>

              <div className="memory-card__body">
                <div className="memory-card__meta-row">
                  <span className={`cat-pill cat-pill--${node.category}`}>
                    {CATEGORY_LABEL[node.category]}
                  </span>
                  <span className="memory-card__era">{node.dateLabel ?? node.year}</span>
                  {node.highlight && (
                    <span className="milestone-pill" title="重要里程碑">
                      <Sparkles size={11} />
                    </span>
                  )}
                </div>

                <h3 className="memory-card__title">{node.title}</h3>
                {node.subtitle && <p className="memory-card__subtitle">{node.subtitle}</p>}
                <p className="memory-card__summary">{node.summary}</p>

                <div className="memory-card__footer">
                  <div className="memory-card__tags">
                    {(node.tags ?? []).slice(0, 3).map((tag) => (
                      <span key={tag} className="memory-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="memory-card__more">
                    详情 <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="timeline-year-echo timeline-year-echo--bottom">
            <span className="timeline-year-echo__index">
              NODE {String(index + 1).padStart(2, '0')}
            </span>
            <span className="timeline-year-echo__year">{node.year}</span>
            <span className="timeline-year-echo__era">{node.era}</span>
          </div>
        )}
      </div>
    </article>
  );
}
