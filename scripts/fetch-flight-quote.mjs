/**
 * Fetches latest Cathay HKG↔BCN round-trip quote via SerpAPI Google Flights.
 * Writes public/data/flight-quote.json for the PWA to load on sync.
 *
 * Requires SERPAPI_KEY in environment (optional at build — keeps existing JSON).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public/data/flight-quote.json')

const HKD_TO_EUR = 8.45
const OUTBOUND_DATE = '2026-10-15'
const RETURN_DATE = '2026-10-24'
const OUTBOUND_FLIGHT = 'CX321'
const RETURN_FLIGHT = 'CX318'

const DEFAULT_QUOTE = {
  id: 'cx-hkg-bcn-2026-10',
  airline: 'Cathay Pacific',
  outboundFlight: OUTBOUND_FLIGHT,
  returnFlight: RETURN_FLIGHT,
  outboundDate: OUTBOUND_DATE,
  returnDate: RETURN_DATE,
  currency: 'HKD',
  roundTripHkd: 11180,
  roundTripEur: Math.round((11180 / HKD_TO_EUR) * 100) / 100,
  outboundHkd: 5590,
  returnHkd: 5590,
  source: 'Google Flights',
  sourceUrl:
    'https://www.google.com/travel/flights?q=Flights%20to%20Barcelona%20from%20Hong%20Kong%20on%202026-10-15%20through%202026-10-24',
  quotedAt: '2026-07-09',
  note: '參考報價（未購票）— 以 Cathay Pacific 直飛為準',
  fetchedAt: new Date().toISOString(),
}

function pickCathayRoundTrip(flights, departureToken) {
  const preferred = flights.find(
    (f) =>
      f.flights?.[0]?.flight_number === OUTBOUND_FLIGHT &&
      f.type === 'Round trip'
  )
  if (preferred) return { flight: preferred, departureToken }

  const cathay = flights.find(
    (f) =>
      f.flights?.[0]?.airline === 'Cathay Pacific' ||
      f.flights?.[0]?.flight_number?.startsWith('CX')
  )
  return { flight: cathay ?? flights[0], departureToken }
}

async function serpFetch(params) {
  const key = process.env.SERPAPI_KEY
  if (!key) return null

  const url = new URL('https://serpapi.com/search.json')
  url.searchParams.set('engine', 'google_flights')
  url.searchParams.set('api_key', key)
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, String(v))
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${await res.text()}`)
  return res.json()
}

async function fetchFromSerpApi() {
  const outbound = await serpFetch({
    departure_id: 'HKG',
    arrival_id: 'BCN',
    outbound_date: OUTBOUND_DATE,
    return_date: RETURN_DATE,
    currency: 'HKD',
    hl: 'zh-TW',
    type: '1',
  })
  if (!outbound?.best_flights?.length) return null

  const { flight: ob, departureToken } = pickCathayRoundTrip(
    outbound.best_flights,
    outbound.search_metadata?.google_flights_url
  )
  if (!ob) return null

  let totalHkd = ob.price
  let returnLeg = null

  if (ob.departure_token) {
    const inbound = await serpFetch({
      departure_id: 'HKG',
      arrival_id: 'BCN',
      outbound_date: OUTBOUND_DATE,
      return_date: RETURN_DATE,
      currency: 'HKD',
      hl: 'zh-TW',
      departure_token: ob.departure_token,
    })
    const ret = inbound?.best_flights?.find(
      (f) => f.flights?.[0]?.flight_number === RETURN_FLIGHT
    ) ?? inbound?.best_flights?.[0]
    if (ret?.price != null) {
      totalHkd = ret.price
      returnLeg = ret.flights?.[0]
    }
  }

  const outboundLeg = ob.flights?.[0]
  const half = Math.round(totalHkd / 2)

  return {
    id: 'cx-hkg-bcn-2026-10',
    airline: outboundLeg?.airline ?? 'Cathay Pacific',
    outboundFlight: outboundLeg?.flight_number ?? OUTBOUND_FLIGHT,
    returnFlight: returnLeg?.flight_number ?? RETURN_FLIGHT,
    outboundDate: OUTBOUND_DATE,
    returnDate: RETURN_DATE,
    currency: 'HKD',
    roundTripHkd: totalHkd,
    roundTripEur: Math.round((totalHkd / HKD_TO_EUR) * 100) / 100,
    outboundHkd: half,
    returnHkd: totalHkd - half,
    source: 'Google Flights',
    sourceUrl:
      departureToken ??
      `https://www.google.com/travel/flights?q=Flights%20to%20Barcelona%20from%20Hong%20Kong%20on%20${OUTBOUND_DATE}%20through%20${RETURN_DATE}`,
    quotedAt: new Date().toISOString().slice(0, 10),
    note: '參考報價（未購票）— 同步時自 Google Flights 更新',
    fetchedAt: new Date().toISOString(),
  }
}

async function main() {
  let quote = DEFAULT_QUOTE

  try {
    const live = await fetchFromSerpApi()
    if (live) {
      quote = live
      console.log(`✓ SerpAPI quote: HK$${quote.roundTripHkd}`)
    } else if (process.env.SERPAPI_KEY) {
      console.warn('⚠ SerpAPI returned no flights — keeping defaults')
    } else {
      console.log('ℹ No SERPAPI_KEY — writing default reference quote')
    }
  } catch (err) {
    console.warn('⚠ SerpAPI fetch failed:', err.message)
    try {
      const prev = JSON.parse(await readFile(OUT, 'utf8'))
      quote = { ...prev, fetchedAt: new Date().toISOString() }
    } catch {
      /* use DEFAULT_QUOTE */
    }
  }

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(quote, null, 2) + '\n', 'utf8')
  console.log(`→ ${OUT}`)
}

main()
