import type { FlightInfo } from '../data/tripData';
import { formatDateZh } from '../data/tripData';

interface FlightDashboardProps {
  flights: FlightInfo[];
}

function FlightCard({ flight }: { flight: FlightInfo }) {
  const isDeparture = flight.type === 'departure';
  const depCode = isDeparture ? 'HKG' : 'BCN';
  const arrCode = isDeparture ? 'BCN' : 'HKG';

  return (
    <div className="glass-card pastel-gradient p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-coral/20 px-3 py-1 text-xs font-medium text-terracotta dark:text-coral">
          {isDeparture ? '去程' : '回程'}
        </span>
        <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-medium text-sage">
          {flight.status}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-midnight/60 dark:text-cream/60">{formatDateZh(flight.date)}</p>
        <h3 className="mt-1 text-xl font-bold">
          {flight.airline} <span className="text-terracotta dark:text-coral">{flight.flightNumber}</span>
        </h3>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.departureTime}</p>
          <p className="mt-1 text-xs text-midnight/50 dark:text-cream/50">{depCode}</p>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <p className="text-xs text-midnight/40 dark:text-cream/40">{flight.duration}</p>
          <div className="my-1 flex w-full items-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-coral to-transparent" />
            <span className="mx-2 text-coral">✈</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-coral to-transparent" />
          </div>
          <p className="text-xs font-medium text-lavender">{flight.route}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.arrivalTime}</p>
          <p className="mt-1 text-xs text-midnight/50 dark:text-cream/50">{arrCode}</p>
        </div>
      </div>

      <div className="space-y-1 border-t border-midnight/5 pt-3 text-sm dark:border-cream/5">
        <p>
          <span className="text-midnight/50 dark:text-cream/50">出發：</span>
          {flight.departureAirport}
        </p>
        <p>
          <span className="text-midnight/50 dark:text-cream/50">抵達：</span>
          {flight.arrivalAirport}
        </p>
      </div>
    </div>
  );
}

export function FlightDashboard({ flights }: FlightDashboardProps) {
  return (
    <section id="flights" className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">✈️</span>
        <h2 className="text-xl font-bold">航班資訊／儀表板</h2>
      </div>
      <p className="text-sm text-midnight/60 dark:text-cream/60">
        目的地：Spain · 2026年10月15日 – 10月24日
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {flights.map((f) => (
          <FlightCard key={f.id} flight={f} />
        ))}
      </div>
    </section>
  );
}
