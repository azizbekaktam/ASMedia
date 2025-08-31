"use client";
import { useState, useEffect } from "react";

export default function useLocal(key, initialValue, isJson = true) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setValue(isJson ? JSON.parse(stored) : stored);
        }
      } catch (error) {
        console.error("❌ useLocal error:", error);
        setValue(initialValue);
      }
    }
  }, [key, isJson, initialValue]);

  const saveValue = (newValue) => {
    try {
      setValue(newValue);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          key,
          isJson ? JSON.stringify(newValue) : newValue
        );
      }
    } catch (error) {
      console.error("❌ saveValue error:", error);
    }
  };

  return [value, saveValue];
}
