import { FileCode2, RotateCcw, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/timeline';

interface OutroCardProps {
  onBackToStart: () => void;
}

export function OutroCard({ onBackToStart }: OutroCardProps) {
  return (
    <section className="outro-panel" aria-label="未完待续">
      <div className="outro-card" data-glow-card="true">
        <div className="outro-card__badge">
          <Sparkles size={14} />
          <span>NEXT LEVEL LOADING...</span>
        </div>

        <h2 className="outro-card__title">下一段游戏人生，正在存档中</h2>
        <p className="outro-card__desc">
          无论是通关一款令人热泪盈眶的新作，还是在深夜用 Vibe Coding
          点亮一个新灵感，都随时可以写进这条时间轴。
        </p>

        <div className="outro-guide-box">
          <div className="outro-guide-box__head">
            <FileCode2 size={15} />
            <span>快速录入你的回忆</span>
          </div>
          <p>
            编辑 <code>src/data/timeline.ts</code> 修改游戏名与故事，将截图放入{' '}
            <code>public/images/</code> 即可自动更新。
          </p>
        </div>

        <div className="outro-card__footer">
          <button type="button" className="outro-reset-btn" onClick={onBackToStart}>
            <RotateCcw size={15} />
            <span>回到 {SITE_CONFIG.startYear} 起点</span>
          </button>
          <span className="outro-copyright">
            © {SITE_CONFIG.startYear}–{SITE_CONFIG.endYear} {SITE_CONFIG.author}
          </span>
        </div>
      </div>
    </section>
  );
}
