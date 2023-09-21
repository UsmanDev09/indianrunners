import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  let initial; 

  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key);
    initial = storedValue ? JSON.parse(storedValue) : initialValue;
  }
  const [value, setValue] = useState<T>(initial);
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
