import type { FlightInfo, ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';
import type { Tab } from './Layout';
import { ThemeToggleButton } from './icons';
import { SyncStatus } from './SyncStatus';
import { ScrollReveal } from './ScrollReveal';
import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';
import { getItineraryDayImage, getItineraryDayImageFallback, getHeroImage } from '../utils/itineraryImages';
import { TripImage } from './TripImage';

function TransportLeg({ leg, label }: { leg: FlightInfo; label?: string }) {
  return (
    <div>
      {label && <p className="ln-label mb-2">{label}</p>}
      <p className="text-sm font-medium text-[var(--ln-ink)]">
        {[leg.airline, leg.flightNumber].filter(Boolean).join(' ')}
      </p>
      <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">
        {formatDateZh(leg.date)} · {leg.route}
      </p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="ln-tabular text-2xl font-semibold">{leg.departureTime}</p>
          <p className="text-xs text-[var(--ln-ink-tertiary)]">{leg.originCode ?? '—'}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-[10px] text-[var(--ln-ink-tertiary)]">{leg.duration}</p>
          <div className="mx-auto mt-1.5 h-px w-full max-w-[80px] bg-[var(--ln-border-strong)]" />
        </div>
        <div className="text-right">
          <p className="ln-tabular text-2xl font-semibold">{leg.arrivalTime}</p>
          <p className="text-xs text-[var(--ln-ink-tertiary)]">{leg.destCode ?? '—'}</p>
        </div>
      </div>
    </div>
  );
}

export interface NavigateOptions {
  dayDate?: string;
  attractionId?: string;
}

interface HomePageProps {
  destination: string;
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: Tab, options?: NavigateOptions) => void;
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
}

export function HomePage({
  destination,
  flights,
  itinerary,
  isDark,
  onToggleTheme,
  onNavigate,
  status,
  syncMeta,
  onSync,
}: HomePageProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const returnFlight = flights.find((f) => f.type === 'return');
  const heroImage = getHeroImage(isDark);

  return (
    <>
      <div className="ln-glow pointer-events-none absolute inset-x-0 top-0 h-64" aria-hidden />

      <section className="ln-fade relative w-full overflow-hidden">
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/10]">
          <TripImage
            key={heroImage}
            src={heroImage}
            fallback={`${import.meta.env.BASE_URL}images/attractions/canton-tower-hero.jpg`}
            alt="廣州天際線與廣州塔"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            loading="eager"
          />
          <div className="ln-hero-overlay absolute inset-0" />

          <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-end gap-2 px-4 pt-4 pb-2 sm:px-6">
            <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} variant="hero" />
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-10 px-4 pb-8 sm:px-6">
            <p className="ln-label ln-hero-ink-secondary">廣州 · 2026年7月25–26日</p>
            <h1 className="ln-hero-ink mt-2 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2rem]">
              廣州旅行行程
            </h1>
            <p className="ln-hero-ink-secondary mt-2 max-w-md text-sm leading-relaxed">
              2 日 1 夜快閃 · 離線行程、地圖與費用追蹤
            </p>
            <div className="mt-3">
              <SyncStatus
                status={status}
                syncMeta={syncMeta}
                onSync={onSync}
                variant={isDark ? 'hero' : 'hero-light'}
              />
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal as="section" className="border-b border-[var(--ln-border)] px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <span className="ln-badge-neutral ln-badge">2 日 1 夜</span>
          <span className="ln-badge-neutral ln-badge">{destination}</span>
          <span className="ln-badge">西九龍 ↔ 廣州東</span>
          <span className="ln-badge-neutral ln-badge">離線優先</span>
        </div>
      </ScrollReveal>

      {departure && (
        <ScrollReveal as="section" className="px-4 py-6 sm:px-6" delay={60} id="flights">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="ln-label">交通資訊</p>
            <span className="ln-badge">{departure.status}</span>
          </div>
          <div className="ln-panel p-4">
            <TransportLeg leg={departure} label={returnFlight ? '去程' : undefined} />
            {returnFlight && (
              <>
                <hr className="ln-divider my-4" />
                <TransportLeg leg={returnFlight} label="回程" />
              </>
            )}
          </div>
        </ScrollReveal>
      )}

      <section className="px-4 py-6 sm:px-6">
        <ScrollReveal delay={80}>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="ln-label">每日行程</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em]">完整路線</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('itinerary')}
              className="ln-pressable text-sm font-medium text-[var(--ln-accent)]"
            >
              展開全部 →
            </button>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {itinerary.map((day, index) => {
            const image = getItineraryDayImage(day, isDark);
            const imageFallback = getItineraryDayImageFallback(day, isDark);
            const highlight = day.activities[0];
            return (
              <ScrollReveal key={day.date} delay={100 + index * 55}>
                <button
                  type="button"
                  onClick={() => onNavigate('itinerary', { dayDate: day.date })}
                  className="ln-row ln-pressable w-full text-left"
                >
                  <div className="ln-thumb h-[4.5rem] w-[5.5rem] sm:h-20 sm:w-24">
                    <TripImage
                      key={image}
                      src={image}
                      fallback={imageFallback}
                      alt={highlight?.title ?? day.city}
                      className="h-full w-full object-cover transition-opacity duration-500 ease-out"
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
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <ScrollReveal as="section" className="border-t border-[var(--ln-border)] px-4 py-6 sm:px-6" delay={120}>
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
              className="ln-panel ln-pressable px-4 py-3 text-left text-sm font-medium hover:bg-[var(--ln-bg-hover)]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </ScrollReveal>
    </>
  );
}
