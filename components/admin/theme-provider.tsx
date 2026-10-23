"use client";

import { useEffect } from "react";
import { applyThemeToDOM, getStoredTheme, PREFERENCES_EVENT } from "@/lib/admin/admin-preferences";

export function AdminThemeProvider() {
  useEffect(() => {
    const theme = getStoredTheme();
    applyThemeToDOM(theme);

    const handleUpdate = () => {
      applyThemeToDOM(getStoredTheme());
    };

    window.addEventListener(PREFERENCES_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(PREFERENCES_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return null;
}
