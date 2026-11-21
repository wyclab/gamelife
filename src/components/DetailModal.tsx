import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import type { TimelineCategory, TimelineNode } from '../types/timeline';
import { CoverArt } from './CoverArt';

interface DetailModalProps {
  node: TimelineNode | null;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  pc: '电脑游戏',
  console: '主机 · 掌机',
  vibecoding: 'Vibe Coding',
  life: '人生记忆',
};

export function DetailModal({
  node,
  hasPrev,
  hasNext,
  onClose,
  onPrev,
  onNext,
}: DetailModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [node?.id]);

  useEffect(() => {
    if (!node) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (event.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [node, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!node) return null;

  const images = [
    ...(node.image ? [node.image] : []),
    ...(node.gallery ?? []),
  ];
  const currentImage = images[activeImgIndex] ?? node.image;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-node-title"
      onClick={onClose}
    >
      <div
        className="modal-card"
        data-allow-vertical-scroll="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-topbar">
          <div className="modal-topbar__left">
            <span className="modal-year-badge">{node.dateLabel ?? node.year}</span>
            <span className="modal-era-text">{node.era}</span>
          </div>
          <div className="modal-topbar__right">
            <button
              type="button"
              className="modal-icon-btn"
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="上一个时间节点"
              title="上一个节点 (←)"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="modal-icon-btn"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="下一个时间节点"
              title="下一个节点 (→)"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="modal-icon-btn modal-icon-btn--close"
              onClick={onClose}
              aria-label="关闭详情"
              title="关闭 (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-scroll-content" data-allow-vertical-scroll="true">
          <div className="modal-hero-media">
            <CoverArt
              image={currentImage}
              title={node.title}
              year={node.year}
              platform={node.platform}
              coverTheme={node.coverTheme}
              isPlaceholder={node.isPlaceholder}
              aspect="modal"
            />
            {images.length > 1 && (
              <div className="modal-gallery-thumbs">
                {images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl}
                    type="button"
                    className={`modal-thumb ${idx === activeImgIndex ? 'is-active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={imgUrl} alt={`${node.title} 图 ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-body">
            <div className="modal-badges">
              <span className={`cat-pill cat-pill--${node.category}`}>
                {CATEGORY_LABEL[node.category]}
              </span>
              <span className="modal-platform-badge">{node.platform}</span>
              {node.highlight && (
                <span className="milestone-pill milestone-pill--text">
                  <Sparkles size={12} /> 里程碑节点
                </span>
              )}
              {node.isPlaceholder && (
                <span className="placeholder-pill">示例模板 · 可在 data/timeline.ts 编辑</span>
              )}
            </div>

            <h2 id="modal-node-title" className="modal-title">
              {node.title}
            </h2>
            {node.subtitle && <p className="modal-subtitle">{node.subtitle}</p>}

            {node.quote && (
              <blockquote className="modal-quote">
                <Quote size={16} className="modal-quote__icon" />
                <span>{node.quote}</span>
              </blockquote>
            )}

            <div className="modal-story">
              <p className="modal-story__lead">{node.summary}</p>
              {(node.story ?? []).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {node.meta && node.meta.length > 0 && (
              <div className="modal-meta-grid">
                {node.meta.map((item) => (
                  <div key={item.label} className="modal-meta-box">
                    <span className="modal-meta-box__label">{item.label}</span>
                    <span className="modal-meta-box__value">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-footer-row">
              <div className="modal-tags">
                {(node.tags ?? []).map((tag) => (
                  <span key={tag} className="memory-tag">
                    #{tag}
                  </span>
                ))}
              </div>

              {node.link && (
                <a
                  href={node.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-ext-cta"
                >
                  <span>{node.link.label}</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
