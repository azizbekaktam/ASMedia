"use client";
import { useState, useEffect } from "react";

export default function useLocal(key, initialValue, isJson = true) {
  const [value, setValue] = useState(initialValue);

  // localStorage-dan malumot olish
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(isJson ? JSON.parse(stored) : stored);
      }
    }
  }, [key, isJson]);

  // localStorage-ga malumot saqlash
  const saveValue = (newValue) => {
    setValue(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, isJson ? JSON.stringify(newValue) : newValue);
    }
  };

  return [value, saveValue];
}
