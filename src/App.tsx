import { useState, useCallback, useEffect } from 'react';
import { Layout, type Tab } from './components/Layout';
import { HomePage } from './components/HomePage';
import type { NavigateOptions } from './components/HomePage';
import { Itinerary } from './components/Itinerary';
import { TravelMap } from './components/TravelMap';
import { SplashScreen } from './components/SplashScreen';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useTheme } from './hooks/useTheme';
import type { MapFocusRequest } from './types/navigation';

const SPLASH_KEY = 'splash-seen';

function allDayDates(dates: { date: string }[]): Set<string> {
  return new Set(dates.map((d) => d.date));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [expandedDayDates, setExpandedDayDates] = useState<Set<string>>(() => new Set());
  const [scrollToDayDate, setScrollToDayDate] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<MapFocusRequest | null>(null);
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem(SPLASH_KEY));
  const { tripData, status, syncMeta, loading, performSync } = useOfflineSync();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (!tripData?.itinerary.length) return;
    setExpandedDayDates(allDayDates(tripData.itinerary));
  }, [tripData]);

  useEffect(() => {
    if (!showSplash || loading || !tripData) return;
    sessionStorage.setItem(SPLASH_KEY, '1');
  }, [showSplash, loading, tripData]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleNavigate = useCallback((tab: Tab, options?: NavigateOptions) => {
    if (tab === 'itinerary' && options?.dayDate) {
      setExpandedDayDates((prev) => new Set([...prev, options.dayDate!]));
      setScrollToDayDate(options.dayDate);
    }
    if (options?.attractionId) {
      setMapFocus({ attractionId: options.attractionId, token: Date.now() });
    }
    setActiveTab(tab);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const handleNavigateToAttraction = useCallback((attractionId: string) => {
    setMapFocus({ attractionId, token: Date.now() });
    setActiveTab('map');
  }, []);

  const handleScrollToDayComplete = useCallback(() => {
    setScrollToDayDate(null);
  }, []);

  if (loading || !tripData) {
    return (
      <>
        {showSplash && <SplashScreen isDark={isDark} ready={false} onComplete={handleSplashComplete} />}
        {!showSplash && (
          <div className="flex min-h-dvh items-center justify-center bg-[#08090a] text-white/70">
            <div className="text-center">
              <p className="text-4xl animate-pulse">✈️</p>
              <p className="mt-4 text-sm">載入行程資料中…</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {showSplash && (
        <SplashScreen isDark={isDark} ready onComplete={handleSplashComplete} />
      )}
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
          attractions={tripData.attractions}
          isDark={isDark}
          onNavigate={handleNavigate}
        />
      )}
      {activeTab === 'itinerary' && (
        <Itinerary
          days={tripData.itinerary}
          attractions={tripData.attractions}
          isDark={isDark}
          expandedDayDates={expandedDayDates}
          scrollToDayDate={scrollToDayDate}
          onExpandedDayDatesChange={setExpandedDayDates}
          onScrollToDayComplete={handleScrollToDayComplete}
          onNavigateToAttraction={handleNavigateToAttraction}
        />
      )}
      {activeTab === 'map' && (
        <TravelMap
          attractions={tripData.attractions}
          exchangeRate={tripData.exchangeRate}
          mapCenter={tripData.mapCenter}
          isDark={isDark}
          focusRequest={mapFocus}
        />
      )}
    </Layout>
    </>
  );
}
