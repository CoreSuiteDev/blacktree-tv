"use client";

import { useTheme } from "next-themes";

import { useThemeStore } from "@/store/public/use-theme-store";
import { CustomSwitch } from "./custom-switch";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme, setTheme: setStoreTheme } = useThemeStore();

  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setStoreTheme(newTheme); 
    setTheme(newTheme); 
  };

  return (
    <div className="flex items-center space-x-2  p-2 rounded-lg">
      <CustomSwitch
        id="theme-switch"
        checked={theme === "dark"}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
