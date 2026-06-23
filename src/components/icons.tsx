export function IconPlane({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconMap({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconCalendar({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 8H5v10h14V10z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconWallet({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 7H5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-2 6h-2v-2h2v2zM5 11h11v6H5v-6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconChevron({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrain({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 15.5V7a4 4 0 014-4h8a4 4 0 014 4v8.5M4 11h16M8 19h2M14 19h2M6 15h12v4H6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconHome({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ThemeToggleButton({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
  variant?: 'linear';
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="ln-theme-btn"
      aria-label={isDark ? '切換至淺色模式' : '切換至深色模式'}
      title={isDark ? '淺色模式' : '深色模式'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
