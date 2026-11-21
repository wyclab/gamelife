import { useCallback, useEffect, useRef } from 'react';
import type { TimelineNode } from '../types/timeline';
import { HeroIntro } from './HeroIntro';
import { OutroCard } from './OutroCard';
import { TimelineNodeCard } from './TimelineNodeCard';

interface TimelineCanvasProps {
  nodes: TimelineNode[];
  totalNodes: number;
  highlightNodes: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  wasDragged: () => boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMoveScroll: (e: React.PointerEvent<HTMLDivElement>) => void;
  onEndDrag: () => void;
  onOpenNode: (node: TimelineNode) => void;
  onStartJourney: () => void;
  onBackToStart: () => void;
}

/**
 * Core horizontal timeline canvas with real-time 60fps cursor-reactive illumination:
 * - Global ambient cursor spotlight across the dot-grid canvas
 * - Luminous plasma rail that lights up directly under the pointer X position
 * - Proximity-based awakening of timeline beacons, optical fibers, and year echoes
 * - Fluent-Reveal-style luminous card border & specular surface sheen
 */
export function TimelineCanvas({
  nodes,
  totalNodes,
  highlightNodes,
  containerRef,
  isDragging,
  wasDragged,
  onPointerDown,
  onPointerMoveScroll,
  onEndDrag,
  onOpenNode,
  onStartJourney,
  onBackToStart,
}: TimelineCanvasProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafLightRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const applyLighting = useCallback(() => {
    rafLightRef.current = null;
    const stage = stageRef.current;
    const track = trackRef.current;
    const { x, y, active } = pointerRef.current;
    if (!stage || !track) return;

    const stageRect = stage.getBoundingClientRect();
    const relStageX = x - stageRect.left;
    const relStageY = y - stageRect.top;

    stage.style.setProperty('--cursor-x', `${relStageX}px`);
    stage.style.setProperty('--cursor-y', `${relStageY}px`);
    stage.style.setProperty('--cursor-active', active ? '1' : '0');

    const trackRect = track.getBoundingClientRect();
    const relTrackX = x - trackRect.left;
    track.style.setProperty('--rail-x', `${relTrackX}px`);
    track.style.setProperty('--rail-active', active ? '1' : '0');

    // Update each timeline node's proximity glow (0..1)
    const nodeElements = track.querySelectorAll<HTMLElement>('[data-timeline-node="true"]');
    const maxNodeRadius = 380;

    nodeElements.forEach((el) => {
      if (!active) {
        el.style.setProperty('--proximity', '0');
        return;
      }
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distX = Math.abs(x - centerX);
      const raw = Math.max(0, 1 - distX / maxNodeRadius);
      // Smooth quadratic easing so closest node pops dramatically
      const eased = raw * raw * (3 - 2 * raw);
      el.style.setProperty('--proximity', eased.toFixed(3));
    });

    // Update each glow card's local pointer coordinates for border & surface spotlight
    const cardElements = track.querySelectorAll<HTMLElement>('[data-glow-card="true"]');
    cardElements.forEach((card) => {
      if (!active) {
        card.style.setProperty('--card-glow-opacity', '0');
        return;
      }
      const rect = card.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;
      card.style.setProperty('--card-mx', `${localX}px`);
      card.style.setProperty('--card-my', `${localY}px`);

      // Compute distance from cursor to card bounding box so neighboring borders catch light too
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      const dist = Math.hypot(dx, dy);
      const borderGlow = Math.max(0, 1 - dist / 240);
      card.style.setProperty('--card-glow-opacity', borderGlow.toFixed(3));
    });
  }, []);

  const scheduleLighting = useCallback(() => {
    if (rafLightRef.current === null) {
      rafLightRef.current = requestAnimationFrame(applyLighting);
    }
  }, [applyLighting]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
      scheduleLighting();
      onPointerMoveScroll(event);
    },
    [onPointerMoveScroll, scheduleLighting]
  );

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
    scheduleLighting();
    onEndDrag();
  }, [onEndDrag, scheduleLighting]);

  // Also refresh lighting when scrolling horizontally while cursor stays still
  useEffect(() => {
    const scroller = containerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      if (pointerRef.current.active) {
        scheduleLighting();
      }
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      if (rafLightRef.current !== null) {
        cancelAnimationFrame(rafLightRef.current);
      }
    };
  }, [containerRef, scheduleLighting]);

  return (
    <main
      ref={stageRef}
      className={`timeline-stage ${isDragging ? 'is-dragging' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={onEndDrag}
      onPointerCancel={onEndDrag}
    >
      {/* Subtle tech grid + global ambient cursor spotlight */}
      <div className="stage-backdrop" aria-hidden="true">
        <div className="stage-backdrop__grid" />
        <div className="stage-backdrop__grid-lit" />
        <div className="stage-backdrop__nebula stage-backdrop__nebula--left" />
        <div className="stage-backdrop__nebula stage-backdrop__nebula--right" />
        <div className="stage-backdrop__spotlight" />
      </div>

      {/* Horizontal scroll viewport */}
      <div
        id="timeline-scroller"
        ref={containerRef}
        className="timeline-scroller"
        onPointerDown={onPointerDown}
      >
        <div ref={trackRef} className="timeline-track">
          {/* Continuous center energy rail that illuminates where the cursor hovers */}
          <div className="timeline-rail" aria-hidden="true">
            <div className="timeline-rail__base" />
            <div className="timeline-rail__ticks" />
            <div className="timeline-rail__glow" />
            <div className="timeline-rail__cursor-spark" />
          </div>

          <HeroIntro
            totalNodes={totalNodes}
            highlightNodes={highlightNodes}
            onStartJourney={onStartJourney}
          />

          <div className="timeline-nodes-row">
            {nodes.map((node, idx) => (
              <TimelineNodeCard
                key={node.id}
                node={node}
                index={idx}
                position={idx % 2 === 0 ? 'top' : 'bottom'}
                onOpen={onOpenNode}
                wasDragged={wasDragged}
              />
            ))}
          </div>

          <OutroCard onBackToStart={onBackToStart} />
        </div>
      </div>
    </main>
  );
}
