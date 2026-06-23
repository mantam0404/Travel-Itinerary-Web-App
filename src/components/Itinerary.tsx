import { useState } from 'react';
import type { ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';

interface ItineraryProps {
  days: ItineraryDay[];
}

export function Itinerary({ days }: ItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<string>(days[1]?.date ?? days[0]?.date ?? '');

  return (
    <section id="itinerary" className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📋</span>
        <h2 className="text-xl font-bold">每日行程</h2>
      </div>

      <div className="space-y-3">
        {days.map((day) => {
          const isOpen = expandedDay === day.date;
          return (
            <div key={day.date} className="glass-card overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedDay(isOpen ? '' : day.date)}
                className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/30 dark:hover:bg-dusk/50"
              >
                <div>
                  <p className="text-xs font-medium text-terracotta dark:text-coral">{day.dayLabel}</p>
                  <p className="font-semibold">{formatDateZh(day.date)}</p>
                  <p className="text-sm text-midnight/50 dark:text-cream/50">{day.city}</p>
                </div>
                <span className={`text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isOpen && (
                <div className="border-t border-midnight/5 px-4 pb-4 dark:border-cream/5">
                  <div className="relative ml-3 mt-4 space-y-4 border-l-2 border-lavender/30 pl-6">
                    {day.activities.map((act, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[1.85rem] top-1 flex h-3 w-3 rounded-full border-2 border-lavender bg-cream dark:bg-midnight" />
                        <p className="text-xs font-medium text-lavender">{act.time}</p>
                        <p className="font-semibold">{act.title}</p>
                        <p className="text-sm text-terracotta dark:text-coral">{act.location}</p>
                        <p className="mt-1 text-sm text-midnight/60 dark:text-cream/60">{act.description}</p>
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
