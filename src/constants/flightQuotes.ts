/** Google Flights reference quote for HKG ↔ LIS (Oct 15–24, 2026) */
export const GOOGLE_FLIGHTS_SEARCH_URL =
  'https://www.google.com/travel/flights/search?q=Flights%20from%20HKG%20to%20LIS%20on%202026-10-15%20through%202026-10-24';

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
  quotedAt: '2026-07-22',
  cabinClass: '經濟艙',
  airline: '阿聯酋航空',
  outboundFlight: 'EK381 · EK191',
  returnFlight: 'EK192 · EK382',
  /** Round-trip reference fare (economy), HKD */
  roundTripHkd: 9800,
  outboundHkd: 4900,
  returnHkd: 4900,
  notes:
    '阿聯酋航空 EK381/EK191 去程、EK192/EK382 回程（迪拜轉機）。參考 Google Flights 報價，實際以已訂機票為準。',
} as const;

export const DEFAULT_FLIGHT_QUOTE: FlightQuote = {
  id: 'hkg-lis-2026-10',
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

export function hkdToBase(amountHkd: number, rate: number): number {
  return Math.round((amountHkd / rate) * 100) / 100;
}

/** @deprecated Use hkdToBase — kept for flight price sync compatibility */
export function hkdToEur(amountHkd: number, rate: number): number {
  return hkdToBase(amountHkd, rate);
}
