import { useState, useCallback, useMemo } from 'react';
import { Layout, type Tab } from './components/Layout';
import { HomePage } from './components/HomePage';
import { HomePageEditorial } from './components/preview/HomePageEditorial';
import { HomePageLinear } from './components/preview/HomePageLinear';
import { Itinerary } from './components/Itinerary';
import { TravelMap } from './components/TravelMap';
import { ExpenseTracker } from './components/ExpenseTracker';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useTheme } from './hooks/useTheme';

type PreviewMode = 'editorial' | 'linear' | null;

function usePreviewMode() {
  const initial = useMemo((): PreviewMode => {
    const p = new URLSearchParams(window.location.search).get('preview');
    if (p === 'editorial') return 'editorial';
    if (p === 'linear') return 'linear';
    return null;
  }, []);
  const [preview, setPreview] = useState<PreviewMode>(initial);

  const enter = (mode: Exclude<PreviewMode, null>) => {
    setPreview(mode);
    window.history.replaceState({}, '', `?preview=${mode}`);
  };

  return {
    preview,
    enterEditorial: () => enter('editorial'),
    enterLinear: () => enter('linear'),
    exitPreview: () => {
      setPreview(null);
      window.history.replaceState({}, '', window.location.pathname);
    },
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { tripData, status, syncMeta, loading, performSync } = useOfflineSync();
  const { isDark, toggleTheme } = useTheme();
  const { preview, enterEditorial, enterLinear, exitPreview } = usePreviewMode();

  const scrollToFlights = useCallback(() => {
    document.getElementById('flights')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navigateFromPreview = useCallback(
    (tab: Tab) => {
      exitPreview();
      setActiveTab(tab);
    },
    [exitPreview],
  );

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

  if (preview === 'editorial') {
    const totalExpensesEur = tripData.expenses.reduce((s, e) => s + e.amountEur, 0);
    return (
      <HomePageEditorial
        flights={tripData.flights}
        itinerary={tripData.itinerary}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={navigateFromPreview}
        onExitPreview={exitPreview}
        status={status}
        syncMeta={syncMeta}
        onSync={performSync}
        totalExpensesEur={totalExpensesEur}
      />
    );
  }

  if (preview === 'linear') {
    return (
      <HomePageLinear
        flights={tripData.flights}
        itinerary={tripData.itinerary}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={navigateFromPreview}
        onExitPreview={exitPreview}
        status={status}
        syncMeta={syncMeta}
        onSync={performSync}
      />
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
          onTryLinear={enterLinear}
          onTryEditorial={enterEditorial}
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
