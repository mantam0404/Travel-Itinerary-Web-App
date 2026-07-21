import { DEFAULT_FLIGHT_QUOTE, hkdToEur, type FlightQuote } from '../constants/flightQuotes';
import type { TripData } from '../data/tripData';

const QUOTE_URL = `${import.meta.env.BASE_URL}data/flight-quote.json`;
const FLIGHT_EXPENSE_ID = 'flights-cx-roundtrip';

export interface FlightQuoteSyncResult {
  updated: boolean;
  quote: FlightQuote;
  previousHkd?: number;
}

/** Load latest quote from hosted JSON (refreshed by CI / SerpAPI). */
export async function fetchLatestFlightQuote(): Promise<FlightQuote | null> {
  try {
    const res = await fetch(`${QUOTE_URL}?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as FlightQuote;
    if (!data?.roundTripHkd || data.currency !== 'HKD') return null;
    return data;
  } catch {
    return null;
  }
}

/** Apply quote to trip flights + expense line (reference only — status stays 未購票). */
export function applyFlightQuoteToTripData(data: TripData, quote: FlightQuote): TripData {
  const next = structuredClone(data);
  const cabin = quote.cabinClass ?? 'Economy';
  const roundTripEur = hkdToEur(quote.roundTripHkd, next.exchangeRate);
  const outboundEur = hkdToEur(quote.outboundHkd, next.exchangeRate);
  const returnEur = hkdToEur(quote.returnHkd, next.exchangeRate);

  for (const flight of next.flights) {
    if (flight.type === 'departure') {
      flight.quoteHkd = quote.outboundHkd;
      flight.quoteSource = quote.source;
      flight.quoteUrl = quote.sourceUrl;
      flight.quotedAt = quote.quotedAt;
      flight.status = '參考報價（未購票）';
      flight.flightNumber = quote.outboundFlight;
      flight.airline = quote.airline;
      flight.cabinClass = cabin;
    } else if (flight.type === 'return') {
      flight.quoteHkd = quote.returnHkd;
      flight.quoteSource = quote.source;
      flight.quoteUrl = quote.sourceUrl;
      flight.quotedAt = quote.quotedAt;
      flight.status = '參考報價（未購票）';
      flight.flightNumber = quote.returnFlight;
      flight.airline = quote.airline;
      flight.cabinClass = cabin;
    }
  }

  const idx = next.expenses.findIndex((e) => e.id === FLIGHT_EXPENSE_ID);
  if (idx >= 0) {
    next.expenses[idx] = {
      ...next.expenses[idx],
      amountEur: roundTripEur,
      amountHkd: quote.roundTripHkd,
      quotedAt: quote.quotedAt,
      sourceUrl: quote.sourceUrl,
      breakdown: [
        {
          label: `${quote.outboundFlight} 西九龍→廣州南（${quote.outboundDate?.slice(5) ?? ''}）${cabin} 參考價`,
          amountEur: outboundEur,
        },
        {
          label: `${quote.returnFlight} 廣州南→西九龍（${quote.returnDate?.slice(5) ?? ''}）${cabin} 參考價`,
          amountEur: returnEur,
        },
      ],
      notes: quote.note,
    };
  }

  return next;
}

/** Fetch + merge quote; falls back to bundled default on failure. */
export async function syncFlightPrices(
  data: TripData,
): Promise<{ data: TripData; result: FlightQuoteSyncResult }> {
  const existing = data.expenses.find((e) => e.id === FLIGHT_EXPENSE_ID);
  const previousHkd = existing?.amountHkd;
  const departure = data.flights.find((f) => f.type === 'departure');

  const remote = await fetchLatestFlightQuote();
  const quote = remote ?? DEFAULT_FLIGHT_QUOTE;

  const updated =
    remote != null &&
    (previousHkd !== quote.roundTripHkd || departure?.quotedAt !== quote.quotedAt);

  const nextData = applyFlightQuoteToTripData(data, quote);
  return { data: nextData, result: { updated, quote, previousHkd } };
}
