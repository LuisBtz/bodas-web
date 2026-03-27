import { useState, useEffect, useMemo } from 'react';

/**
 * Returns a responsive column count based on breakpoints.
 * Always starts with the largest breakpoint value to avoid hydration mismatch,
 * then corrects on the client after mount.
 */
export function useColumnCount(
  breakpoints: { minWidth: number; cols: number }[],
): number {
  const sorted = useMemo(
    () => [...breakpoints].sort((a, b) => b.minWidth - a.minWidth),
    [breakpoints],
  );
  const serverDefault = sorted[0]?.cols ?? 1;

  const [cols, setCols] = useState(serverDefault);

  useEffect(() => {
    const queries = sorted.map((bp) => ({
      mql: window.matchMedia(`(min-width: ${bp.minWidth}px)`),
      cols: bp.cols,
    }));

    const fallback = sorted[sorted.length - 1]?.cols ?? 1;

    const update = () => {
      for (const q of queries) {
        if (q.mql.matches) {
          setCols(q.cols);
          return;
        }
      }
      setCols(fallback);
    };

    update();
    const handler = () => update();
    for (const q of queries) q.mql.addEventListener('change', handler);
    return () => {
      for (const q of queries) q.mql.removeEventListener('change', handler);
    };
  }, [sorted]);

  return cols;
}

/** Distribute items round-robin into columns for reading-order masonry. */
export function distributeColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    columns[i % cols].push(item);
  });
  return columns;
}
