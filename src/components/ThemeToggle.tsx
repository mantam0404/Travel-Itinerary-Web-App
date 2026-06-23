interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-midnight/10 bg-white/50 text-lg transition hover:scale-105 dark:border-cream/10 dark:bg-dusk/50"
      aria-label={isDark ? '切換至淺色模式' : '切換至深色模式'}
      title={isDark ? '淺色模式' : '深色模式'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
