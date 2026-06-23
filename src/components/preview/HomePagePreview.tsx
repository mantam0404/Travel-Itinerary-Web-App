import type { FlightInfo, ItineraryDay } from '../../data/tripData';
import { formatDateZh } from '../../data/tripData';
import '../../styles/open-design-preview.css';

interface HomePagePreviewProps {
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  onExitPreview?: () => void;
}

function IconPlane() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    image: 'https://picsum.photos/seed/sagrada/640/480',
  },
  {
    name: 'Park Güell',
    meta: '第 4 天 · 10:00',
    image: 'https://picsum.photos/seed/parkguell/640/480',
  },
  {
    name: 'Prado Museum',
    meta: '第 7 天 · Madrid',
    image: 'https://picsum.photos/seed/prado/640/480',
  },
];

export function HomePagePreview({ flights, itinerary, onExitPreview }: HomePagePreviewProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const nextDay = itinerary[1];

  return (
    <div className="od-preview relative mx-auto min-h-dvh max-w-lg overflow-x-hidden pb-28">
      <div className="od-grain" aria-hidden />

      {onExitPreview && (
        <button
          type="button"
          onClick={onExitPreview}
          className="fixed top-3 right-3 z-[70] rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/70"
        >
          返回現有版本
        </button>
      )}

      {/* Hero */}
      <section className="relative min-h-[52dvh] overflow-hidden">
        <img
          src="https://picsum.photos/seed/barcelona-spain/900/1200"
          alt="Barcelona skyline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/70" />

        <header className="relative z-10 flex items-center justify-between px-5 pt-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-white/75 uppercase">
              設計預覽 · Open Design
            </p>
            <h1 className="mt-1 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white">
              Spain 旅行行程
            </h1>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-sm font-semibold text-white backdrop-blur-md">
            ES
          </div>
        </header>

        <div className="absolute right-0 bottom-0 left-0 z-10 px-5 pb-6">
          <div className="od-animate-in">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md">
              2026年10月15日 – 24日
            </span>
            <p className="mt-3 max-w-[18ch] text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-white">
              你的 Barcelona
              <br />
              & Madrid 之旅
            </p>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-white/80">
              離線優先行程規劃 · 航班、地圖、費用一站整合
            </p>
          </div>
        </div>
      </section>

      {/* Floating flight card */}
      {departure && (
        <section className="relative z-20 -mt-8 px-5 od-animate-in od-animate-in-delay-1">
          <div
            className="rounded-[20px] bg-white p-4"
            style={{ boxShadow: 'var(--od-shadow-panel)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[var(--od-ink-muted)]">即將出發</p>
                <p className="mt-1 text-lg font-bold tracking-[-0.02em]">
                  Cathay Pacific {departure.flightNumber}
                </p>
                <p className="text-sm text-[var(--od-ink-muted)]">
                  {formatDateZh(departure.date)} · {departure.route}
                </p>
              </div>
              <div className="rounded-full bg-[#fff0f3] px-3 py-1.5 text-xs font-semibold text-[var(--od-rausch)]">
                {departure.status}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[var(--od-cloud)] px-4 py-3">
              <div>
                <p className="text-2xl font-bold tabular-nums">{departure.departureTime}</p>
                <p className="text-xs font-medium text-[var(--od-ink-muted)]">HKG</p>
              </div>
              <div className="flex flex-col items-center px-2">
                <p className="text-[11px] text-[var(--od-ink-subtle)]">{departure.duration}</p>
                <div className="my-1 flex items-center gap-1 text-[var(--od-rausch)]">
                  <span className="h-px w-8 bg-[var(--od-hairline)]" />
                  <IconPlane />
                  <span className="h-px w-8 bg-[var(--od-hairline)]" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums">{departure.arrivalTime}</p>
                <p className="text-xs font-medium text-[var(--od-ink-muted)]">BCN</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section className="mt-8 px-5 od-animate-in od-animate-in-delay-2">
        <div className="flex items-end justify-between">
          <h2 className="text-[22px] font-bold tracking-[-0.02em]">快速入口</h2>
          <span className="text-sm font-medium text-[var(--od-ink-muted)]">4 項功能</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                className="group rounded-[14px] border border-[var(--od-hairline)] bg-white p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#ffc4d0] active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f3] text-[var(--od-rausch)] transition group-hover:bg-[var(--od-rausch)] group-hover:text-white">
                  <Icon />
                </span>
                <p className="mt-3 text-[15px] font-semibold">{action.label}</p>
                <p className="mt-0.5 text-xs text-[var(--od-ink-muted)]">{action.sub}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Up next */}
      {nextDay && (
        <section className="mt-10 px-5 od-animate-in od-animate-in-delay-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold tracking-[-0.02em]">下一站</h2>
            <button
              type="button"
              className="flex items-center gap-0.5 text-sm font-semibold text-[var(--od-rausch)]"
            >
              查看行程
              <IconChevron />
            </button>
          </div>
          <div
            className="mt-4 overflow-hidden rounded-[20px] border border-[var(--od-hairline)] bg-white"
            style={{ boxShadow: 'var(--od-shadow-panel)' }}
          >
            <div className="relative h-36">
              <img
                src="https://picsum.photos/seed/barcelona-arrival/800/400"
                alt="Barcelona"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="text-xs font-semibold text-white/85">{nextDay.dayLabel}</p>
                <p className="text-lg font-bold text-white">{nextDay.city}</p>
              </div>
            </div>
            <div className="space-y-3 p-4">
              {nextDay.activities.slice(0, 2).map((act, i: number) => (
                <div key={i} className="flex gap-3">
                  <span className="w-12 shrink-0 text-xs font-semibold tabular-nums text-[var(--od-rausch)]">
                    {act.time}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{act.title}</p>
                    <p className="text-xs text-[var(--od-ink-muted)]">{act.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights horizontal scroll */}
      <section className="mt-10">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-[22px] font-bold tracking-[-0.02em]">精選景點</h2>
          <button type="button" className="text-sm font-semibold text-[var(--od-rausch)]">
            開啟地圖
          </button>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
          {highlights.map((spot) => (
            <article key={spot.name} className="w-[68%] shrink-0 sm:w-[240px]">
              <div className="overflow-hidden rounded-[14px]">
                <img src={spot.image} alt={spot.name} className="aspect-[4/3] w-full object-cover" />
              </div>
              <p className="mt-2.5 text-[15px] font-semibold">{spot.name}</p>
              <p className="text-xs text-[var(--od-ink-muted)]">{spot.meta}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Design note */}
      <section className="mx-5 mt-10 mb-6 rounded-[14px] border border-dashed border-[var(--od-hairline)] bg-[var(--od-cloud)] p-4">
        <p className="text-xs font-semibold tracking-wide text-[var(--od-rausch)] uppercase">
          設計方向說明
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--od-ink-muted)]">
          依 Open Design 的 <strong className="text-[var(--od-ink)]">redesign-skill</strong> 與{' '}
          <strong className="text-[var(--od-ink)]">Airbnb 設計系統</strong> 重新規劃：攝影優先的英雄區、
          Rausch 珊瑚色強調、圓角卡片、水平捲動景點列，以及更清晰的資訊層級。確認此首頁風格後，我會套用到行程、地圖與費用頁。
        </p>
      </section>

      {/* Preview bottom nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--od-hairline)] bg-white/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2.5">
          {[
            { label: '首頁', active: true },
            { label: '行程', active: false },
            { label: '地圖', active: false },
            { label: '費用', active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`relative flex flex-col items-center gap-1 px-4 py-1 text-[11px] font-semibold ${
                tab.active ? 'text-[var(--od-rausch)]' : 'text-[var(--od-ink-subtle)]'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${tab.active ? 'bg-[var(--od-rausch)]' : 'bg-transparent'}`}
              />
              {tab.label}
              {tab.active && (
                <span className="absolute -bottom-0.5 h-0.5 w-8 rounded-full bg-[var(--od-rausch)]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
