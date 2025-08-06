import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Check } from "lucide-react";
import { useColorTheme, type ColorTheme } from "@/contexts/ThemeContext";

const colorThemes: { value: ColorTheme; label: string; color: string }[] = [
  { value: 'blue', label: 'Neural Blue', color: 'hsl(217, 91%, 60%)' },
  { value: 'purple', label: 'Neural Purple', color: 'hsl(267, 84%, 65%)' },
  { value: 'green', label: 'Tech Green', color: 'hsl(142, 76%, 55%)' },
  { value: 'cyan', label: 'Neural Cyan', color: 'hsl(191, 91%, 55%)' },
  { value: 'orange', label: 'Neural Orange', color: 'hsl(25, 95%, 65%)' },
];

export function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="hover-scale glass">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 glass">
        {colorThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-border/20"
                style={{ backgroundColor: theme.color }}
              />
              <span>{theme.label}</span>
            </div>
            {colorTheme === theme.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}