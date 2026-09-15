import { ChevronDown, Palette } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { resolveTheme, themeOptions, type Theme } from './themes';

export default function ThemePicker({ theme, onChange }: { theme: Theme; onChange: (theme: Theme) => void }) {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="theme-menu-trigger" aria-label="Choose theme"><Palette size={18}/><span>Theme</span><ChevronDown size={14}/></button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="theme-menu" align="end" sideOffset={12} collisionPadding={16}>
      <DropdownMenuLabel className="theme-menu-label">Choose your atmosphere</DropdownMenuLabel>
      <DropdownMenuRadioGroup value={theme} onValueChange={value => onChange(resolveTheme(value))}>
        {themeOptions.map(option => <DropdownMenuRadioItem className="theme-menu-option" key={option.id} value={option.id}>
          <span className="theme-preview" style={{background: option.background}} aria-hidden="true"><span style={{background: option.accent}}/></span>
          <span className="theme-option-name">{option.name}</span><span className="theme-option-mode">{option.mode}</span>
        </DropdownMenuRadioItem>)}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
}
