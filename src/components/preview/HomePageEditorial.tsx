import type { FlightInfo, ItineraryDay } from '../../data/tripData';
import { formatDateZh, formatHkd, EUR_TO_HKD } from '../../data/tripData';
import type { Tab } from '../Layout';
import { ThemeToggleButton } from '../icons';
import { SyncStatus } from '../SyncStatus';
import type { ConnectionStatus } from '../../hooks/useOfflineSync';
import type { SyncMeta } from '../../services/storage';
import '../../styles/editorial.css';

interface HomePageEditorialProps {
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigate: (tab: Tab) => void;
  onExitPreview: () => void;
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
  totalExpensesEur: number;
}

const HERO_IMAGE = 'https://picsum.photos/seed/spain-editorial-barcelona/720/900';

const navLinks: { label: string; desc: string; tab: Tab }[] = [
  { label: '每日行程', desc: '10 天 · Barcelona & Madrid', tab: 'itinerary' },
  { label: '景點地圖', desc: '8 個精選景點', tab: 'map' },
  { label: '費用預算', desc: 'HKD 追蹤', tab: 'expenses' },
];

export function HomePageEditorial({
  flights,
  itinerary,
  isDark,
  onToggleTheme,
  onNavigate,
  onExitPreview,
  status,
  syncMeta,
  onSync,
  totalExpensesEur,
}: HomePageEditorialProps) {
  const departure = flights.find((f) => f.type === 'departure');
  const returnFlight = flights.find((f) => f.type === 'return');
  const nextDay = itinerary[1];

  return (
    <div className={`ed-app relative min-h-dvh pb-36 ${isDark ? '' : 'light'}`}>
      {/* Masthead */}
      <header className="px-6 pt-6 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="ed-label">設計方向預覽 · Editorial</p>
            <p className="mt-3 ed-body text-sm">Spain · Oct 15–24, 2026</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} variant="editorial" />
            <button
              type="button"
              onClick={onExitPreview}
              className="rounded-full border border-[var(--ed-border)] px-3 py-1.5 text-xs text-[var(--ed-ink-muted)] transition hover:text-[var(--ed-ink)]"
            >
              返回現版
            </button>
          </div>
        </div>
        <div className="mt-3">
          <SyncStatus status={status} syncMeta={syncMeta} onSync={onSync} />
        </div>
      </header>

      {/* Editorial hero — asymmetric, typographic first */}
      <section className="px-6 pt-8 pb-10 ed-rise">
        <div className="grid grid-cols-[1fr_38%] items-end gap-4">
          <div className="min-w-0">
            <h1 className="ed-display text-[2.35rem] text-[var(--ed-ink)] sm:text-[2.6rem]">
              西班牙，
              <br />
              慢慢走
            </h1>
          </div>
          <div className="relative mb-1">
            <img
              src={HERO_IMAGE}
              alt="Barcelona streetscape"
              className="ed-photo aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
        <p className="ed-body mt-8 max-w-[28ch]">
          一個為旅途中使用的離線行程本。保留 English 地名，讓你在 Spain 街頭對得上指示牌與訂單。
        </p>
      </section>

      <hr className="ed-divider mx-6" />

      {/* Flight — typographic strip, no card box */}
      {departure && (
        <section className="px-6 py-10 ed-rise ed-rise-d1" id="flights">
          <p className="ed-label">即將出發</p>
          <p className="ed-display mt-4 text-[1.75rem] text-[var(--ed-ink)]">
            Cathay Pacific {departure.flightNumber}
          </p>
          <p className="mt-2 text-sm text-[var(--ed-ink-muted)]">{formatDateZh(departure.date)}</p>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="ed-display ed-tabular text-3xl text-[var(--ed-ink)]">
                {departure.departureTime}
              </p>
              <p className="mt-1 text-sm text-[var(--ed-ink-subtle)]">HKG</p>
            </div>
            <div className="flex-1 pb-1 text-center">
              <p className="text-xs text-[var(--ed-ink-subtle)]">{departure.duration}</p>
              <div className="mx-auto mt-2 h-px w-full max-w-[100px] bg-[var(--ed-divider)]" />
            </div>
            <div className="text-right">
              <p className="ed-display ed-tabular text-3xl text-[var(--ed-ink)]">
                {departure.arrivalTime}
              </p>
              <p className="mt-1 text-sm text-[var(--ed-ink-subtle)]">BCN</p>
            </div>
          </div>

          <p className="ed-body mt-6 text-sm leading-relaxed">
            {departure.departureAirport}
            <span className="mx-2 text-[var(--ed-ink-subtle)]">→</span>
            {departure.arrivalAirport}
          </p>

          {returnFlight && (
            <div className="mt-10 border-t border-[var(--ed-divider)] pt-8">
              <p className="ed-label">回程</p>
              <p className="mt-3 text-base font-medium text-[var(--ed-ink)]">
                {returnFlight.flightNumber} · {formatDateZh(returnFlight.date)}
              </p>
              <p className="mt-1 text-sm ed-tabular text-[var(--ed-ink-muted)]">
                {returnFlight.departureTime} BCN – {returnFlight.arrivalTime} HKG
              </p>
            </div>
          )}
        </section>
      )}

      <div className="h-2 bg-[var(--ed-bg-sunken)]" />

      {/* Navigation — text list, no icon grid */}
      <section className="px-6 py-10 ed-rise ed-rise-d2">
        <p className="ed-label">前往</p>
        <div className="mt-4">
          {navLinks.map((link) => (
            <button
              key={link.tab}
              type="button"
              onClick={() => onNavigate(link.tab)}
              className="ed-list-row"
            >
              <span>
                <span className="block text-base font-medium text-[var(--ed-ink)]">{link.label}</span>
                <span className="mt-0.5 block text-sm text-[var(--ed-ink-muted)]">{link.desc}</span>
              </span>
              <span className="text-sm text-[var(--ed-accent-sand)]">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Next — editorial pull, tonal shift not card */}
      {nextDay && (
        <section className="bg-[var(--ed-bg-raised)] px-6 py-10 ed-rise ed-rise-d3">
          <div className="flex items-baseline justify-between gap-4">
            <p className="ed-label">下一站</p>
            <button type="button" onClick={() => onNavigate('itinerary')} className="ed-link text-sm">
              全部行程
            </button>
          </div>
          <p className="ed-display mt-5 text-[1.65rem] text-[var(--ed-ink)]">{nextDay.city}</p>
          <p className="mt-1 text-sm text-[var(--ed-ink-muted)]">
            {nextDay.dayLabel} · {formatDateZh(nextDay.date)}
          </p>
          <div className="mt-8 space-y-6">
            {nextDay.activities.slice(0, 2).map((act, i) => (
              <div key={i}>
                <p className="ed-tabular text-xs font-medium text-[var(--ed-accent-sage)]">{act.time}</p>
                <p className="mt-1 text-base font-medium leading-snug text-[var(--ed-ink)]">{act.title}</p>
                <p className="mt-1 text-sm text-[var(--ed-ink-muted)]">{act.location}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Highlights — minimal list */}
      <section className="px-6 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="ed-label">精選</p>
          <button type="button" onClick={() => onNavigate('map')} className="ed-link text-sm">
            地圖
          </button>
        </div>
        <ul className="mt-6 space-y-0">
          {[
            { name: 'Sagrada Família', day: '第 3 天' },
            { name: 'Park Güell', day: '第 4 天' },
            { name: 'Prado Museum', day: '第 7 天 · Madrid' },
          ].map((spot) => (
            <li key={spot.name} className="border-b border-[var(--ed-divider)] py-4 last:border-b-0">
              <p className="text-base font-medium text-[var(--ed-ink)]">{spot.name}</p>
              <p className="mt-0.5 text-sm text-[var(--ed-ink-muted)]">{spot.day}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Budget whisper */}
      <section className="border-t border-[var(--ed-divider)] px-6 py-10">
        <p className="ed-label">預算概覽</p>
        <p className="ed-display mt-4 text-[2rem] text-[var(--ed-accent-sand)]">
          {formatHkd(totalExpensesEur, EUR_TO_HKD)}
        </p>
        <p className="mt-2 text-sm text-[var(--ed-ink-muted)]">
          住宿、交通、門票合計 · 可切換 EUR 檢視
        </p>
        <button type="button" onClick={() => onNavigate('expenses')} className="ed-link mt-4 text-sm">
          查看費用明細 →
        </button>
      </section>

      {/* Design rationale */}
      <section className="mx-6 mb-6 border border-[var(--ed-border)] px-5 py-4">
        <p className="ed-label">設計說明</p>
        <p className="ed-body mt-3 text-sm">
          依 Open Design <strong className="font-medium text-[var(--ed-ink)]">redesign-skill</strong>{' '}
          與 anti-vaporware 原則：炭灰底色、暖灰層次、沙色／橄欖色點綴；以留白與字體層級取代卡片網格；圖示極少使用。
          確認方向後套用到全站。
        </p>
      </section>

      {/* Bottom nav — text only */}
      <nav
        className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--ed-border)] backdrop-blur-md"
        style={{ background: 'var(--ed-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-lg justify-around px-4 py-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {[
            { label: '首頁', active: true },
            { label: '行程', active: false },
            { label: '地圖', active: false },
            { label: '費用', active: false },
          ].map((tab) => (
            <span
              key={tab.label}
              className={`ed-nav-item text-[11px] font-medium ${tab.active ? 'ed-nav-item-active' : ''}`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
}
