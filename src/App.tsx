import { useState, useCallback } from 'react';
import { Layout, type Tab } from './components/Layout';
import { HomePage } from './components/HomePage';
import { Itinerary } from './components/Itinerary';
import { TravelMap } from './components/TravelMap';
import { ExpenseTracker } from './components/ExpenseTracker';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [expandedDayDate, setExpandedDayDate] = useState<string | null>(null);
  const { tripData, status, syncMeta, loading, performSync } = useOfflineSync();
  const { isDark, toggleTheme } = useTheme();

  const handleNavigate = useCallback((tab: Tab, options?: { dayDate?: string }) => {
    if (tab === 'itinerary' && options?.dayDate) {
      setExpandedDayDate(options.dayDate);
    } else if (tab !== 'itinerary') {
      setExpandedDayDate(null);
    }
    setActiveTab(tab);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    if (tab !== 'itinerary') {
      setExpandedDayDate(null);
    }
    setActiveTab(tab);
  }, []);

  if (loading || !tripData) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#08090a] text-white/70">
        <div className="text-center">
          <p className="text-4xl animate-pulse">✈️</p>
          <p className="mt-4 text-sm">載入行程資料中…</p>
        </div>
      </div>
    );
  }

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      status={status}
      syncMeta={syncMeta}
      onSync={performSync}
      isDark={isDark}
      onToggleTheme={toggleTheme}
    >
      {activeTab === 'home' && (
        <HomePage
          flights={tripData.flights}
          itinerary={tripData.itinerary}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onNavigate={handleNavigate}
          status={status}
          syncMeta={syncMeta}
          onSync={performSync}
        />
      )}
      {activeTab === 'itinerary' && (
        <Itinerary
          days={tripData.itinerary}
          isDark={isDark}
          expandedDayDate={expandedDayDate}
          onExpandedDayChange={setExpandedDayDate}
        />
      )}
      {activeTab === 'map' && (
        <TravelMap
          attractions={tripData.attractions}
          exchangeRate={tripData.exchangeRate}
          isDark={isDark}
        />
      )}
      {activeTab === 'expenses' && (
        <ExpenseTracker expenses={tripData.expenses} exchangeRate={tripData.exchangeRate} />
      )}
    </Layout>
  );
}
