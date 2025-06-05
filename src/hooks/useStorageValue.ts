import { useState } from "react";
import { StorageKey } from "src/config/StorageKey";
import { isObject } from "src/utils/object";

function useStorageValue<T>(key: StorageKey, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue === null) return defaultValue;

    return isObject(defaultValue) ? JSON.parse(storageValue) : storageValue;
  });

  const setter = (value: T | ((oldValue: T) => T)) => {
    setState((old) => {
      const newValue = value instanceof Function ? value(old) : value;

      localStorage.setItem(
        key,
        isObject(defaultValue) ? JSON.stringify(newValue) : String(newValue)
      );

      return newValue;
    });
  };

  return [state, setter] as const;
}

export default useStorageValue;
