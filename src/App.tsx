import { useState } from 'react';
import { Layout, type Tab } from './components/Layout';
import { FlightDashboard } from './components/FlightDashboard';
import { Itinerary } from './components/Itinerary';
import { TravelMap } from './components/TravelMap';
import { ExpenseTracker } from './components/ExpenseTracker';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useTheme } from './hooks/useTheme';
import { formatDateZh } from './data/tripData';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { tripData, status, syncMeta, loading, performSync } = useOfflineSync();
  const { isDark, toggleTheme } = useTheme();

  if (loading || !tripData) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-center">
          <p className="text-4xl animate-pulse">✈️</p>
          <p className="mt-4 text-midnight/60 dark:text-cream/60">載入行程資料中…</p>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayItinerary = tripData.itinerary.find((d) => d.date === today);

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
        <div className="space-y-8">
          <div className="glass-card pastel-gradient p-6 text-center">
            <p className="text-sm text-midnight/60 dark:text-cream/60">歡迎來到</p>
            <h2 className="mt-1 text-3xl font-bold">
              <span className="text-terracotta dark:text-coral">Spain</span> 🇪🇸
            </h2>
            <p className="mt-2 text-sm">
              {formatDateZh('2026-10-15')} – {formatDateZh('2026-10-24')}
            </p>
            {todayItinerary ? (
              <div className="mt-4 rounded-xl bg-white/50 p-3 dark:bg-dusk/50">
                <p className="text-xs font-medium text-sage">今日行程 · {todayItinerary.city}</p>
                <p className="mt-1 font-semibold">{todayItinerary.activities[0]?.title}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-midnight/50 dark:text-cream/50">
                旅程尚未開始，祝您旅途愉快！
              </p>
            )}
          </div>
          <FlightDashboard flights={tripData.flights} />
        </div>
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
