import { useMemo } from 'react';
import type { Attraction, ItineraryDay } from '../data/tripData';
import { formatDateZh } from '../data/tripData';
import { IconChevron } from './icons';
import { TripImage } from './TripImage';
import { YouTubeEmbed } from './YouTubeEmbed';
import { getItineraryDayImage, getItineraryDayImageFallback } from '../utils/itineraryImages';

interface ItineraryDayCardProps {
  day: ItineraryDay;
  attractions: Attraction[];
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigateToAttraction: (attractionId: string) => void;
  id?: string;
}

export function ItineraryDayCard({
  day,
  attractions,
  isDark,
  isOpen,
  onToggle,
  onNavigateToAttraction,
  id,
}: ItineraryDayCardProps) {
  const attractionById = useMemo(
    () => new Map(attractions.map((a) => [a.id, a])),
    [attractions],
  );
  const image = getItineraryDayImage(day, isDark);
  const imageFallback = getItineraryDayImageFallback(day, isDark);
  const highlight = day.activities[0];

  return (
    <div id={id} className="ln-panel overflow-hidden scroll-mt-24">
      <div className="ln-row w-full">
        <button
          type="button"
          onClick={onToggle}
          className="ln-pressable flex min-w-0 flex-1 items-center gap-3.5 text-left"
          aria-expanded={isOpen}
        >
          <div className="ln-thumb h-16 w-20 shrink-0 sm:h-20 sm:w-24">
            <TripImage
              key={image}
              src={image}
              fallback={imageFallback}
              alt={highlight?.title ?? day.city}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="ln-badge-neutral ln-badge">{day.dayLabel}</span>
              <span className="text-xs text-[var(--ln-ink-tertiary)]">
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
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="ln-pressable shrink-0 self-center p-1"
          aria-label={isOpen ? '收合行程' : '展開行程'}
        >
          <span className={`ln-chevron text-[var(--ln-ink-tertiary)] ${isOpen ? 'ln-chevron-open' : ''}`}>
            <IconChevron />
          </span>
        </button>
      </div>

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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
