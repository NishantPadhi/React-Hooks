/**
 * Implement a createBreakpoint function takes an object
 * (where the keys are breakpoint names and values are the minimum width),
 * and returns a useBreakpoint hook that returns the current breakpoint name based on the current window width.
 */
import { useEffect, useMemo, useState } from 'react';

export default function createBreakpoint<T extends Record<string, number>>(
  breakpoints: T,
): () => keyof T {
  return function (): keyof T {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      function resize() {
        setWidth(window.innerWidth);
      }

      resize();
      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);
      };
    }, []);

    const sortedBreakpoints = useMemo(
      () => Object.entries(breakpoints).sort((a, b) => a[1] - b[1]),
      [breakpoints],
    );

    return useMemo(
      () =>
        sortedBreakpoints.reduce(
          (acc, [name, size]) => (width >= size ? name : acc),
          sortedBreakpoints[0][0],
        ),
      [sortedBreakpoints, width],
    );
  };
}
