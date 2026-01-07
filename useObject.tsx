/**
 *
    Implement a useObject hook that manages a state of JavaScript Object,
    also known as POJO (Plain Old JavaScript Object), which is a key-value pair storage initialized with {}.

    When the set state function is called with an object, it is merged with the existing object.

    It is more convenient to use useObject over plain useState because in the latter case,
    you would always have to create a new object, mutate it, then set state to use the new object
    (or create a new object via object spread), which can be quite cumbersome.
 */

import { useCallback, useState } from 'react';

function isPlainObject(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

type UseObjectUpdater<T extends Record<string | number | symbol, any>> = (
  partialOrUpdaterFunction: Partial<T> | ((prev: T) => Partial<T>),
) => void;

export default function useObject<
  T extends Record<string | number | symbol, any>,
>(initialValue: T): [T, UseObjectUpdater<T>] {
  const [state, setState] = useState(initialValue);

  const merge: UseObjectUpdater<T> = useCallback((partialOrUpdaterFunction) => {
    if (partialOrUpdaterFunction instanceof Function)
      return setState((previousState) => {
        const newState = partialOrUpdaterFunction(previousState);
        if (!isPlainObject(newState)) {
          throw new Error('Invalid new state');
        }

        return { ...previousState, ...newState };
      });

    if (!isPlainObject(partialOrUpdaterFunction)) {
      throw new Error('Invalid new state');
    }

    setState((previousState) => ({
      ...previousState,
      ...partialOrUpdaterFunction,
    }));
  }, []);

  return [state, merge];
}
