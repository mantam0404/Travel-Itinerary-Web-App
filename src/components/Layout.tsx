import type { ReactNode } from 'react';
import { SyncStatus } from './SyncStatus';
import { ThemeToggleButton } from './icons';
import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';
import '../styles/open-design.css';

export type Tab = 'home' | 'itinerary' | 'map' | 'expenses';

interface LayoutProps {
  children: ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: '首頁' },
  { id: 'itinerary', label: '行程' },
  { id: 'map', label: '地圖' },
  { id: 'expenses', label: '費用' },
];

const pageTitles: Record<Exclude<Tab, 'home'>, string> = {
  itinerary: '每日行程',
  map: '景點地圖',
  expenses: '費用與預算',
};

export function Layout({
  children,
  activeTab,
  onTabChange,
  status,
  syncMeta,
  onSync,
  isDark,
  onToggleTheme,
}: LayoutProps) {
  return (
    <div
      className={`od-app relative mx-auto min-h-dvh max-w-lg overflow-x-hidden pb-36 ${isDark ? 'dark' : ''}`}
    >
      <div className="od-grain" aria-hidden />

      {activeTab !== 'home' && (
        <header className="sticky top-0 z-40 border-b border-[var(--od-hairline)] bg-[var(--od-nav-bg)] px-4 py-4 backdrop-blur-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="od-section-title">{pageTitles[activeTab]}</h1>
              <SyncStatus status={status} syncMeta={syncMeta} onSync={onSync} />
            </div>
            <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </header>
      )}

      <main>{children}</main>

      <nav
        className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--od-hairline)] backdrop-blur-lg"
        style={{ background: 'var(--od-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex min-w-[3.5rem] flex-col items-center gap-1 px-3 py-1 text-[11px] font-semibold transition-colors ${
                activeTab === tab.id ? 'text-[var(--od-rausch)]' : 'text-[var(--od-ink-subtle)]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="h-0.5 w-6 rounded-full bg-[var(--od-rausch)]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
