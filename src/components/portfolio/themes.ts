export const themeOptions = [
  { id: 'paper', name: 'Paper', mode: 'Light', accent: '#d84b24', background: '#f5f2e9' },
  { id: 'midnight', name: 'Midnight', mode: 'Dark', accent: '#ffa56a', background: '#161820' },
  { id: 'forest', name: 'Forest', mode: 'Dark', accent: '#c9d88c', background: '#17211c' },
  { id: 'ocean', name: 'Ocean', mode: 'Dark', accent: '#78c9f5', background: '#101c2a' },
  { id: 'violet', name: 'Violet', mode: 'Dark', accent: '#c3a5f5', background: '#1b1528' },
] as const;

export type Theme = typeof themeOptions[number]['id'];
export function resolveTheme(value: string | null): Theme {
  return themeOptions.find(option => option.id === value)?.id ?? 'paper';
}
export function themeAccent(theme: Theme) {
  return themeOptions.find(option => option.id === theme)!.accent;
}
