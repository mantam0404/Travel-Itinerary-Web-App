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
  const { tripData, status, syncMeta, loading, performSync } = useOfflineSync();
  const { isDark, toggleTheme } = useTheme();

  const scrollToFlights = useCallback(() => {
    document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (loading || !tripData) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#121212] text-white/70">
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
      onTabChange={setActiveTab}
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
          onNavigate={setActiveTab}
          onScrollToFlights={scrollToFlights}
          status={status}
          syncMeta={syncMeta}
          onSync={performSync}
        />
      )}
      {activeTab === 'itinerary' && <Itinerary days={tripData.itinerary} />}
      {activeTab === 'map' && (
        <TravelMap attractions={tripData.attractions} exchangeRate={tripData.exchangeRate} />
      )}
      {activeTab === 'expenses' && (
        <ExpenseTracker expenses={tripData.expenses} exchangeRate={tripData.exchangeRate} />
      )}
    </Layout>
  );
}
