import type { ReactNode } from 'react';
import { SyncStatus } from './SyncStatus';
import { ThemeToggle } from './ThemeToggle';
import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';

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

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: '首頁', icon: '🏠' },
  { id: 'itinerary', label: '行程', icon: '📋' },
  { id: 'map', label: '地圖', icon: '🗺️' },
  { id: 'expenses', label: '費用', icon: '💰' },
];

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
    <div className="mx-auto min-h-dvh max-w-lg pb-24">
      <header className="sticky top-0 z-50 border-b border-midnight/5 bg-cream/80 px-4 py-4 backdrop-blur-lg dark:border-cream/5 dark:bg-midnight/80">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-terracotta dark:text-coral">Spain</span> 旅行行程
            </h1>
            <SyncStatus status={status} syncMeta={syncMeta} onSync={onSync} />
          </div>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </header>

      <main className="px-4 py-6">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-midnight/5 bg-cream/90 backdrop-blur-lg dark:border-cream/5 dark:bg-midnight/90">
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-xs transition ${
                activeTab === tab.id
                  ? 'text-terracotta dark:text-coral'
                  : 'text-midnight/50 dark:text-cream/50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="h-1 w-1 rounded-full bg-terracotta dark:bg-coral" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
