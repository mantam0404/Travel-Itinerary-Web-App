import { DEFAULT_FLIGHT_QUOTE, hkdToBase, type FlightQuote } from '../constants/flightQuotes';
import type { TripData } from '../data/tripData';

const QUOTE_URL = `${import.meta.env.BASE_URL}data/flight-quote.json`;

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

function applyFlightQuoteToFlights(data: TripData, quote: FlightQuote): TripData {
  const next = structuredClone(data);
  const cabin = quote.cabinClass ?? 'Economy';
  const airline = quote.airline?.trim();
  const outboundFlight = quote.outboundFlight?.trim();
  const returnFlight = quote.returnFlight?.trim();

  for (const flight of next.flights) {
    if (flight.type === 'departure') {
      flight.quoteHkd = quote.outboundHkd;
      flight.quoteSource = quote.source;
      flight.quoteUrl = quote.sourceUrl;
      flight.quotedAt = quote.quotedAt;
      flight.cabinClass = cabin;
      if (airline) flight.airline = airline;
      if (outboundFlight && outboundFlight !== '待定') flight.flightNumber = outboundFlight;
      if (flight.status !== '已訂位') flight.status = '參考報價（未購票）';
    } else if (flight.type === 'return') {
      flight.quoteHkd = quote.returnHkd;
      flight.quoteSource = quote.source;
      flight.quoteUrl = quote.sourceUrl;
      flight.quotedAt = quote.quotedAt;
      flight.cabinClass = cabin;
      if (airline) flight.airline = airline;
      if (returnFlight && returnFlight !== '待定') flight.flightNumber = returnFlight;
      if (flight.status !== '已訂位') flight.status = '參考報價（未購票）';
    }
  }

  return next;
}

/** Sync flight quote into the flights expense line item. */
export function applyFlightQuoteToExpenses(data: TripData, quote: FlightQuote): TripData {
  const next = structuredClone(data);
  const flightExpense = next.expenses?.find((e) => e.id === 'flights-emirates');
  if (!flightExpense) return next;

  const outEur = hkdToBase(quote.outboundHkd, next.exchangeRate);
  const retEur = hkdToBase(quote.returnHkd, next.exchangeRate);
  const cabin = quote.cabinClass ?? '經濟艙';

  flightExpense.amountEur = hkdToBase(quote.roundTripHkd, next.exchangeRate);
  flightExpense.amountHkd = quote.roundTripHkd;
  flightExpense.quotedAt = quote.quotedAt;
  flightExpense.sourceUrl = quote.sourceUrl;
  flightExpense.breakdown = [
    {
      label: `${quote.outboundFlight} 香港→里斯本（10/15）${cabin}`,
      amountEur: outEur,
    },
    {
      label: `${quote.returnFlight} 里斯本→香港（10/24）${cabin}`,
      amountEur: retEur,
    },
  ];

  return next;
}

/** Apply quote to trip flights and expense row. */
export function applyFlightQuoteToTripData(data: TripData, quote: FlightQuote): TripData {
  let next = applyFlightQuoteToFlights(data, quote);
  next = applyFlightQuoteToExpenses(next, quote);
  return next;
}

/** Fetch + merge quote; falls back to bundled default on failure. */
export async function syncFlightPrices(
  data: TripData,
): Promise<{ data: TripData; result: FlightQuoteSyncResult }> {
  const departure = data.flights.find((f) => f.type === 'departure');
  const previousHkd = departure?.quoteHkd;

  const remote = await fetchLatestFlightQuote();
  const quote = remote ?? DEFAULT_FLIGHT_QUOTE;

  const updated =
    remote != null &&
    (previousHkd !== quote.roundTripHkd || departure?.quotedAt !== quote.quotedAt);

  const nextData = applyFlightQuoteToTripData(data, quote);
  return { data: nextData, result: { updated, quote, previousHkd } };
}
