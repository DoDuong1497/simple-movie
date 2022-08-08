import React, { useEffect, useState } from "react";

export default function useDebounce(initialValue = "", delay = 1000) {
  const [debounceValues, setDebounceValues] = useState(initialValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValues(initialValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);

  return debounceValues;
}
