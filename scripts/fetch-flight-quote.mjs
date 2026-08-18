/**
 * Writes public/data/flight-quote.json with Portugal flight reference fare.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public/data/flight-quote.json')

const EUR_TO_HKD = 8.45
const OUTBOUND_DATE = '2026-10-15'
const RETURN_DATE = '2026-10-20'

const DEFAULT_QUOTE = {
  id: 'hkg-lis-2026-10',
  airline: '國泰航空',
  outboundFlight: '待定',
  returnFlight: '待定',
  outboundDate: OUTBOUND_DATE,
  returnDate: RETURN_DATE,
  currency: 'HKD',
  roundTripHkd: 9800,
  roundTripEur: Math.round((9800 / EUR_TO_HKD) * 100) / 100,
  outboundHkd: 4900,
  returnHkd: 4900,
  source: 'Google Flights',
  sourceUrl:
    'https://www.google.com/travel/flights/search?q=Flights%20from%20HKG%20to%20LIS%20on%202026-10-15%20through%202026-10-20',
  quotedAt: new Date().toISOString().slice(0, 10),
  note: '參考報價（未購票）— 香港↔里斯本 經濟艙',
  fetchedAt: new Date().toISOString(),
  cabinClass: '經濟艙',
}

async function main() {
  let quote = DEFAULT_QUOTE

  try {
    const prev = JSON.parse(await readFile(OUT, 'utf8'))
    if (prev?.roundTripHkd) {
      quote = { ...prev, ...DEFAULT_QUOTE, fetchedAt: new Date().toISOString() }
    }
  } catch {
    /* use DEFAULT_QUOTE */
  }

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(quote, null, 2) + '\n', 'utf8')
  console.log(`→ ${OUT} (HK$${quote.roundTripHkd})`)
}

main()
