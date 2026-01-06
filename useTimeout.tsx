/**
 * 
  Implement a useTimeout hook that invokes a callback function after a specified delay.

  Note that the hooks can be called again with different values since the initial call:

  Different callback: The pending timer should invoke the latest callback. 
  If the timer has already expired, the callback is not executed and no new timer will be set
  Different delay: The previous timeout should be cancelled if the timer hasn't expired, 
  a new timer is set with the new delay value
  The primary benefit of useTimeout is so that you don't have to manually clear call clearTimeout() 
  if the component unmounts before the timer expires.
 */

import { useRef, useEffect } from 'react';

export default function useTimeout(callback: () => void, delay: number | null) {
  const latestCallback = useRef(callback);
  latestCallback.current = callback;

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      latestCallback.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);
}
