type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

import { useState } from 'react';

export default function useBoolean(initialValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(initialValue ?? false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, setTrue, setFalse };
}