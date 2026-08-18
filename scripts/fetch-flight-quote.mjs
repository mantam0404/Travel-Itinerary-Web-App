/**
 * Writes public/data/flight-quote.json with HSR reference fare.
 * Guangzhou 2D1N branch — static reference, updated on sync.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public/data/flight-quote.json')

const CNY_TO_HKD = 1.08
const OUTBOUND_DATE = '2026-07-25'
const RETURN_DATE = '2026-07-26'

const DEFAULT_QUOTE = {
  id: 'hsr-hkg-gz-2026-07',
  airline: '高鐵',
  outboundFlight: '待定',
  returnFlight: '待定',
  outboundDate: OUTBOUND_DATE,
  returnDate: RETURN_DATE,
  currency: 'HKD',
  roundTripHkd: 494,
  roundTripEur: Math.round((494 / CNY_TO_HKD) * 100) / 100,
  outboundHkd: 247,
  returnHkd: 247,
  source: 'MTR 高鐵 / 12306',
  sourceUrl: 'https://www.highspeed.mtr.com.hk/en/main/index.html',
  quotedAt: new Date().toISOString().slice(0, 10),
  note: '參考報價（未購票）— 西九龍↔廣州東 二等座',
  fetchedAt: new Date().toISOString(),
  cabinClass: '二等座',
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
