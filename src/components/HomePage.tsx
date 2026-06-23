import type { FlightInfo, ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';
import type { Tab } from './Layout';
import {
  IconPlane,
  IconMap,
  IconCalendar,
  IconWallet,
  IconChevron,
  ThemeToggleButton,
} from './icons';
import { SyncStatus } from './SyncStatus';
import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';

interface HomePageProps {
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: Tab) => void;
  onScrollToFlights: () => void;
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
  onTryEditorial?: () => void;
  onTryLinear?: () => void;
}

const HERO_IMAGE = 'https://picsum.photos/seed/barcelona-park-guell-travel/900/1125';

const highlights = [
  { name: 'Sagrada Família', meta: '第 3 天 · 09:30', image: 'https://picsum.photos/seed/sagrada-familia/640/480' },
  { name: 'Park Güell', meta: '第 4 天 · 10:00', image: 'https://picsum.photos/seed/park-guell-barcelona/640/480' },
  { name: 'Casa Milà', meta: '第 6 天 · La Pedrera', image: 'https://picsum.photos/seed/casa-mila-barcelona/640/480' },
];

export function HomePage({
  flights,
  itinerary,
  isDark,
  onToggleTheme,
  onNavigate,
  onScrollToFlights,
  status,
  syncMeta,
  onSync,
  onTryEditorial,
  onTryLinear,
}: HomePageProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const nextDay = itinerary[1];

  const quickActions: { label: string; sub: string; tab: Tab | 'flights'; icon: typeof IconCalendar }[] = [
    { label: '每日行程', sub: '10 天規劃', tab: 'itinerary', icon: IconCalendar },
    { label: '景點地圖', sub: 'Barcelona', tab: 'map', icon: IconMap },
    { label: '費用預算', sub: 'HKD 追蹤', tab: 'expenses', icon: IconWallet },
    { label: '航班資訊', sub: 'CX321 / CX318', tab: 'flights', icon: IconPlane },
  ];

  return (
    <>
      {(onTryLinear || onTryEditorial) && (
        <div className="mx-4 mt-4 space-y-2">
          {onTryLinear && (
            <button
              type="button"
              onClick={onTryLinear}
              className="w-full rounded-xl border border-[var(--od-hairline)] bg-[var(--od-cloud)] px-4 py-3 text-left transition hover:opacity-90"
            >
              <p className="text-xs font-medium text-[var(--od-ink-subtle)]">新設計方向預覽 · Linear</p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--od-ink)]">
                全幅 Hero + 行程附圖 →
              </p>
            </button>
          )}
          {onTryEditorial && (
            <button
              type="button"
              onClick={onTryEditorial}
              className="w-full rounded-xl border border-[var(--od-hairline)] px-4 py-2.5 text-left text-xs text-[var(--od-ink-muted)] transition hover:opacity-90"
            >
              查看 Editorial 風格預覽
            </button>
          )}
        </div>
      )}

      <section className="relative overflow-hidden">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-[24px]">
          <img
            src={HERO_IMAGE}
            alt="Park Güell mosaic view, Barcelona"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, var(--od-hero-overlay-top) 0%, var(--od-hero-overlay-mid) 38%, var(--od-hero-overlay-bottom) 100%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 85% 15%, rgba(244,162,97,0.45) 0%, transparent 60%)',
            }}
          />
          <svg
            className="pointer-events-none absolute top-[38%] right-4 left-4 h-16 w-[calc(100%-2rem)] opacity-70"
            viewBox="0 0 320 64"
            fill="none"
            aria-hidden
          >
            <path
              className="od-hero-route"
              d="M8 48 C 80 8, 240 8, 312 48"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
            />
            <circle cx="8" cy="48" r="4" fill="var(--od-travel-gold)" />
            <circle cx="160" cy="20" r="3" fill="var(--od-travel-sky)" />
            <circle cx="312" cy="48" r="4" fill="var(--od-rausch)" />
          </svg>

          <div className="absolute top-0 right-0 left-0 z-10 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  Spain Trip 2026
                </p>
                <h1 className="mt-1 text-[22px] font-bold leading-snug tracking-[-0.02em] text-white sm:text-[24px]">
                  西班牙旅行行程
                </h1>
                <div className="mt-2">
                  <SyncStatus status={status} syncMeta={syncMeta} onSync={onSync} variant="hero" />
                </div>
              </div>
              <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} variant="hero" />
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-10 p-5 pb-6">
            <div className="od-animate-in space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="od-hero-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold">
                  <IconPlane size={12} />
                  HKG → BCN
                </span>
                <span className="od-hero-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold">
                  <IconMap size={12} />
                  Barcelona 深度遊
                </span>
                <span className="od-hero-chip rounded-full px-3 py-1 text-[11px] font-semibold">
                  10 天 · 1 城市
                </span>
              </div>
              <p className="text-[26px] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[28px]">
                探索 Spain 的
                <br />
                建築、美食與藝術
              </p>
              <p className="max-w-[32ch] text-sm leading-relaxed text-white/85">
                {formatDateZh('2026-10-15')} – {formatDateZh('2026-10-24')}
                <span className="mx-1.5 opacity-50">·</span>
                離線行程 · 地圖 · 費用
              </p>
            </div>
          </div>
        </div>
      </section>

      {departure && (
        <section className="mt-6 px-4 od-animate-in od-animate-in-delay-1">
          <div className="od-surface-card rounded-[20px] p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--od-ink-muted)]">即將出發</p>
                <p className="mt-1 truncate text-lg font-bold tracking-[-0.02em]">
                  Cathay Pacific {departure.flightNumber}
                </p>
                <p className="mt-0.5 text-sm text-[var(--od-ink-muted)]">
                  {formatDateZh(departure.date)}
                </p>
              </div>
              <div className="shrink-0 rounded-full bg-[var(--od-rausch-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--od-rausch)]">
                {departure.status}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl bg-[var(--od-cloud)] px-4 py-3">
              <div className="shrink-0">
                <p className="text-2xl font-bold tabular-nums">{departure.departureTime}</p>
                <p className="text-xs font-medium text-[var(--od-ink-muted)]">HKG</p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-center px-1">
                <p className="text-[11px] text-[var(--od-ink-subtle)]">{departure.duration}</p>
                <div className="my-1 flex w-full max-w-[120px] items-center gap-1 text-[var(--od-rausch)]">
                  <span className="h-px flex-1 bg-[var(--od-hairline)]" />
                  <IconPlane />
                  <span className="h-px flex-1 bg-[var(--od-hairline)]" />
                </div>
                <p className="truncate text-[11px] font-medium text-[var(--od-ink-muted)]">
                  {departure.route}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-bold tabular-nums">{departure.arrivalTime}</p>
                <p className="text-xs font-medium text-[var(--od-ink-muted)]">BCN</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 px-4 od-animate-in od-animate-in-delay-2">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="od-section-title">快速入口</h2>
          <span className="shrink-0 text-sm font-medium text-[var(--od-ink-muted)]">4 項功能</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() =>
                  action.tab === 'flights' ? onScrollToFlights() : onNavigate(action.tab)
                }
                className="od-surface-card group rounded-[14px] p-4 text-left transition duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--od-rausch-soft)] text-[var(--od-rausch)] transition group-hover:bg-[var(--od-rausch)] group-hover:text-white">
                  <Icon />
                </span>
                <p className="mt-3 text-[15px] font-semibold leading-snug">{action.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--od-ink-muted)]">{action.sub}</p>
              </button>
            );
          })}
        </div>
      </section>

      {nextDay && (
        <section className="mt-10 px-4 od-animate-in od-animate-in-delay-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="od-section-title">下一站</h2>
            <button
              type="button"
              onClick={() => onNavigate('itinerary')}
              className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-[var(--od-rausch)]"
            >
              查看行程
              <IconChevron />
            </button>
          </div>
          <div className="od-surface-card overflow-hidden rounded-[20px]">
            <div className="relative h-40">
              <img
                src="https://picsum.photos/seed/barcelona-gothic/800/400"
                alt="Gothic Quarter, Barcelona"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute right-4 bottom-4 left-4">
                <p className="text-xs font-semibold text-white/85">{nextDay.dayLabel}</p>
                <p className="mt-0.5 text-lg font-bold leading-snug text-white">{nextDay.city}</p>
              </div>
            </div>
            <div className="space-y-4 p-4">
              {nextDay.activities.slice(0, 2).map((act, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-11 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-[var(--od-rausch)]">
                    {act.time}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{act.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--od-ink-muted)]">
                      {act.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-3 px-4">
          <h2 className="od-section-title">精選景點</h2>
          <button
            type="button"
            onClick={() => onNavigate('map')}
            className="shrink-0 text-sm font-semibold text-[var(--od-rausch)]"
          >
            開啟地圖
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {highlights.map((spot) => (
            <article key={spot.name} className="w-[68%] shrink-0 sm:w-[220px]">
              <div className="overflow-hidden rounded-[14px]">
                <img src={spot.image} alt={spot.name} className="aspect-[4/3] w-full object-cover" />
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-snug">{spot.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--od-ink-muted)]">{spot.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="flights" className="mt-10 scroll-mt-6 px-4 pb-4">
        <div className="mb-4">
          <h2 className="od-section-title">航班資訊／儀表板</h2>
          <p className="mt-1 text-sm text-[var(--od-ink-muted)]">
            目的地：Spain · Cathay Pacific CX321 / CX318
          </p>
        </div>
        <div className="space-y-3">
          {flights.map((flight) => (
            <FlightSummaryCard key={flight.id} flight={flight} />
          ))}
        </div>
      </section>
    </>
  );
}

function FlightSummaryCard({ flight }: { flight: FlightInfo }) {
  const isDeparture = flight.type === 'departure';
  const depCode = isDeparture ? 'HKG' : 'BCN';
  const arrCode = isDeparture ? 'BCN' : 'HKG';

  return (
    <div className="od-surface-card rounded-[16px] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--od-rausch-soft)] px-3 py-1 text-xs font-semibold text-[var(--od-rausch)]">
          {isDeparture ? '去程' : '回程'}
        </span>
        <span className="text-xs font-medium text-[var(--od-ink-muted)]">{flight.status}</span>
      </div>
      <p className="text-sm text-[var(--od-ink-muted)]">{formatDateZh(flight.date)}</p>
      <p className="mt-1 text-lg font-bold">
        {flight.airline} {flight.flightNumber}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-[var(--od-cloud)] px-3 py-2.5">
        <div>
          <p className="text-xl font-bold tabular-nums">{flight.departureTime}</p>
          <p className="text-xs text-[var(--od-ink-muted)]">{depCode}</p>
        </div>
        <div className="text-center text-[var(--od-rausch)]">
          <IconPlane size={16} />
          <p className="mt-0.5 text-[10px] text-[var(--od-ink-subtle)]">{flight.duration}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tabular-nums">{flight.arrivalTime}</p>
          <p className="text-xs text-[var(--od-ink-muted)]">{arrCode}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 border-t border-[var(--od-hairline)] pt-3 text-sm">
        <p className="leading-relaxed">
          <span className="text-[var(--od-ink-muted)]">出發：</span>
          {flight.departureAirport}
        </p>
        <p className="leading-relaxed">
          <span className="text-[var(--od-ink-muted)]">抵達：</span>
          {flight.arrivalAirport}
        </p>
      </div>
    </div>
  );
}
