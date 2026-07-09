import { FLIGHT_QUOTE, hkdToEur } from '../constants/flightQuotes';

export interface FlightInfo {
  id: string;
  type: 'departure' | 'return';
  date: string;
  airline: string;
  flightNumber: string;
  route: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: string;
  cabinClass?: string;
  quoteHkd?: number;
  quoteSource?: string;
  quoteUrl?: string;
  quotedAt?: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: string;
  openingHours?: string;
  ticketPriceEur?: number;
  tips?: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  location: string;
  description: string;
  attractionId?: string;
  transport?: string;
  costEur?: number;
}

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  city: string;
  activities: ItineraryActivity[];
}

export interface ExpenseItem {
  id: string;
  category: 'accommodation' | 'transportation' | 'tickets' | 'flights';
  name: string;
  date: string;
  amountEur: number;
  amountHkd?: number;
  breakdown: { label: string; amountEur: number }[];
  notes?: string;
  sourceUrl?: string;
  quotedAt?: string;
}

export interface TripData {
  version: number;
  lastUpdated: string;
  destination: string;
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  attractions: Attraction[];
  expenses: ExpenseItem[];
  exchangeRate: number;
}

export const EUR_TO_HKD = 8.45;

const flightQuoteEur = hkdToEur(FLIGHT_QUOTE.roundTripHkd, EUR_TO_HKD);
const outboundQuoteEur = hkdToEur(FLIGHT_QUOTE.outboundHkd, EUR_TO_HKD);
const returnQuoteEur = hkdToEur(FLIGHT_QUOTE.returnHkd, EUR_TO_HKD);

export const defaultTripData: TripData = {
  version: 4,
  lastUpdated: new Date().toISOString(),
  destination: 'Barcelona',
  exchangeRate: EUR_TO_HKD,
  flights: [
    {
      id: 'cx321',
      type: 'departure',
      date: '2026-10-15',
      airline: 'Cathay Pacific',
      flightNumber: 'CX321',
      route: 'HKG → BCN',
      departureAirport: 'Hong Kong International Airport (HKG)',
      arrivalAirport: 'Barcelona El Prat Airport (BCN)',
      departureTime: '00:25',
      arrivalTime: '08:30+1',
      duration: '14h 05m',
      status: '參考報價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'cx318',
      type: 'return',
      date: '2026-10-24',
      airline: 'Cathay Pacific',
      flightNumber: 'CX318',
      route: 'BCN → HKG',
      departureAirport: 'Barcelona El Prat Airport (BCN)',
      arrivalAirport: 'Hong Kong International Airport (HKG)',
      departureTime: '13:00',
      arrivalTime: '07:00+1',
      duration: '12h 00m',
      status: '參考報價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.returnHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
  ],
  attractions: [
    {
      id: 'sagrada-familia',
      name: 'Sagrada Família',
      description: 'Antoni Gaudí 的未完成傑作，巴塞隆納最具代表性的地標教堂。',
      lat: 41.4036,
      lng: 2.1744,
      category: '建築',
      openingHours: '09:00 – 18:00',
      ticketPriceEur: 26,
      tips: '建議提前網上預約門票，避開正午人潮。',
    },
    {
      id: 'park-guell',
      name: 'Park Güell',
      description: '高第設計的夢幻花園，彩色馬賽克長椅與城市全景盡收眼底。',
      lat: 41.4145,
      lng: 2.1527,
      category: '公園',
      openingHours: '08:00 – 21:30',
      ticketPriceEur: 10,
      tips: '紀念區需購票，免費區域亦可欣賞部分景觀。',
    },
    {
      id: 'la-rambla',
      name: 'La Rambla',
      description: '巴塞隆納最著名的步行街，連接 Plaça de Catalunya 與海港。',
      lat: 41.3809,
      lng: 2.1734,
      category: '街道',
      openingHours: '全天開放',
      tips: '注意保管隨身物品，避免在路邊餐廳被多收費用。',
    },
    {
      id: 'gothic-quarter',
      name: 'Gothic Quarter (Barri Gòtic)',
      description: '中世紀哥德式老城區，迷宮般的小巷藏著無數驚喜。',
      lat: 41.3834,
      lng: 2.1761,
      category: '歷史區',
      openingHours: '全天開放',
      tips: '黃昏時分氣氛最佳，適合漫步攝影。',
    },
    {
      id: 'casa-batllo',
      name: 'Casa Batlló',
      description: '高第改造的奇幻住宅，外牆如龍鱗般閃耀，內部設計令人驚嘆。',
      lat: 41.3916,
      lng: 2.1649,
      category: '建築',
      openingHours: '09:00 – 21:00',
      ticketPriceEur: 35,
    },
    {
      id: 'montjuic',
      name: 'Montjuïc',
      description: '俯瞰巴塞隆納的山丘，有 Magic Fountain、城堡及奧運場館遺跡。',
      lat: 41.3634,
      lng: 2.1647,
      category: '景觀',
      openingHours: '全天開放',
      tips: '週五、六晚間可觀賞 Magic Fountain 燈光秀。',
    },
    {
      id: 'boqueria',
      name: 'La Boqueria Market',
      description: '歐洲最著名的室內市場之一，新鮮海產、火腿與果汁應有盡有。',
      lat: 41.3816,
      lng: 2.1719,
      category: '市場',
      openingHours: '08:00 – 20:30',
      tips: '建議上午前往，食材最新鮮。',
    },
    {
      id: 'barceloneta',
      name: 'Barceloneta Beach',
      description: '市區最近的海灘，適合曬太陽、游泳及享用海鮮料理。',
      lat: 41.3784,
      lng: 2.1895,
      category: '海灘',
      openingHours: '全天開放',
    },
    {
      id: 'casa-mila',
      name: 'Casa Milà (La Pedrera)',
      description: '高第最後的民宅作品，波浪形石灰岩外牆與奇幻屋頂煙囪。',
      lat: 41.3954,
      lng: 2.1619,
      category: '建築',
      openingHours: '09:00 – 20:30',
      ticketPriceEur: 28,
      tips: '夜間燈光導覽氣氛極佳，建議提前購票。',
    },
    {
      id: 'picasso-museum',
      name: 'Picasso Museum',
      description: '收藏畢卡索早期作品，位於 El Born 五座中世紀宮殿內。',
      lat: 41.3851,
      lng: 2.1807,
      category: '博物館',
      openingHours: '10:00 – 20:00',
      ticketPriceEur: 14,
      tips: '週日 16:00 後免費入場，建議平日前往避開人潮。',
    },
    {
      id: 'el-born',
      name: 'El Born District',
      description: '文青氣息濃厚的街區，精品小店、小酒館與哥德式教堂交織。',
      lat: 41.3855,
      lng: 2.1822,
      category: '歷史區',
      openingHours: '全天開放',
      tips: '適合傍晚漫步，順道造訪 Santa Maria del Mar。',
    },
    {
      id: 'tibidabo',
      name: 'Tibidabo',
      description: '巴塞隆納最高點，百年遊樂園與 Sagrat Cor 教堂俯瞰全城。',
      lat: 41.4225,
      lng: 2.1187,
      category: '景觀',
      openingHours: '11:00 – 19:00',
      ticketPriceEur: 35,
      tips: '搭乘 Tramvia Blau 與纜車上山，日落時分景色最佳。',
    },
    {
      id: 'mnac',
      name: "Museu Nacional d'Art de Catalunya (MNAC)",
      description: '加泰隆尼亞國家藝術博物館，收藏羅馬式壁畫至現代藝術珍品。',
      lat: 41.3684,
      lng: 2.1535,
      category: '美術館',
      openingHours: '10:00 – 18:00',
      ticketPriceEur: 12,
      tips: '週六 15:00 後及每月第一週日免費，建議預留 2–3 小時。',
    },
    {
      id: 'joan-miro',
      name: 'Fundació Joan Miró',
      description: '米羅基金會美術館，展示 Joan Miró 繪畫、雕塑與陶藝作品。',
      lat: 41.3687,
      lng: 2.1599,
      category: '美術館',
      openingHours: '10:00 – 18:00',
      ticketPriceEur: 13,
      tips: '位於 Montjuïc，可與 MNAC 安排同日參觀。',
    },
    {
      id: 'macba',
      name: 'MACBA',
      description: '巴塞隆納當代美術館，前衛藝術與 Raval 區文化地標。',
      lat: 41.3833,
      lng: 2.1667,
      category: '美術館',
      openingHours: '11:00 – 19:30',
      ticketPriceEur: 12,
      tips: '週五 16:00–20:00 免費入場。',
    },
    {
      id: 'camp-nou',
      name: 'Spotify Camp Nou',
      description: 'FC Barcelona 主場，Immersive Tour 可參觀球場、更衣室與博物館。',
      lat: 41.3809,
      lng: 2.1228,
      category: '體育場館',
      openingHours: '09:30 – 19:00',
      ticketPriceEur: 35,
      tips: '建議提前網上預約 Immersive Tour 時段。',
    },
  ],
  itinerary: [
    {
      date: '2026-10-15',
      dayLabel: '第 1 天',
      city: 'Barcelona',
      activities: [
        {
          time: '00:25',
          title: '出發航班 CX321',
          location: 'Hong Kong International Airport (HKG)',
          description: '搭乘 Cathay Pacific CX321 前往 Barcelona',
          transport: '自行前往 HKG',
          costEur: 0,
        },
      ],
    },
    {
      date: '2026-10-16',
      dayLabel: '第 2 天',
      city: 'Barcelona',
      activities: [
        {
          time: '07:15',
          title: '抵達 Barcelona',
          location: 'Barcelona El Prat Airport (BCN) T1',
          description: '入境、領行李',
          transport: '—',
          costEur: 0,
        },
        {
          time: '08:30',
          title: '前往市區',
          location: 'BCN → Plaça Catalunya',
          description: '搭乘 Aerobús A1 前往市中心（約 35 分鐘）',
          transport: 'Aerobús A1',
          costEur: 7,
        },
        {
          time: '08:45',
          title: '步行至酒店',
          location: 'Plaça Catalunya → Hotel Barcelona Center',
          description: '辦理入住／寄放行李',
          transport: '步行（約 15 分鐘）',
          costEur: 0,
        },
        {
          time: '14:00',
          title: '漫步 La Rambla',
          location: 'La Rambla',
          description: '熟悉市區環境，品嚐第一杯西班牙咖啡',
          attractionId: 'la-rambla',
          transport: '地鐵 L3 Verdaguer → Liceu（1 站）',
          costEur: 1.22,
        },
        {
          time: '17:00',
          title: '探索 Gothic Quarter',
          location: 'Gothic Quarter (Barri Gòtic)',
          description: '穿梭中世紀小巷，參觀 Barcelona Cathedral',
          attractionId: 'gothic-quarter',
          transport: '步行（約 5 分鐘）',
          costEur: 0,
        },
        {
          time: '19:30',
          title: '返回酒店',
          location: 'Hotel Barcelona Center',
          description: '步行返回休息',
          transport: '步行（約 20 分鐘）',
          costEur: 0,
        },
      ],
    },
    {
      date: '2026-10-17',
      dayLabel: '第 3 天',
      city: 'Barcelona',
      activities: [
        {
          time: '09:30',
          title: '參觀 Sagrada Família',
          location: 'Sagrada Família',
          description: '預約時段入場，細賞高第建築奇蹟（含語音導覽）',
          attractionId: 'sagrada-familia',
          transport: '地鐵 L5 Verdaguer → Sagrada Família（2 站）',
          costEur: 27.22,
        },
        {
          time: '13:00',
          title: '午餐',
          location: 'Eixample 區',
          description: 'Sagrada 周邊用餐',
          transport: '步行（約 15 分鐘）',
          costEur: 0,
        },
        {
          time: '14:30',
          title: '參觀 Casa Batlló',
          location: 'Casa Batlló',
          description: '內部導覽，Blue 票含語音導覽',
          attractionId: 'casa-batllo',
          transport: '步行沿 Passeig de Gràcia（約 20 分鐘）',
          costEur: 35,
        },
        {
          time: '16:30',
          title: 'La Boqueria Market',
          location: 'La Boqueria Market',
          description: '品嚐新鮮海鮮與 Jamón ibérico',
          attractionId: 'boqueria',
          transport: '地鐵 L3 Passeig de Gràcia → Liceu（2 站）',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-18',
      dayLabel: '第 4 天',
      city: 'Barcelona',
      activities: [
        {
          time: '10:00',
          title: 'Park Güell 紀念區',
          location: 'Park Güell',
          description: '彩色馬賽克花園與城市全景攝影',
          attractionId: 'park-guell',
          transport: '地鐵 L3 Verdaguer → Vallcarca（4 站）→ 步行 uphill（15 分鐘）',
          costEur: 11.22,
        },
        {
          time: '15:00',
          title: 'Barceloneta Beach',
          location: 'Barceloneta Beach',
          description: '海灘休憩，享用 Paella 海鮮飯',
          attractionId: 'barceloneta',
          transport: '地鐵 L3 → L4 換乘 → Barceloneta（約 25 分鐘）',
          costEur: 1.22,
        },
        {
          time: '20:30',
          title: '返回酒店',
          location: 'Hotel Barcelona Center',
          description: '地鐵返回',
          transport: '地鐵 L4 Barceloneta → Verdaguer（4 站）',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-19',
      dayLabel: '第 5 天',
      city: 'Barcelona',
      activities: [
        {
          time: '10:00',
          title: 'MNAC 加泰隆尼亞國家藝術博物館',
          location: "Museu Nacional d'Art de Catalunya (MNAC)",
          description: '欣賞羅馬式壁畫、哥特藝術與現代主義藏品',
          attractionId: 'mnac',
          transport: '地鐵 L3 Verdaguer → Espanya（3 站）→ 步行＋電梯上山',
          costEur: 13.22,
        },
        {
          time: '14:30',
          title: 'Fundació Joan Miró',
          location: 'Fundació Joan Miró',
          description: '米羅繪畫、雕塑與陶藝作品',
          attractionId: 'joan-miro',
          transport: 'Montjuïc 巴士 150 或纜車 Funicular de Montjuïc',
          costEur: 14.22,
        },
        {
          time: '20:00',
          title: 'Magic Fountain 燈光秀',
          location: 'Magic Fountain of Montjuïc',
          description: '免費欣賞音樂噴泉表演',
          attractionId: 'montjuic',
          transport: '步行至噴泉廣場',
          costEur: 0,
        },
        {
          time: '21:30',
          title: '返回酒店',
          location: 'Hotel Barcelona Center',
          description: '地鐵返回',
          transport: '地鐵 L1/L3 Espanya → Verdaguer',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-20',
      dayLabel: '第 6 天',
      city: 'Barcelona',
      activities: [
        {
          time: '10:00',
          title: 'Casa Milà (La Pedrera)',
          location: 'Casa Milà (La Pedrera)',
          description: '參觀屋頂煙囪與高第建築展（含屋頂）',
          attractionId: 'casa-mila',
          transport: '步行（約 10 分鐘）',
          costEur: 28,
        },
        {
          time: '15:00',
          title: 'Picasso Museum',
          location: 'Picasso Museum',
          description: '畢卡索藍色時期與巴塞隆納時期作品',
          attractionId: 'picasso-museum',
          transport: '地鐵 L3 Diagonal → Liceu → 步行至 El Born（10 分鐘）',
          costEur: 15.22,
        },
        {
          time: '17:30',
          title: 'El Born 街區漫步',
          location: 'El Born District',
          description: '造訪 Santa Maria del Mar，傍晚漫步',
          attractionId: 'el-born',
          transport: '步行',
          costEur: 0,
        },
        {
          time: '19:30',
          title: '返回酒店',
          location: 'Hotel Barcelona Center',
          description: '地鐵返回',
          transport: '地鐵 L4 Jaume I → Verdaguer（2 站）',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-21',
      dayLabel: '第 7 天',
      city: 'Barcelona',
      activities: [
        {
          time: '10:00',
          title: 'Spotify Camp Nou 沉浸式導覽',
          location: 'Spotify Camp Nou (FC Barcelona)',
          description: '參觀球場、更衣室、球隊博物館（Immersive Tour）',
          attractionId: 'camp-nou',
          transport: '地鐵 L3 Verdaguer → Les Corts（3 站）→ 步行（5 分鐘）',
          costEur: 36.22,
        },
        {
          time: '15:30',
          title: 'MACBA 當代美術館',
          location: 'MACBA',
          description: '前衛藝術與當代展覽',
          attractionId: 'macba',
          transport: '地鐵 L3 Les Corts → Liceu → 步行（8 分鐘）',
          costEur: 13.22,
        },
        {
          time: '18:00',
          title: '伴手禮採買',
          location: 'La Rambla / La Boqueria',
          description: '蘭布拉大道與波蓮市場補買紀念品',
          attractionId: 'la-rambla',
          transport: '步行（約 10 分鐘）',
          costEur: 0,
        },
      ],
    },
    {
      date: '2026-10-22',
      dayLabel: '第 8 天',
      city: 'Barcelona',
      activities: [
        {
          time: '11:00',
          title: 'Tibidabo 山城',
          location: 'Tibidabo',
          description: 'Tramvia Blau 藍色電車上山，遊樂園一日通行',
          attractionId: 'tibidabo',
          transport: '地鐵 L7 Diagonal → Av. Tibidabo → Tramvia Blau → Funicular',
          costEur: 51.02,
        },
        {
          time: '15:00',
          title: 'Gràcia 街區午餐',
          location: 'Gràcia, Barcelona',
          description: '獨立小店與露天廣場',
          transport: '地鐵返回至 Fontana 站',
          costEur: 1.22,
        },
        {
          time: '18:00',
          title: 'Passeig de Gràcia 採買',
          location: 'Passeig de Gràcia',
          description: '選購伴手禮，Tapas 告別晚餐',
          transport: '地鐵 L3 Fontana → Diagonal',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-23',
      dayLabel: '第 9 天',
      city: 'Barcelona',
      activities: [
        {
          time: '10:00',
          title: '悠閒早午餐',
          location: 'El Born District',
          description: '最後一日漫遊，重訪喜愛景點',
          attractionId: 'el-born',
          transport: '地鐵或步行（視選擇）',
          costEur: 1.22,
        },
        {
          time: '17:00',
          title: '整理行李',
          location: 'Hotel Barcelona Center',
          description: '回酒店收拾，準備翌日返程',
          transport: '步行／地鐵返回',
          costEur: 1.22,
        },
      ],
    },
    {
      date: '2026-10-24',
      dayLabel: '第 10 天',
      city: 'Barcelona',
      activities: [
        {
          time: '08:30',
          title: '前往機場',
          location: 'Hotel → Barcelona El Prat Airport (BCN)',
          description: '退房後搭乘計程車前往機場（約 25 分鐘）',
          transport: '計程車',
          costEur: 35,
        },
        {
          time: '13:00',
          title: '返程航班 CX318',
          location: 'Barcelona El Prat Airport (BCN)',
          description: '搭乘 Cathay Pacific CX318 返回 Hong Kong',
          transport: '—',
          costEur: 0,
        },
      ],
    },
  ],
  expenses: [
    {
      id: 'flights-cx-roundtrip',
      category: 'flights',
      name: '來回機票 CX321 / CX318',
      date: '2026-10-15',
      amountEur: flightQuoteEur,
      amountHkd: FLIGHT_QUOTE.roundTripHkd,
      breakdown: [
        {
          label: `CX321 HKG→BCN（10-15）${FLIGHT_QUOTE.cabinClass} 參考價`,
          amountEur: outboundQuoteEur,
        },
        {
          label: `CX318 BCN→HKG（10-24）${FLIGHT_QUOTE.cabinClass} 參考價`,
          amountEur: returnQuoteEur,
        },
      ],
      notes: FLIGHT_QUOTE.notes,
      sourceUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'hotel-barcelona',
      category: 'accommodation',
      name: 'Hotel Barcelona Center',
      date: '2026-10-16',
      amountEur: 960,
      breakdown: [
        { label: '房費（8 晚 × €100/晚）', amountEur: 800 },
        { label: '城市稅 City Tax（8 晚 × €6）', amountEur: 48 },
        { label: '早餐加購（8 次 × €14）', amountEur: 112 },
      ],
      notes: 'Eixample 區，近 Verdaguer 地鐵站，全程駐紮 Barcelona',
    },
    {
      id: 'aerobus',
      category: 'transportation',
      name: 'Aerobús 機場巴士',
      date: '2026-10-16',
      amountEur: 7,
      breakdown: [{ label: 'BCN T1 → Plaça Catalunya（單程 1 人）', amountEur: 7 }],
    },
    {
      id: 'metro-tcasual',
      category: 'transportation',
      name: 'T-Casual 地鐵票',
      date: '2026-10-16',
      amountEur: 36.45,
      breakdown: [
        { label: '10 次票 × 3 張（全程約 25–28 次）', amountEur: 36.45 },
      ],
      notes: '單次約 €1.22（€12.15／10 次）',
    },
    {
      id: 'tibidabo-funicular',
      category: 'transportation',
      name: 'Tibidabo 上山交通',
      date: '2026-10-22',
      amountEur: 14.8,
      breakdown: [
        { label: 'Tramvia Blau + Funicular del Tibidabo 來回', amountEur: 14.8 },
      ],
    },
    {
      id: 'taxi-airport',
      category: 'transportation',
      name: '返程機場計程車',
      date: '2026-10-24',
      amountEur: 35,
      breakdown: [{ label: 'Hotel → BCN T1（約 25 分鐘）', amountEur: 35 }],
    },
    {
      id: 'sagrada-ticket',
      category: 'tickets',
      name: 'Sagrada Família 門票',
      date: '2026-10-17',
      amountEur: 26,
      breakdown: [{ label: '基本入場票（含語音導覽）', amountEur: 26 }],
    },
    {
      id: 'casa-batllo-ticket',
      category: 'tickets',
      name: 'Casa Batlló 門票',
      date: '2026-10-17',
      amountEur: 35,
      breakdown: [{ label: 'Blue 票種（含語音導覽）', amountEur: 35 }],
    },
    {
      id: 'park-guell-ticket',
      category: 'tickets',
      name: 'Park Güell 門票',
      date: '2026-10-18',
      amountEur: 10,
      breakdown: [{ label: '紀念區入場票', amountEur: 10 }],
    },
    {
      id: 'mnac-ticket',
      category: 'tickets',
      name: 'MNAC 門票',
      date: '2026-10-19',
      amountEur: 12,
      breakdown: [{ label: '一般入場票', amountEur: 12 }],
    },
    {
      id: 'joan-miro-ticket',
      category: 'tickets',
      name: 'Fundació Joan Miró 門票',
      date: '2026-10-19',
      amountEur: 13,
      breakdown: [{ label: '一般入場票', amountEur: 13 }],
    },
    {
      id: 'casa-mila-ticket',
      category: 'tickets',
      name: 'Casa Milà 門票',
      date: '2026-10-20',
      amountEur: 28,
      breakdown: [{ label: '一般入場票（含屋頂）', amountEur: 28 }],
    },
    {
      id: 'picasso-ticket',
      category: 'tickets',
      name: 'Picasso Museum 門票',
      date: '2026-10-20',
      amountEur: 14,
      breakdown: [{ label: '一般入場票', amountEur: 14 }],
    },
    {
      id: 'camp-nou-ticket',
      category: 'tickets',
      name: 'Spotify Camp Nou Immersive Tour',
      date: '2026-10-21',
      amountEur: 35,
      breakdown: [{ label: '沉浸式導覽（含 FC Barcelona Museum）', amountEur: 35 }],
    },
    {
      id: 'macba-ticket',
      category: 'tickets',
      name: 'MACBA 門票',
      date: '2026-10-21',
      amountEur: 12,
      breakdown: [{ label: '一般入場票', amountEur: 12 }],
    },
    {
      id: 'tibidabo-ticket',
      category: 'tickets',
      name: 'Tibidabo 遊樂園門票',
      date: '2026-10-22',
      amountEur: 35,
      breakdown: [{ label: '一日通行證', amountEur: 35 }],
    },
  ],
};

export const categoryLabels: Record<ExpenseItem['category'], string> = {
  accommodation: '住宿',
  transportation: '交通',
  tickets: '門票',
  flights: '機票',
};

export function formatHkdAmount(amountHkd: number): string {
  return `HK$${amountHkd.toLocaleString('zh-Hant', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatHkd(amountEur: number, rate: number = EUR_TO_HKD): string {
  return `HK$${(amountEur * rate).toLocaleString('zh-Hant', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatEur(amount: number): string {
  return `€${amount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDateZh(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（週${weekdays[d.getDay()]}）`;
}
