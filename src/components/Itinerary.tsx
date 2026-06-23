import { useState } from 'react';
import type { ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';
import { IconChevron } from './icons';
import { getItineraryDayImage } from '../utils/itineraryImages';

interface ItineraryProps {
  days: ItineraryDay[];
  isDark: boolean;
}

export function Itinerary({ days, isDark }: ItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<string>(days[1]?.date ?? days[0]?.date ?? '');

  return (
    <section id="itinerary" className="space-y-4 px-4 py-6">
      <p className="text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
        10 天 Barcelona 行程 · 高第建築與地中海風情
      </p>

      <div className="space-y-2">
        {days.map((day) => {
          const isOpen = expandedDay === day.date;
          const image = getItineraryDayImage(day, isDark);
          const highlight = day.activities[0];

          return (
            <div key={day.date} className="ln-panel overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedDay(isOpen ? '' : day.date)}
                className="ln-row w-full text-left"
              >
                <div className="ln-thumb h-16 w-20 shrink-0">
                  <img
                    key={image}
                    src={image}
                    alt={highlight?.title ?? day.city}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="ln-badge">{day.dayLabel}</span>
                    <span className="text-[10px] text-[var(--ln-ink-tertiary)]">
                      {formatDateZh(day.date)}
                    </span>
                  </div>
                  <p className="mt-1.5 truncate text-sm font-medium">{highlight?.title ?? day.city}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--ln-ink-secondary)]">{day.city}</p>
                </div>
                <span
                  className={`shrink-0 self-center text-[var(--ln-ink-tertiary)] transition-transform ${isOpen ? 'rotate-90' : ''}`}
                >
                  <IconChevron />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[var(--ln-border)] px-4 pb-4">
                  <div className="ln-timeline relative ml-2 mt-4 space-y-4 pl-5">
                    {day.activities.map((act, i) => (
                      <div key={i} className="ln-timeline-item relative">
                        <p className="ln-tabular text-xs font-medium text-[var(--ln-accent)]">{act.time}</p>
                        <p className="mt-0.5 text-sm font-medium">{act.title}</p>
                        <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">{act.location}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
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
