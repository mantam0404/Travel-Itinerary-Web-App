import type { FlightInfo, ItineraryDay } from '../../data/tripData';
import { formatDateZh } from '../../data/tripData';
import '../../styles/open-design-preview.css';

interface HomePagePreviewProps {
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  isDark: boolean;
  onToggleTheme: () => void;
  onExitPreview?: () => void;
}

function IconPlane({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 8H5v10h14V10z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 7H5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-2 6h-2v-2h2v2zM5 11h11v6H5v-6z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrain() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 15.5V7a4 4 0 014-4h8a4 4 0 014 4v8.5M4 11h16M8 19h2M14 19h2M6 15h12v4H6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const quickActions = [
  { label: '每日行程', sub: '10 天規劃', icon: IconCalendar },
  { label: '景點地圖', sub: 'Barcelona', icon: IconMap },
  { label: '費用預算', sub: 'HKD 追蹤', icon: IconWallet },
  { label: '航班資訊', sub: 'CX321 / CX318', icon: IconPlane },
];

const highlights = [
  {
    name: 'Sagrada Família',
    meta: '第 3 天 · 09:30',
    image: 'https://picsum.photos/seed/sagrada-familia/640/480',
  },
  {
    name: 'Park Güell',
    meta: '第 4 天 · 10:00',
    image: 'https://picsum.photos/seed/park-guell-barcelona/640/480',
  },
  {
    name: 'Prado Museum',
    meta: '第 7 天 · Madrid',
    image: 'https://picsum.photos/seed/prado-madrid/640/480',
  },
];

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80';

export function HomePagePreview({
  flights,
  itinerary,
  isDark,
  onToggleTheme,
  onExitPreview,
}: HomePagePreviewProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const nextDay = itinerary[1];

  return (
    <div
      className={`od-preview relative mx-auto min-h-dvh max-w-lg overflow-x-hidden pb-36 ${isDark ? 'dark' : ''}`}
    >
      <div className="od-grain" aria-hidden />

      {/* Hero — travel postcard style, self-contained spacing */}
      <section className="relative overflow-hidden">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-[24px]">
          <img
            src={HERO_IMAGE}
            alt="Park Güell mosaic view, Barcelona"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
          />

          {/* Warm sunset travel gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                var(--od-hero-overlay-top) 0%,
                var(--od-hero-overlay-mid) 38%,
                var(--od-hero-overlay-bottom) 100%
              )`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 85% 15%, rgba(244,162,97,0.45) 0%, transparent 60%)',
            }}
          />

          {/* Decorative route arc */}
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
              fill="none"
            />
            <circle cx="8" cy="48" r="4" fill="var(--od-travel-gold)" />
            <circle cx="160" cy="20" r="3" fill="var(--od-travel-sky)" />
            <circle cx="312" cy="48" r="4" fill="var(--od-rausch)" />
          </svg>

          {/* Header inside hero — no overlapping fixed elements */}
          <div className="absolute top-0 right-0 left-0 z-10 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
                  Spain Trip 2026
                </p>
                <h1 className="mt-1 text-[22px] font-bold leading-snug tracking-[-0.02em] text-white sm:text-[24px]">
                  西班牙旅行行程
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="od-theme-btn border-white/25 bg-black/25 text-white backdrop-blur-md"
                  aria-label={isDark ? '切換至淺色模式' : '切換至深色模式'}
                  title={isDark ? '淺色模式' : '深色模式'}
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
                {onExitPreview && (
                  <button
                    type="button"
                    onClick={onExitPreview}
                    className="rounded-full border border-white/25 bg-black/25 px-3 py-2 text-[11px] font-medium text-white backdrop-blur-md transition hover:bg-black/40"
                  >
                    返回
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hero copy — bottom safe zone */}
          <div className="absolute right-0 bottom-0 left-0 z-10 p-5 pb-6">
            <div className="od-animate-in space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="od-hero-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold">
                  <IconPlane size={12} />
                  HKG → BCN
                </span>
                <span className="od-hero-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold">
                  <IconTrain />
                  Barcelona → Madrid
                </span>
                <span className="od-hero-chip rounded-full px-3 py-1 text-[11px] font-semibold">
                  10 天 · 2 城市
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

      {/* Flight card — separate section, no overlap */}
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

      {/* Quick actions */}
      <section className="mt-8 px-4 od-animate-in od-animate-in-delay-2">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-[22px] font-bold tracking-[-0.02em]">快速入口</h2>
          <span className="shrink-0 text-sm font-medium text-[var(--od-ink-muted)]">4 項功能</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className="od-surface-card group rounded-[14px] p-4 text-left transition duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--od-rausch-soft)] text-[var(--od-rausch)] transition group-hover:bg-[var(--od-rausch)] group-hover:text-white">
                  <Icon />
                </span>
                <p className="mt-3 text-[15px] font-semibold leading-snug">{action.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--od-ink-muted)]">
                  {action.sub}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Up next */}
      {nextDay && (
        <section className="mt-10 px-4 od-animate-in od-animate-in-delay-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[22px] font-bold tracking-[-0.02em]">下一站</h2>
            <button
              type="button"
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
              {nextDay.activities.slice(0, 2).map((act, i: number) => (
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

      {/* Highlights */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-3 px-4">
          <h2 className="text-[22px] font-bold tracking-[-0.02em]">精選景點</h2>
          <button
            type="button"
            className="shrink-0 text-sm font-semibold text-[var(--od-rausch)]"
          >
            開啟地圖
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {highlights.map((spot) => (
            <article key={spot.name} className="w-[68%] shrink-0 sm:w-[220px]">
              <div className="overflow-hidden rounded-[14px]">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-snug">{spot.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--od-ink-muted)]">{spot.meta}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Design note */}
      <section className="mx-4 mt-10 mb-4 rounded-[14px] border border-dashed border-[var(--od-hairline)] bg-[var(--od-cloud)] p-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--od-rausch)] uppercase">
          v2 預覽更新
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--od-ink-muted)]">
          已加入深／淺色模式切換、旅行路線視覺（HKG → BCN → Madrid）、明信片式英雄區，
          並修正間距避免元素遮擋文字。確認後將套用到全站頁面。
        </p>
      </section>

      {/* Bottom nav */}
      <nav
        className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--od-hairline)] backdrop-blur-lg"
        style={{ background: 'var(--od-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {[
            { label: '首頁', active: true },
            { label: '行程', active: false },
            { label: '地圖', active: false },
            { label: '費用', active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`flex min-w-[3.5rem] flex-col items-center gap-1 px-3 py-1 text-[11px] font-semibold ${
                tab.active ? 'text-[var(--od-rausch)]' : 'text-[var(--od-ink-subtle)]'
              }`}
            >
              {tab.label}
              {tab.active && (
                <span className="h-0.5 w-6 rounded-full bg-[var(--od-rausch)]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
