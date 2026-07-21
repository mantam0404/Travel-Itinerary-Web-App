import { useEffect, useMemo, useRef } from 'react';
import type { Attraction, ItineraryDay } from '../data/tripData';
import { formatDateZh, formatEur } from '../data/tripData';
import { IconChevron } from './icons';
import { ScrollReveal } from './ScrollReveal';
import { TripImage } from './TripImage';
import { YouTubeEmbed } from './YouTubeEmbed';
import { getItineraryDayImage, getItineraryDayImageFallback } from '../utils/itineraryImages';

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
  const attractionById = useMemo(
    () => new Map(attractions.map((a) => [a.id, a])),
    [attractions],
  );

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
        {days.map((day, index) => {
          const isOpen = expandedDayDates.has(day.date);
          const image = getItineraryDayImage(day, isDark);
          const imageFallback = getItineraryDayImageFallback(day, isDark);
          const highlight = day.activities[0];

          return (
            <ScrollReveal key={day.date} delay={60 + index * 45}>
              <div
                id={`itinerary-day-${day.date}`}
                className="ln-panel overflow-hidden scroll-mt-24"
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day.date)}
                  className="ln-row ln-pressable w-full text-left"
                  aria-expanded={isOpen}
                >
                  <div className="ln-thumb h-16 w-20 shrink-0">
                    <TripImage
                      key={image}
                      src={image}
                      fallback={imageFallback}
                      alt={highlight?.title ?? day.city}
                      className="h-full w-full object-cover transition-opacity duration-500"
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
                    <p className="mt-0.5 truncate text-xs text-[var(--ln-ink-tertiary)]">{day.city}</p>
                  </div>
                  <span
                    className={`ln-chevron shrink-0 self-center text-[var(--ln-ink-tertiary)] ${isOpen ? 'ln-chevron-open' : ''}`}
                  >
                    <IconChevron />
                  </span>
                </button>

                <div className={`ln-accordion-body ${isOpen ? 'ln-accordion-body-open' : ''}`}>
                  <div className="ln-accordion-inner">
                    <div className="border-t border-[var(--ln-border)] px-4 pb-4">
                      <div className="ln-timeline relative ml-2 mt-4 space-y-4 pl-5">
                        {day.activities.map((act, i) => {
                          const attraction = act.attractionId
                            ? attractionById.get(act.attractionId)
                            : undefined;

                          return (
                            <div key={i} className="ln-timeline-item relative">
                              <p className="ln-tabular text-xs font-medium text-[var(--ln-accent)]">
                                {act.time}
                              </p>
                              {act.attractionId ? (
                                <button
                                  type="button"
                                  onClick={() => onNavigateToAttraction(act.attractionId!)}
                                  className="ln-pressable mt-0.5 text-left"
                                >
                                  <p className="text-sm font-medium text-[var(--ln-accent)] underline decoration-[var(--ln-border-strong)] underline-offset-2">
                                    {act.title} → 地圖
                                  </p>
                                </button>
                              ) : (
                                <p className="mt-0.5 text-sm font-medium">{act.title}</p>
                              )}
                              <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">{act.location}</p>
                              <p className="mt-1 text-sm leading-relaxed text-[var(--ln-ink-secondary)]">
                                {act.description}
                              </p>
                              {attraction?.youtubeVideoId && (
                                <YouTubeEmbed
                                  videoId={attraction.youtubeVideoId}
                                  title={`${attraction.name} 介紹影片`}
                                />
                              )}
                              {act.transport && (
                                <p className="mt-2 text-xs leading-relaxed text-[var(--ln-ink-tertiary)]">
                                  <span className="font-medium text-[var(--ln-ink-secondary)]">交通：</span>
                                  {act.transport}
                                </p>
                              )}
                              {act.costEur !== undefined && act.costEur > 0 && (
                                <p className="mt-1">
                                  <span className="ln-badge-neutral ln-badge ln-tabular">
                                    費用 {formatEur(act.costEur)}
                                  </span>
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
