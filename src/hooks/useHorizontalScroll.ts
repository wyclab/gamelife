import { useCallback, useEffect, useRef, useState } from 'react';

interface HorizontalScrollOptions {
  /** Whether modal or overlay is currently open (pauses wheel/keyboard hijacking) */
  disabled?: boolean;
}

export function useHorizontalScroll({ disabled = false }: HorizontalScrollOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const targetScrollRef = useRef<number | null>(null);
  const rafScrollRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(Math.min(1, Math.max(0, el.scrollLeft / maxScroll)));
  }, []);

  // Smooth inertia wheel scroll (vertical wheel -> horizontal glide)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const animateToTarget = () => {
      const container = containerRef.current;
      if (!container || targetScrollRef.current === null) {
        rafScrollRef.current = null;
        return;
      }
      const diff = targetScrollRef.current - container.scrollLeft;
      if (Math.abs(diff) < 0.6) {
        container.scrollLeft = targetScrollRef.current;
        targetScrollRef.current = null;
        rafScrollRef.current = null;
        updateProgress();
        return;
      }
      container.scrollLeft += diff * 0.16;
      updateProgress();
      rafScrollRef.current = requestAnimationFrame(animateToTarget);
    };

    const onWheel = (event: WheelEvent) => {
      // Allow native horizontal swipe if user is already swiping predominantly horizontally
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX > absY && absX > 0) {
        targetScrollRef.current = null;
        return;
      }

      if (absY === 0) return;

      // Do not hijack scroll inside a scrollable nested element
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-allow-vertical-scroll="true"]')) {
        return;
      }

      event.preventDefault();
      const maxScroll = el.scrollWidth - el.clientWidth;
      const base = targetScrollRef.current ?? el.scrollLeft;
      const next = Math.min(maxScroll, Math.max(0, base + event.deltaY * 1.25));
      targetScrollRef.current = next;

      if (rafScrollRef.current === null) {
        rafScrollRef.current = requestAnimationFrame(animateToTarget);
      }
    };

    const onScroll = () => {
      updateProgress();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
      if (rafScrollRef.current !== null) {
        cancelAnimationFrame(rafScrollRef.current);
        rafScrollRef.current = null;
      }
    };
  }, [disabled, updateProgress]);

  // Drag-to-pan on empty canvas
  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, [data-no-drag="true"]')) return;

    const el = containerRef.current;
    if (!el) return;

    targetScrollRef.current = null;
    dragStateRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.active) return;
    const el = containerRef.current;
    if (!el) return;

    const deltaX = event.clientX - state.startX;
    if (Math.abs(deltaX) > 4) {
      state.moved = true;
    }
    el.scrollLeft = state.startScrollLeft - deltaX;
    updateProgress();
  }, [updateProgress]);

  const endDrag = useCallback(() => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    // Reset moved flag after click tick
    window.setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 50);
  }, []);

  const wasDragged = useCallback(() => dragStateRef.current.moved, []);

  const scrollToProgress = useCallback((progress: number) => {
    const el = containerRef.current;
    if (!el) return;
    targetScrollRef.current = null;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: Math.min(maxScroll, Math.max(0, maxScroll * progress)),
      behavior: 'smooth',
    });
  }, []);

  const scrollByAmount = useCallback((delta: number) => {
    const el = containerRef.current;
    if (!el) return;
    targetScrollRef.current = null;
    el.scrollBy({
      left: delta,
      behavior: 'smooth',
    });
  }, []);

  const scrollToElementById = useCallback((elementId: string) => {
    const container = containerRef.current;
    const target = document.getElementById(elementId);
    if (!container || !target) return;
    targetScrollRef.current = null;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset =
      container.scrollLeft +
      (targetRect.left - containerRect.left) -
      container.clientWidth / 2 +
      targetRect.width / 2;

    container.scrollTo({
      left: Math.max(0, offset),
      behavior: 'smooth',
    });
  }, []);

  return {
    containerRef,
    scrollProgress,
    isDragging,
    wasDragged,
    onPointerDown,
    onPointerMove,
    endDrag,
    scrollToProgress,
    scrollByAmount,
    scrollToElementById,
    updateProgress,
  };
}
