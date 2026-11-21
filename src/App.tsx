import { useCallback, useEffect, useMemo, useState } from 'react';
import { DetailModal } from './components/DetailModal';
import { MiniMapBar } from './components/MiniMapBar';
import { Navbar } from './components/Navbar';
import { TimelineCanvas } from './components/TimelineCanvas';
import { TIMELINE_NODES } from './data/timeline';
import { useHorizontalScroll } from './hooks/useHorizontalScroll';
import { useTheme } from './hooks/useTheme';
import type { TimelineCategory, TimelineNode } from './types/timeline';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<TimelineCategory | 'all'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const sortedNodes = useMemo(
    () => [...TIMELINE_NODES].sort((a, b) => a.year - b.year),
    []
  );

  const filteredNodes = useMemo(() => {
    if (activeCategory === 'all') return sortedNodes;
    return sortedNodes.filter((n) => n.category === activeCategory);
  }, [activeCategory, sortedNodes]);

  const highlightCount = useMemo(
    () => sortedNodes.filter((n) => n.highlight).length,
    [sortedNodes]
  );

  const selectedIndex = useMemo(
    () => filteredNodes.findIndex((n) => n.id === selectedNodeId),
    [filteredNodes, selectedNodeId]
  );

  const selectedNode: TimelineNode | null =
    selectedIndex >= 0 ? filteredNodes[selectedIndex] : null;

  const {
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
  } = useHorizontalScroll({ disabled: Boolean(selectedNode) });

  // Reset scroll gracefully when filter changes
  const handleSelectCategory = useCallback(
    (category: TimelineCategory | 'all') => {
      setActiveCategory(category);
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        }
        updateProgress();
      });
    },
    [containerRef, updateProgress]
  );

  // Keyboard arrow navigation when modal is closed
  useEffect(() => {
    if (selectedNode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByAmount(420);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByAmount(-420);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedNode, scrollByAmount]);

  const handleStartJourney = useCallback(() => {
    const first = filteredNodes[0];
    if (first) {
      scrollToElementById(`node-${first.id}`);
    } else {
      scrollByAmount(520);
    }
  }, [filteredNodes, scrollByAmount, scrollToElementById]);

  const handleBackToStart = useCallback(() => {
    scrollToProgress(0);
  }, [scrollToProgress]);

  const handleJumpToNode = useCallback(
    (nodeId: string) => {
      scrollToElementById(`node-${nodeId}`);
    },
    [scrollToElementById]
  );

  const handleScrollStep = useCallback(
    (direction: 'prev' | 'next') => {
      scrollByAmount(direction === 'next' ? 460 : -460);
    },
    [scrollByAmount]
  );

  const handleOpenNode = useCallback((node: TimelineNode) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleModalPrev = useCallback(() => {
    if (selectedIndex > 0) {
      const target = filteredNodes[selectedIndex - 1];
      setSelectedNodeId(target.id);
      scrollToElementById(`node-${target.id}`);
    }
  }, [filteredNodes, scrollToElementById, selectedIndex]);

  const handleModalNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < filteredNodes.length - 1) {
      const target = filteredNodes[selectedIndex + 1];
      setSelectedNodeId(target.id);
      scrollToElementById(`node-${target.id}`);
    }
  }, [filteredNodes, scrollToElementById, selectedIndex]);

  return (
    <div className="app-shell">
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        theme={theme}
        onToggleTheme={toggleTheme}
        totalCount={sortedNodes.length}
        filteredCount={filteredNodes.length}
      />

      <TimelineCanvas
        nodes={filteredNodes}
        totalNodes={sortedNodes.length}
        highlightNodes={highlightCount}
        containerRef={containerRef}
        isDragging={isDragging}
        wasDragged={wasDragged}
        onPointerDown={onPointerDown}
        onPointerMoveScroll={onPointerMove}
        onEndDrag={endDrag}
        onOpenNode={handleOpenNode}
        onStartJourney={handleStartJourney}
        onBackToStart={handleBackToStart}
      />

      <MiniMapBar
        nodes={filteredNodes}
        scrollProgress={scrollProgress}
        onJumpToNode={handleJumpToNode}
        onScrollStep={handleScrollStep}
        onScrubProgress={scrollToProgress}
      />

      <DetailModal
        node={selectedNode}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex >= 0 && selectedIndex < filteredNodes.length - 1}
        onClose={() => setSelectedNodeId(null)}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
      />
    </div>
  );
}

export default App;
