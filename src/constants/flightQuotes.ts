/** Google Flights reference quote for HKG ↔ BCN (Oct 15–24, 2026) */
export const GOOGLE_FLIGHTS_SEARCH_URL =
  'https://www.google.com/travel/flights/search?q=Flights%20from%20HKG%20to%20BCN%20on%202026-10-15%20through%202026-10-24';

export const FLIGHT_QUOTE = {
  source: 'Google Flights',
  sourceUrl: GOOGLE_FLIGHTS_SEARCH_URL,
  quotedAt: '2026-07-09',
  cabinClass: 'Economy',
  airline: 'Cathay Pacific',
  /** Round-trip reference fare (direct CX321 + CX318), HKD */
  roundTripHkd: 11180,
  outboundHkd: 5590,
  returnHkd: 5590,
  notes:
    '參考 Google Flights 及 Cathay Pacific 官網同期直航經濟艙報價（10 月旺季）。尚未購票，實際價格會浮動，預訂前請再查詢。',
} as const;

export function hkdToEur(amountHkd: number, rate: number): number {
  return Math.round((amountHkd / rate) * 100) / 100;
}
