/**
 * Implement a usePrevious hook that returns the previous value of a state.
 */

import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

// Another approach

import { useState } from 'react';

export default function usePrevious<T>(state: T) {
  const [current, setCurrent] = useState(state);
  const [previous, setPrevious] = useState<T>();

  if (current !== state) {
    setPrevious(current);
    setCurrent(state);
  }

  return previous;
}
