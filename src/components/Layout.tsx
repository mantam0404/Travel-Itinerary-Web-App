import type { ReactNode } from 'react';
import { ThemeToggleButton } from './icons';
import '../styles/linear.css';

export type Tab = 'home' | 'itinerary' | 'map';

interface LayoutProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: '首頁' },
  { id: 'itinerary', label: '行程' },
  { id: 'map', label: '地圖' },
];

const pageTitles: Record<Exclude<Tab, 'home'>, string> = {
  itinerary: '每日行程',
  map: '景點地圖',
};

export function Layout({
  children,
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
}: LayoutProps) {
  return (
    <div
      className={`ln-app relative mx-auto min-h-dvh max-w-lg overflow-x-hidden pb-32 ${isDark ? '' : 'light'}`}
    >
      <div className="ln-glow pointer-events-none absolute inset-x-0 top-0 h-48" aria-hidden />

      {activeTab !== 'home' && (
        <header className="ln-fade sticky top-0 z-40 border-b border-[var(--ln-border)] bg-[var(--ln-nav-bg)] px-4 py-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold tracking-[-0.02em]">{pageTitles[activeTab]}</h1>
            </div>
            <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </header>
      )}

      <main>{children}</main>

      <nav
        className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--ln-border)] backdrop-blur-xl"
        style={{ background: 'var(--ln-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-lg justify-around px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`ln-nav-tab ln-pressable min-w-[3.5rem] px-2 py-1 ${activeTab === tab.id ? 'ln-nav-tab-active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
