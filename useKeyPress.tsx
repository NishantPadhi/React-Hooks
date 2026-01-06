// Implement a useKeyPress hook that detects and performs an action for keyboard events.
import {useEffect} from 'react';

export default function useKeyPress(
  key: string,
  callback: (e: KeyboardEvent) => void,
  {
    event = 'keydown',
    target = window,
  }: {event?: 'keydown' | 'keyup'; target?: EventTarget} = {
    event: 'keydown',
    target: window,
  }
) {
  return useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== key) {
        return;
      }

      callback(e);
    };

    target.addEventListener(event, handler as EventListener);

    return () => {
      target.removeEventListener(event, handler as EventListener);
    };
  }, [key, callback, event, target]);
}
