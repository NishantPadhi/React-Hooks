/**
 * Implement a useStateWithReset hook that's similar to useState but with an 
 * additional reset function that resets the state to its initial value.
 * 
 * Arguments
 * initialValue: the initial value of the state. 
 * This argument should be the same as the first argument of the useState hook
 * Returns
 * The useStateWithReset hook should have the same return values as the useState hook, 
 * plus an additional function that resets the state to initialValue
*/

/**
 *
export default function Component() {
  const [value, setValue, resetValue] = useStateWithReset(10);

  return (
    <div>
      <div>Value: {value}</div>
      <input onChange={(e) => setValue(e.target.value)} />
      <button onClick={resetValue}>reset</button>
    </div>
  );
}
*/

import { useCallback, useMemo, useState } from 'react';

export default function useStateWithReset(initialStateOrInitializer) {
  const initialState = useMemo(() => {
    if (
      typeof initialStateOrInitializer === 'function' &&
      initialStateOrInitializer.length === 0
    )
      return initialStateOrInitializer();

    return initialStateOrInitializer;
  }, []);

  const [state, setState] = useState(initialState);

  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState, reset];
}
