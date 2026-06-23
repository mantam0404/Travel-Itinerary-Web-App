import { useState } from 'react';
import type { ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';
import { IconChevron } from './icons';

interface ItineraryProps {
  days: ItineraryDay[];
}

export function Itinerary({ days }: ItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<string>(days[1]?.date ?? days[0]?.date ?? '');

  return (
    <section id="itinerary" className="space-y-4 px-4 py-6">
      <p className="text-sm leading-relaxed text-[var(--od-ink-muted)]">
        10 天 Spain 行程 · Barcelona & Madrid
      </p>

      <div className="space-y-3">
        {days.map((day) => {
          const isOpen = expandedDay === day.date;
          return (
            <div key={day.date} className="od-surface-card overflow-hidden rounded-[16px]">
              <button
                type="button"
                onClick={() => setExpandedDay(isOpen ? '' : day.date)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-[var(--od-cloud)]"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--od-rausch)]">{day.dayLabel}</p>
                  <p className="mt-0.5 font-semibold leading-snug">{formatDateZh(day.date)}</p>
                  <p className="mt-0.5 text-sm text-[var(--od-ink-muted)]">{day.city}</p>
                </div>
                <span
                  className={`shrink-0 text-[var(--od-ink-subtle)] transition-transform ${isOpen ? 'rotate-90' : ''}`}
                >
                  <IconChevron />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[var(--od-hairline)] px-4 pb-4">
                  <div className="relative ml-2 mt-4 space-y-4 border-l-2 border-[var(--od-rausch-soft)] pl-5">
                    {day.activities.map((act, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[1.6rem] top-1.5 flex h-2.5 w-2.5 rounded-full border-2 border-[var(--od-rausch)] bg-[var(--od-surface)]" />
                        <p className="text-xs font-semibold tabular-nums text-[var(--od-rausch)]">
                          {act.time}
                        </p>
                        <p className="mt-0.5 font-semibold leading-snug">{act.title}</p>
                        <p className="mt-0.5 text-sm text-[var(--od-travel-terracotta)]">
                          {act.location}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--od-ink-muted)]">
                          {act.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
