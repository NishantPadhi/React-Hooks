// Implement a useInterval hook that creates an interval that invokes a callback function at a specified delay.
import {useEffect, useRef} from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}
