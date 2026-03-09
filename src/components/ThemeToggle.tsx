import { useTheme } from "@/lib/themeStore";
import { Palette } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-secondary transition-colors"
      aria-label="Trocar tema"
      title={theme === "red" ? "Tema: Preto & Vermelho" : "Tema: Preto & Branco"}
    >
      <Palette className="w-5 h-5" style={{ color: theme === "red" ? "hsl(0, 84%, 60%)" : "hsl(0, 0%, 100%)" }} />
    </button>
  );
};

export default ThemeToggle;
