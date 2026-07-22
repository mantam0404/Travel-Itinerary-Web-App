import { useEffect, useRef } from 'react';
import type { Attraction, ItineraryDay } from '../data/tripData';
import { ScrollReveal } from './ScrollReveal';
import { ItineraryDayCard } from './ItineraryDayCard';

interface ItineraryProps {
  days: ItineraryDay[];
  attractions: Attraction[];
  isDark: boolean;
  expandedDayDates: Set<string>;
  scrollToDayDate: string | null;
  onExpandedDayDatesChange: (dates: Set<string>) => void;
  onScrollToDayComplete: () => void;
  onNavigateToAttraction: (attractionId: string) => void;
}

export function Itinerary({
  days,
  attractions,
  isDark,
  expandedDayDates,
  scrollToDayDate,
  onExpandedDayDatesChange,
  onScrollToDayComplete,
  onNavigateToAttraction,
}: ItineraryProps) {
  const scrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (!scrollToDayDate || scrollTargetRef.current === scrollToDayDate) return;
    scrollTargetRef.current = scrollToDayDate;

    const timer = window.setTimeout(() => {
      document.getElementById(`itinerary-day-${scrollToDayDate}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      onScrollToDayComplete();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [scrollToDayDate, onScrollToDayComplete]);

  const toggleDay = (date: string) => {
    const next = new Set(expandedDayDates);
    if (next.has(date)) next.delete(date);
    else next.add(date);
    onExpandedDayDatesChange(next);
  };

  return (
    <section id="itinerary" className="space-y-4 px-4 py-6">
      <ScrollReveal>
        <p className="text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
          2 日 1 夜廣州快閃 · 點擊景點可跳轉至地圖位置
        </p>
      </ScrollReveal>

      <div className="space-y-2">
        {days.map((day, index) => (
          <ScrollReveal key={day.date} delay={60 + index * 45}>
            <ItineraryDayCard
              id={`itinerary-day-${day.date}`}
              day={day}
              attractions={attractions}
              isDark={isDark}
              isOpen={expandedDayDates.has(day.date)}
              onToggle={() => toggleDay(day.date)}
              onNavigateToAttraction={onNavigateToAttraction}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
