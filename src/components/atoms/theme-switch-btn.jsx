import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export const ThemeSwitchBtn = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="text-primary border border-primary"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};
