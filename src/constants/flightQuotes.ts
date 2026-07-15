/** Google Flights reference quote for HKG ↔ BCN (Oct 15–24, 2026) */
export const GOOGLE_FLIGHTS_SEARCH_URL =
  'https://www.google.com/travel/flights/search?q=Flights%20from%20HKG%20to%20BCN%20on%202026-10-15%20through%202026-10-24';

export interface FlightQuote {
  id?: string;
  airline: string;
  outboundFlight: string;
  returnFlight: string;
  outboundDate?: string;
  returnDate?: string;
  currency: string;
  roundTripHkd: number;
  roundTripEur?: number;
  outboundHkd: number;
  returnHkd: number;
  source: string;
  sourceUrl: string;
  quotedAt: string;
  note?: string;
  fetchedAt?: string;
  cabinClass?: string;
}

export const FLIGHT_QUOTE = {
  source: 'Google Flights',
  sourceUrl: GOOGLE_FLIGHTS_SEARCH_URL,
  quotedAt: '2026-07-09',
  cabinClass: 'Economy',
  airline: 'Cathay Pacific',
  outboundFlight: 'CX321',
  returnFlight: 'CX318',
  /** Round-trip reference fare (direct CX321 + CX318), HKD */
  roundTripHkd: 11180,
  outboundHkd: 5590,
  returnHkd: 5590,
  notes:
    '參考 Google Flights 及 Cathay Pacific 官網同期直航經濟艙報價（10 月旺季）。尚未購票，實際價格會浮動，預訂前請再查詢。',
} as const;

export const DEFAULT_FLIGHT_QUOTE: FlightQuote = {
  id: 'cx-hkg-bcn-2026-10',
  airline: FLIGHT_QUOTE.airline,
  outboundFlight: FLIGHT_QUOTE.outboundFlight,
  returnFlight: FLIGHT_QUOTE.returnFlight,
  outboundDate: '2026-10-15',
  returnDate: '2026-10-24',
  currency: 'HKD',
  roundTripHkd: FLIGHT_QUOTE.roundTripHkd,
  outboundHkd: FLIGHT_QUOTE.outboundHkd,
  returnHkd: FLIGHT_QUOTE.returnHkd,
  source: FLIGHT_QUOTE.source,
  sourceUrl: FLIGHT_QUOTE.sourceUrl,
  quotedAt: FLIGHT_QUOTE.quotedAt,
  cabinClass: FLIGHT_QUOTE.cabinClass,
  note: FLIGHT_QUOTE.notes,
};

export function hkdToEur(amountHkd: number, rate: number): number {
  return Math.round((amountHkd / rate) * 100) / 100;
}
