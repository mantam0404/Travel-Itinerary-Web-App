/** Reference fare for Hong Kong West Kowloon ↔ Guangzhou South HSR (Nov 6–9, 2026) */
export const GOOGLE_FLIGHTS_SEARCH_URL =
  'https://www.highspeed.mtr.com.hk/en/main/index.html';

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
  source: 'MTR 高鐵 / 12306',
  sourceUrl: GOOGLE_FLIGHTS_SEARCH_URL,
  quotedAt: '2026-07-21',
  cabinClass: '二等座',
  airline: '廣深港高鐵',
  outboundFlight: 'G80',
  returnFlight: 'G653',
  /** Round-trip reference fare (second class), HKD */
  roundTripHkd: 494,
  outboundHkd: 247,
  returnHkd: 247,
  notes:
    '參考 MTR 高鐵及 12306 同期二等座票價（廣州南↔西九龍）。尚未購票，實際價格會浮動，預訂前請再查詢。',
} as const;

export const DEFAULT_FLIGHT_QUOTE: FlightQuote = {
  id: 'hsr-hkg-can-2026-11',
  airline: FLIGHT_QUOTE.airline,
  outboundFlight: FLIGHT_QUOTE.outboundFlight,
  returnFlight: FLIGHT_QUOTE.returnFlight,
  outboundDate: '2026-11-06',
  returnDate: '2026-11-09',
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
