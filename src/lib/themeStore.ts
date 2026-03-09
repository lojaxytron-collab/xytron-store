import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeVariant = "red" | "white";

interface ThemeState {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "red",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "red" ? "white" : "red" }),
    }),
    { name: "xytron-theme" }
  )
);
