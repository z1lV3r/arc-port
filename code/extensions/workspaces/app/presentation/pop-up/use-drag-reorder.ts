import { useCallback, useEffect, useRef, useState } from "react";

/** Pixels the pointer must travel before a press turns into a drag. */
const DRAG_THRESHOLD = 4;
/** Distance from a scroll edge at which the row starts auto-scrolling. */
const EDGE_ZONE = 40;
/** Fastest auto-scroll, in pixels per frame, reached at the very edge. */
const MAX_SCROLL_STEP = 14;

/** An item's position along the row, measured in scroll-content space. */
type Item = { width: number; center: number };

type DragState = {
  index: number;
  pointerId: number;
  /** Scrollable ancestor, when the row overflows. */
  container: HTMLElement | null;
  /** Fixed client-space origin used to convert pointer x into content space. */
  containerLeft: number;
  /** Pointer position, in content space, when the press started. */
  startPointer: number;
  /** Furthest the container can scroll, measured before any item is transformed. */
  maxScroll: number;
  items: Item[];
  /** Distance between two neighbouring items (width + gap). */
  step: number;
  started: boolean;
};

function arrayMove<T>(items: T[], from: number, to: number): T[] {
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved!);
  return next;
}

function findScrollParent(el: HTMLElement): HTMLElement | null {
  for (let node = el.parentElement; node; node = node.parentElement) {
    if (node.scrollWidth > node.clientWidth) {
      const { overflowX } = getComputedStyle(node);
      if (overflowX === "auto" || overflowX === "scroll") return node;
    }
  }
  return null;
}

/** How far to auto-scroll this frame, based on how deep into an edge the pointer is. */
function scrollStep(container: HTMLElement, clientX: number): number {
  const rect = container.getBoundingClientRect();
  const fromLeft = clientX - rect.left;
  const fromRight = rect.right - clientX;

  if (fromLeft < EDGE_ZONE) {
    return -MAX_SCROLL_STEP * Math.min(1, (EDGE_ZONE - Math.max(fromLeft, 0)) / EDGE_ZONE);
  }
  if (fromRight < EDGE_ZONE) {
    return MAX_SCROLL_STEP * Math.min(1, (EDGE_ZONE - Math.max(fromRight, 0)) / EDGE_ZONE);
  }
  return 0;
}

/**
 * Horizontal drag-to-reorder driven by pointer events.
 *
 * The DOM order never changes while dragging: the pressed item follows the
 * pointer and the items it passes over slide out of the way, so the positions
 * measured on pointer down stay valid for the whole gesture. The new order is
 * committed on pointer up.
 *
 * Positions are held in scroll-content space rather than client space, so they
 * survive the row auto-scrolling underneath the pointer when the list is longer
 * than the visible area.
 */
export function useDragReorder({
  ids,
  onReorder,
}: {
  ids: string[];
  onReorder: (ids: string[]) => void;
}) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const dragRef = useRef<DragState | null>(null);
  const targetIndexRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const clientXRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [step, setStep] = useState(0);

  const stopFrames = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  useEffect(() => stopFrames, [stopFrames]);

  const reset = useCallback(() => {
    stopFrames();
    dragRef.current = null;
    targetIndexRef.current = null;
    setActiveIndex(null);
    setTargetIndex(null);
    setOffsetX(0);
  }, [stopFrames]);

  const commit = useCallback(
    (from: number, to: number) => {
      if (from === to) return;
      onReorder(arrayMove(ids, from, to));
    },
    [ids, onReorder],
  );

  const contentX = (drag: DragState, clientX: number) =>
    clientX - drag.containerLeft + (drag.container?.scrollLeft ?? 0);

  /** Recompute the dragged item's offset and where it would land. */
  const applyPointer = useCallback(() => {
    const drag = dragRef.current;
    if (!drag?.started) return;

    const active = drag.items[drag.index]!;
    const first = drag.items[0]!;
    const last = drag.items[drag.items.length - 1]!;
    const rawDx = contentX(drag, clientXRef.current) - drag.startPointer;

    // Where the dragged item lands = how many of the other items it has passed.
    // Hit-test against the unclamped position, so pushing past either end still
    // reaches the first and last slots.
    const center = active.center + rawDx;
    let next = 0;
    drag.items.forEach((item, i) => {
      if (i !== drag.index && item.center < center) next++;
    });

    // Clamp only what is drawn: a transform reaching past the last slot would
    // enlarge the container's scrollable area, which auto-scroll would then
    // chase into empty space.
    const dx = Math.min(
      Math.max(rawDx, first.center - active.center),
      last.center - active.center,
    );

    setOffsetX(dx);
    targetIndexRef.current = next;
    setTargetIndex(next);
  }, []);

  /** Auto-scroll while the pointer sits near an edge, following it as it moves. */
  const runFrames = useCallback(() => {
    const tick = () => {
      const drag = dragRef.current;
      if (!drag?.started) {
        frameRef.current = null;
        return;
      }
      if (drag.container) {
        const delta = scrollStep(drag.container, clientXRef.current);
        if (delta !== 0) {
          drag.container.scrollLeft = Math.min(
            drag.maxScroll,
            Math.max(0, drag.container.scrollLeft + delta),
          );
        }
      }
      applyPointer();
      frameRef.current = requestAnimationFrame(tick);
    };
    stopFrames();
    frameRef.current = requestAnimationFrame(tick);
  }, [applyPointer, stopFrames]);

  const onPointerDown = useCallback(
    (index: number) => (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0 || dragRef.current) return;

      const elements = itemRefs.current.slice(0, ids.length);
      if (elements.length !== ids.length || elements.some((el) => el === null)) return;

      const container = findScrollParent(event.currentTarget);
      const containerLeft = container ? container.getBoundingClientRect().left : 0;
      const scrollLeft = container?.scrollLeft ?? 0;

      const items = elements.map((el) => {
        const rect = el!.getBoundingClientRect();
        const left = rect.left - containerLeft + scrollLeft;
        return { width: rect.width, center: left + rect.width / 2 };
      });

      didDragRef.current = false;
      clientXRef.current = event.clientX;
      dragRef.current = {
        index,
        pointerId: event.pointerId,
        container,
        containerLeft,
        startPointer: event.clientX - containerLeft + scrollLeft,
        maxScroll: container ? container.scrollWidth - container.clientWidth : 0,
        items,
        step: items.length > 1 ? items[1]!.center - items[0]!.center : items[0]!.width,
        started: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [ids.length],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      clientXRef.current = event.clientX;

      if (!drag.started) {
        if (Math.abs(contentX(drag, event.clientX) - drag.startPointer) < DRAG_THRESHOLD) {
          return;
        }
        drag.started = true;
        didDragRef.current = true;
        setStep(drag.step);
        setActiveIndex(drag.index);
        runFrames();
      }

      applyPointer();
    },
    [applyPointer, runFrames],
  );

  const endDrag = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      if (drag.started && targetIndexRef.current !== null) {
        commit(drag.index, targetIndexRef.current);
      }
      reset();
    },
    [commit, reset],
  );

  const onKeyDown = useCallback(
    (index: number) => (event: React.KeyboardEvent<HTMLElement>) => {
      if (!event.altKey) return;
      const to =
        event.key === "ArrowLeft"
          ? index - 1
          : event.key === "ArrowRight"
            ? index + 1
            : null;
      if (to === null || to < 0 || to >= ids.length) return;

      event.preventDefault();
      commit(index, to);
      // The item keeps focus but moves, so follow it to its new position.
      requestAnimationFrame(() => itemRefs.current[to]?.focus());
    },
    [commit, ids.length],
  );

  const transformOf = (index: number) => {
    if (activeIndex === null) return undefined;
    if (index === activeIndex) return `translateX(${offsetX}px)`;
    if (targetIndex === null) return undefined;

    const movingRight = targetIndex > activeIndex;
    const shifted = movingRight
      ? index > activeIndex && index <= targetIndex
      : index >= targetIndex && index < activeIndex;

    return shifted ? `translateX(${movingRight ? -step : step}px)` : undefined;
  };

  const getItemProps = (index: number) => {
    const isActive = index === activeIndex;
    return {
      ref: (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
      },
      onPointerDown: onPointerDown(index),
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onKeyDown: onKeyDown(index),
      "data-dragging": isActive || undefined,
      style: {
        touchAction: "none" as const,
        cursor: isActive ? "grabbing" : "grab",
        transform: transformOf(index),
        transition: isActive ? "none" : "transform 150ms ease",
        zIndex: isActive ? 10 : undefined,
        position: "relative" as const,
      },
    };
  };

  return {
    getItemProps,
    isDragging: activeIndex !== null,
    /** True when the last pointer gesture was a drag, so click can be ignored. */
    wasDragged: () => didDragRef.current,
  };
}
