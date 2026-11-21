import { useState } from 'react';
import { Code2, Cpu, Gamepad2, Monitor, Sparkles, Trophy } from 'lucide-react';
import type { CoverTheme } from '../types/timeline';

interface CoverArtProps {
  image?: string;
  title: string;
  year: number;
  platform: string;
  coverTheme?: CoverTheme;
  isPlaceholder?: boolean;
  aspect?: 'card' | 'modal';
}

const THEME_CONFIG: Record<
  CoverTheme,
  {
    badge: string;
    gradient: string;
    accent: string;
    pattern: 'grid' | 'scanlines' | 'circuit' | 'dots' | 'code' | 'aurora';
  }
> = {
  retro: {
    badge: '8-BIT GENESIS',
    gradient: 'linear-gradient(135deg, #1b2248 0%, #2b1d52 48%, #0f172a 100%)',
    accent: '#ffc848',
    pattern: 'scanlines',
  },
  cyber: {
    badge: 'PC ARCHIVE',
    gradient: 'linear-gradient(135deg, #0d1d3a 0%, #152d59 50%, #0b1324 100%)',
    accent: '#66c0f4',
    pattern: 'grid',
  },
  steam: {
    badge: 'STEAM DECK // LIB',
    gradient: 'linear-gradient(135deg, #171a21 0%, #1b2838 55%, #1f456e 100%)',
    accent: '#66c0f4',
    pattern: 'circuit',
  },
  console: {
    badge: 'CONSOLE EDITION',
    gradient: 'linear-gradient(135deg, #181c36 0%, #2c2459 52%, #131c33 100%)',
    accent: '#7fa6ff',
    pattern: 'dots',
  },
  vibe: {
    badge: 'VIBE CODING // AI',
    gradient: 'linear-gradient(135deg, #0c1f2e 0%, #162b4d 45%, #2a1f4a 100%)',
    accent: '#4ade80',
    pattern: 'code',
  },
  memory: {
    badge: 'LIFE CHECKPOINT',
    gradient: 'linear-gradient(135deg, #1f1b2e 0%, #2d2542 48%, #161b2e 100%)',
    accent: '#ffc848',
    pattern: 'aurora',
  },
};

function ThemeIcon({ theme }: { theme: CoverTheme }) {
  switch (theme) {
    case 'retro':
      return <Gamepad2 size={24} />;
    case 'cyber':
      return <Monitor size={24} />;
    case 'steam':
      return <Trophy size={24} />;
    case 'console':
      return <Cpu size={24} />;
    case 'vibe':
      return <Code2 size={24} />;
    case 'memory':
      return <Sparkles size={24} />;
  }
}

export function CoverArt({
  image,
  title,
  year,
  platform,
  coverTheme = 'steam',
  isPlaceholder,
  aspect = 'card',
}: CoverArtProps) {
  const [imgError, setImgError] = useState(false);
  const showRealImage = Boolean(image && image.trim().length > 0 && !imgError);
  const cfg = THEME_CONFIG[coverTheme];

  if (showRealImage) {
    return (
      <div className={`cover-art cover-art--${aspect}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="cover-art__img"
          onError={() => setImgError(true)}
        />
        <div className="cover-art__scrim" />
        <div className="cover-art__platform-chip">{platform}</div>
      </div>
    );
  }

  return (
    <div
      className={`cover-art cover-art--${aspect} cover-art--procedural cover-art--pattern-${cfg.pattern}`}
      style={
        {
          background: cfg.gradient,
          '--art-accent': cfg.accent,
        } as React.CSSProperties
      }
    >
      <div className="cover-art__pattern" aria-hidden="true" />
      <div className="cover-art__orb" aria-hidden="true" />

      <div className="cover-art__hud-top">
        <span className="cover-art__hud-badge">{cfg.badge}</span>
        {isPlaceholder && <span className="cover-art__slot-tag">图片位 · 可替换</span>}
      </div>

      <div className="cover-art__center">
        <div className="cover-art__icon-box">
          <ThemeIcon theme={coverTheme} />
        </div>
        <div className="cover-art__year-watermark">{year}</div>
      </div>

      {coverTheme === 'vibe' && (
        <div className="cover-art__code-lines" aria-hidden="true">
          <span>&gt; prompt.compile(&quot;world&quot;)</span>
          <span>✓ level_built in 1.2s</span>
        </div>
      )}

      <div className="cover-art__platform-chip">{platform}</div>
    </div>
  );
}
