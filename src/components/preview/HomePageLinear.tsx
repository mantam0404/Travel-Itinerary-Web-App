import type { FlightInfo, ItineraryDay } from '../../data/tripData';
import { formatDateZh } from '../../data/tripData';
import type { Tab } from '../Layout';
import { ThemeToggleButton } from '../icons';
import { SyncStatus } from '../SyncStatus';
import type { ConnectionStatus } from '../../hooks/useOfflineSync';
import type { SyncMeta } from '../../services/storage';
import { getItineraryDayImage, HERO_IMAGE } from '../../utils/itineraryImages';
import '../../styles/linear.css';

interface HomePageLinearProps {
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: Tab) => void;
  onExitPreview: () => void;
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
}

export function HomePageLinear({
  flights,
  itinerary,
  isDark,
  onToggleTheme,
  onNavigate,
  onExitPreview,
  status,
  syncMeta,
  onSync,
}: HomePageLinearProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const returnFlight = flights.find((f) => f.type === 'return');

  return (
    <div className={`ln-app relative min-h-dvh pb-32 ${isDark ? '' : 'light'}`}>
      <div className="ln-glow pointer-events-none absolute inset-x-0 top-0 h-64" aria-hidden />

      {/* Full-bleed hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/10]">
          <img
            src={HERO_IMAGE}
            alt="Barcelona panorama at dusk"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,9,10,0.35) 0%, rgba(8,9,10,0.05) 35%, rgba(8,9,10,0.92) 100%)',
            }}
          />

          {/* Top bar */}
          <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between gap-3 px-4 pt-4 pb-2 sm:px-6">
            <span className="ln-badge">Linear 風格預覽</span>
            <div className="flex items-center gap-2">
              <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} variant="linear" />
              <button
                type="button"
                onClick={onExitPreview}
                className="rounded-lg border border-[var(--ln-border-strong)] bg-[rgba(8,9,10,0.45)] px-3 py-1.5 text-xs font-medium text-[var(--ln-ink)] backdrop-blur-md"
              >
                返回現版
              </button>
            </div>
          </div>

          {/* Hero copy */}
          <div className="absolute right-0 bottom-0 left-0 z-10 px-4 pb-8 sm:px-6">
            <p className="ln-label text-[var(--ln-ink-secondary)]">Spain · Oct 15–24, 2026</p>
            <h1 className="mt-2 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--ln-ink)] sm:text-[2rem]">
              西班牙旅行行程
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
              Barcelona & Madrid · 離線行程、地圖與費用追蹤
            </p>
            <div className="mt-3">
              <SyncStatus status={status} syncMeta={syncMeta} onSync={onSync} variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats row — Linear issue-meta style */}
      <section className="ln-fade border-b border-[var(--ln-border)] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <span className="ln-badge-neutral ln-badge">10 天行程</span>
          <span className="ln-badge-neutral ln-badge">2 城市</span>
          <span className="ln-badge">CX321 / CX318</span>
          <span className="ln-badge-neutral ln-badge">離線優先</span>
        </div>
      </section>

      {/* Flight panel */}
      {departure && (
        <section className="ln-fade ln-fade-d1 px-4 py-6 sm:px-6" id="flights">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="ln-label">航班資訊／儀表板</p>
            <span className="ln-badge">{departure.status}</span>
          </div>
          <div className="ln-panel p-4">
            <p className="text-sm font-medium text-[var(--ln-ink)]">
              Cathay Pacific {departure.flightNumber}
            </p>
            <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">
              {formatDateZh(departure.date)} · {departure.route}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="ln-tabular text-2xl font-semibold">{departure.departureTime}</p>
                <p className="text-xs text-[var(--ln-ink-tertiary)]">HKG</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] text-[var(--ln-ink-tertiary)]">{departure.duration}</p>
                <div className="mx-auto mt-1.5 h-px w-full max-w-[80px] bg-[var(--ln-border-strong)]" />
              </div>
              <div className="text-right">
                <p className="ln-tabular text-2xl font-semibold">{departure.arrivalTime}</p>
                <p className="text-xs text-[var(--ln-ink-tertiary)]">BCN</p>
              </div>
            </div>
            {returnFlight && (
              <>
                <hr className="ln-divider my-4" />
                <p className="text-xs text-[var(--ln-ink-tertiary)]">回程</p>
                <p className="mt-1 text-sm font-medium">
                  {returnFlight.flightNumber} · {formatDateZh(returnFlight.date)}
                </p>
                <p className="ln-tabular mt-0.5 text-xs text-[var(--ln-ink-secondary)]">
                  {returnFlight.departureTime} BCN → {returnFlight.arrivalTime} HKG
                </p>
              </>
            )}
          </div>
        </section>
      )}

      {/* Itinerary with images — core request */}
      <section className="ln-fade ln-fade-d2 px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="ln-label">每日行程</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em]">完整路線</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('itinerary')}
            className="text-sm font-medium text-[var(--ln-accent)]"
          >
            展開全部 →
          </button>
        </div>

        <div className="space-y-2">
          {itinerary.map((day) => {
            const image = getItineraryDayImage(day);
            const highlight = day.activities[0];
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => onNavigate('itinerary')}
                className="ln-row w-full text-left"
              >
                <div className="ln-thumb h-[4.5rem] w-[5.5rem] sm:h-20 sm:w-24">
                  <img
                    src={image}
                    alt={day.city}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="ln-badge-neutral ln-badge">{day.dayLabel}</span>
                    <span className="text-[10px] text-[var(--ln-ink-tertiary)]">
                      {formatDateZh(day.date)}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-sm font-medium text-[var(--ln-ink)]">
                    {highlight?.title ?? day.city}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[var(--ln-ink-secondary)]">
                    {day.city}
                    {highlight?.location ? ` · ${highlight.location}` : ''}
                  </p>
                </div>
                <span className="self-center text-sm text-[var(--ln-ink-tertiary)]">›</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Secondary actions */}
      <section className="border-t border-[var(--ln-border)] px-4 py-6 sm:px-6">
        <p className="ln-label mb-3">快速前往</p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { label: '景點地圖', tab: 'map' as Tab },
              { label: '費用預算', tab: 'expenses' as Tab },
            ] as const
          ).map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => onNavigate(item.tab)}
              className="ln-panel px-4 py-3 text-left text-sm font-medium transition hover:bg-[var(--ln-bg-hover)]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Design note */}
      <section className="mx-4 mb-4 border border-[var(--ln-border)] px-4 py-3 sm:mx-6">
        <p className="ln-label">設計方向</p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--ln-ink-secondary)]">
          參考 Linear.app：深色精準介面、全幅 Hero、細邊框面板、靛紫強調色；每日行程附縮圖預覽。
          確認後套用到全站。
        </p>
      </section>

      {/* Bottom nav */}
      <nav
        className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--ln-border)] backdrop-blur-xl"
        style={{ background: 'var(--ln-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-lg justify-around px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {[
            { label: '首頁', active: true },
            { label: '行程', active: false },
            { label: '地圖', active: false },
            { label: '費用', active: false },
          ].map((tab) => (
            <span
              key={tab.label}
              className={`ln-nav-tab ${tab.active ? 'ln-nav-tab-active' : ''}`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
}
