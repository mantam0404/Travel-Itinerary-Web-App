import { FLIGHT_QUOTE, hkdToBase } from '../constants/flightQuotes';

export interface FlightInfo {
  id: string;
  type: 'departure' | 'return';
  date: string;
  airline: string;
  flightNumber: string;
  route: string;
  originCode?: string;
  destCode?: string;
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
  baseCurrency: 'CNY' | 'EUR';
  exchangeRate: number;
  mapCenter: { lat: number; lng: number };
  flights: FlightInfo[];
  itinerary: ItineraryDay[];
  attractions: Attraction[];
  expenses: ExpenseItem[];
}

export const BASE_CURRENCY = 'CNY' as const;
export const CNY_TO_HKD = 1.08;

const hsrQuoteCny = hkdToBase(FLIGHT_QUOTE.roundTripHkd, CNY_TO_HKD);
const outboundQuoteCny = hkdToBase(FLIGHT_QUOTE.outboundHkd, CNY_TO_HKD);
const returnQuoteCny = hkdToBase(FLIGHT_QUOTE.returnHkd, CNY_TO_HKD);

export const defaultTripData: TripData = {
  version: 6,
  lastUpdated: new Date().toISOString(),
  destination: 'Guangzhou',
  baseCurrency: BASE_CURRENCY,
  exchangeRate: CNY_TO_HKD,
  mapCenter: { lat: 23.1291, lng: 113.2644 },
  flights: [
    {
      id: 'g80',
      type: 'departure',
      date: '2026-11-06',
      airline: '廣深港高鐵',
      flightNumber: 'G80',
      route: '香港西九龍 → 廣州南',
      originCode: 'WEK',
      destCode: 'GZN',
      departureAirport: 'Hong Kong West Kowloon Station',
      arrivalAirport: 'Guangzhou South Station',
      departureTime: '08:05',
      arrivalTime: '08:52',
      duration: '47m',
      status: '參考票價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'g653',
      type: 'return',
      date: '2026-11-09',
      airline: '廣深港高鐵',
      flightNumber: 'G653',
      route: '廣州南 → 香港西九龍',
      originCode: 'GZN',
      destCode: 'WEK',
      departureAirport: 'Guangzhou South Station',
      arrivalAirport: 'Hong Kong West Kowloon Station',
      departureTime: '18:00',
      arrivalTime: '18:47',
      duration: '47m',
      status: '參考票價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.returnHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
  ],
  attractions: [
    {
      id: 'canton-tower',
      name: 'Canton Tower',
      description: '廣州地標「小蠻腰」，觀光層俯瞰珠江兩岸夜景。',
      lat: 23.1066,
      lng: 113.3245,
      category: '地標',
      openingHours: '09:30 – 22:30',
      ticketPriceEur: 150,
      tips: '建議傍晚登塔，一次飽覽日落與夜景。',
    },
    {
      id: 'shamian-island',
      name: 'Shamian Island',
      description: '歐陸風情小島，百年殖民建築與榕樹大道適合漫步拍照。',
      lat: 23.1078,
      lng: 113.2431,
      category: '歷史區',
      openingHours: '全天開放',
      tips: '沙面大街咖啡館林立，適合下午悠閒散步。',
    },
    {
      id: 'chen-clan-hall',
      name: 'Chen Clan Ancestral Hall',
      description: '嶺南建築藝術瑰寶，木雕、磚雕、灰塑工藝精湛。',
      lat: 23.1273,
      lng: 113.2468,
      category: '古蹟',
      openingHours: '08:30 – 17:30',
      ticketPriceEur: 10,
      tips: '廣東民間工藝博物館所在地，建議預留 1.5 小時。',
    },
    {
      id: 'yuexiu-park',
      name: 'Yuexiu Park',
      description: '市區最大公園，五羊石雕為廣州城市象徵。',
      lat: 23.1375,
      lng: 113.2656,
      category: '公園',
      openingHours: '06:00 – 22:00',
      ticketPriceEur: 0,
      tips: '鎮海樓廣州博物館可順道參觀。',
    },
    {
      id: 'beijing-road',
      name: 'Beijing Road Pedestrian Street',
      description: '千年古道與現代商圈交匯，美食、購物與夜景兼備。',
      lat: 23.1256,
      lng: 113.2689,
      category: '商業街',
      openingHours: '全天開放',
      tips: '可參觀古道遺址玻璃地面展示。',
    },
    {
      id: 'sacred-heart-cathedral',
      name: 'Sacred Heart Cathedral',
      description: '石室聖心大教堂，全球四座全石構哥特式教堂之一。',
      lat: 23.1167,
      lng: 113.2594,
      category: '宗教建築',
      openingHours: '08:00 – 17:30',
      tips: '內部參觀需保持安靜，注意衣著得體。',
    },
    {
      id: 'zhujiang-new-town',
      name: 'Zhujiang New Town',
      description: '珠江新城 CBD，花城廣場與廣州塔隔江相望。',
      lat: 23.1193,
      lng: 113.3212,
      category: '城市景觀',
      openingHours: '全天開放',
      tips: '週末晚上常有燈光秀與市集活動。',
    },
    {
      id: 'pearl-river-cruise',
      name: 'Pearl River Night Cruise',
      description: '珠江夜游，兩岸燈光與廣州塔倒影交織。',
      lat: 23.1145,
      lng: 113.2612,
      category: '體驗',
      openingHours: '19:00 – 22:00',
      ticketPriceEur: 120,
      tips: '天字碼頭班次較多，建議提前購票。',
    },
    {
      id: 'liurong-temple',
      name: 'Liurong Temple',
      description: '六榕寺與花塔，千年古剎香火鼎盛。',
      lat: 23.1295,
      lng: 113.2582,
      category: '寺廟',
      openingHours: '08:00 – 17:00',
      ticketPriceEur: 5,
    },
    {
      id: 'nanyue-king-museum',
      name: 'Museum of the Nanyue King',
      description: '南越王博物館，西漢南越國文物與墓室原址。',
      lat: 23.1393,
      lng: 113.2597,
      category: '博物館',
      openingHours: '09:00 – 17:30',
      ticketPriceEur: 12,
      tips: '王墓展區與宮署展區可安排半日參觀。',
    },
  ],
  itinerary: [
    {
      date: '2026-11-06',
      dayLabel: '第 1 天',
      city: 'Guangzhou',
      activities: [
        {
          time: '07:30',
          title: '前往西九龍站',
          location: 'Hong Kong West Kowloon Station',
          description: '提前抵達車站，辦理出入境及安檢',
          transport: '港鐵／步行',
          costEur: 0,
        },
        {
          time: '08:05',
          title: '高鐵 G80 出發',
          location: 'Hong Kong West Kowloon → Guangzhou South',
          description: '搭乘廣深港高鐵前往廣州南（約 47 分鐘）',
          transport: 'G80 二等座',
          costEur: 0,
        },
        {
          time: '09:30',
          title: '酒店入住',
          location: 'Guangzhou Marriott Hotel Tianhe',
          description: '地鐵前往天河區酒店，寄放行李',
          transport: '地鐵 2 號線',
          costEur: 4,
        },
        {
          time: '14:00',
          title: '北京路步行街',
          location: 'Beijing Road Pedestrian Street',
          description: '漫步千年古道，品嚐廣東小食',
          attractionId: 'beijing-road',
          transport: '地鐵 1 號線',
          costEur: 4,
        },
        {
          time: '19:30',
          title: '珠江夜游',
          location: 'Pearl River Night Cruise',
          description: '天字碼頭登船，欣賞兩岸夜景',
          attractionId: 'pearl-river-cruise',
          transport: '地鐵 + 步行',
          costEur: 124,
        },
      ],
    },
    {
      date: '2026-11-07',
      dayLabel: '第 2 天',
      city: 'Guangzhou',
      activities: [
        {
          time: '09:30',
          title: '陳家祠',
          location: 'Chen Clan Ancestral Hall',
          description: '嶺南建築與民間工藝精品',
          attractionId: 'chen-clan-hall',
          transport: '地鐵 1 號線陈家祠站',
          costEur: 14,
        },
        {
          time: '13:00',
          title: '沙面島',
          location: 'Shamian Island',
          description: '歐陸建築群與江景漫步',
          attractionId: 'shamian-island',
          transport: '地鐵 6 號線文化公園站',
          costEur: 4,
        },
        {
          time: '16:00',
          title: '石室聖心大教堂',
          location: 'Sacred Heart Cathedral',
          description: '全石構哥特式教堂外觀與內部參觀',
          attractionId: 'sacred-heart-cathedral',
          transport: '地鐵 6 號線一德路站',
          costEur: 4,
        },
        {
          time: '19:00',
          title: '上下九步行街晚餐',
          location: 'Shangxiajiu Pedestrian Street',
          description: '傳統騎樓與地道粵菜',
          transport: '地鐵 1 號線長壽路站',
          costEur: 4,
        },
      ],
    },
    {
      date: '2026-11-08',
      dayLabel: '第 3 天',
      city: 'Guangzhou',
      activities: [
        {
          time: '09:00',
          title: '越秀公園',
          location: 'Yuexiu Park',
          description: '五羊石雕與鎮海樓',
          attractionId: 'yuexiu-park',
          transport: '地鐵 2 號線越秀公園站',
          costEur: 4,
        },
        {
          time: '11:30',
          title: '南越王博物館',
          location: 'Museum of the Nanyue King',
          description: '西漢南越國文物展',
          attractionId: 'nanyue-king-museum',
          transport: '步行 + 地鐵',
          costEur: 16,
        },
        {
          time: '15:00',
          title: '六榕寺',
          location: 'Liurong Temple',
          description: '花塔與古寺參觀',
          attractionId: 'liurong-temple',
          transport: '地鐵 1 號線公園前站',
          costEur: 9,
        },
        {
          time: '18:30',
          title: '廣州塔夜景',
          location: 'Canton Tower',
          description: '登塔觀光層，俯瞰珠江新城',
          attractionId: 'canton-tower',
          transport: '地鐵 3 號線／APM 線',
          costEur: 154,
        },
      ],
    },
    {
      date: '2026-11-09',
      dayLabel: '第 4 天',
      city: 'Guangzhou',
      activities: [
        {
          time: '10:00',
          title: '珠江新城',
          location: 'Zhujiang New Town',
          description: '花城廣場晨間漫步，最後採買伴手禮',
          attractionId: 'zhujiang-new-town',
          transport: 'APM 線',
          costEur: 4,
        },
        {
          time: '14:00',
          title: '前往廣州南站',
          location: 'Guangzhou South Station',
          description: '退房後搭乘地鐵前往車站',
          transport: '地鐵 2 號線',
          costEur: 4,
        },
        {
          time: '18:00',
          title: '高鐵 G653 返程',
          location: 'Guangzhou South → Hong Kong West Kowloon',
          description: '搭乘廣深港高鐵返回香港',
          transport: 'G653 二等座',
          costEur: 0,
        },
      ],
    },
  ],
  expenses: [
    {
      id: 'flights-cx-roundtrip',
      category: 'flights',
      name: '來回高鐵票 G80 / G653',
      date: '2026-11-06',
      amountEur: hsrQuoteCny,
      amountHkd: FLIGHT_QUOTE.roundTripHkd,
      breakdown: [
        {
          label: `G80 西九龍→廣州南（11-06）${FLIGHT_QUOTE.cabinClass} 參考價`,
          amountEur: outboundQuoteCny,
        },
        {
          label: `G653 廣州南→西九龍（11-09）${FLIGHT_QUOTE.cabinClass} 參考價`,
          amountEur: returnQuoteCny,
        },
      ],
      notes: FLIGHT_QUOTE.notes,
      sourceUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'hotel-guangzhou',
      category: 'accommodation',
      name: 'Guangzhou Marriott Hotel Tianhe',
      date: '2026-11-06',
      amountEur: 1650,
      breakdown: [
        { label: '房費（3 晚 × ¥500/晚）', amountEur: 1500 },
        { label: '服務費及稅項（約 10%）', amountEur: 150 },
      ],
      notes: '天河區珠江新城，近地鐵 3 號線石牌橋站',
    },
    {
      id: 'metro-card',
      category: 'transportation',
      name: '廣州地鐵交通',
      date: '2026-11-06',
      amountEur: 48,
      breakdown: [{ label: '地鐵單程票及羊城通儲值（全程約 12 次）', amountEur: 48 }],
      notes: '單程約 ¥3–5',
    },
    {
      id: 'canton-tower-ticket',
      category: 'tickets',
      name: '廣州塔觀光票',
      date: '2026-11-08',
      amountEur: 150,
      breakdown: [{ label: '觀光層門票（含摩天轮可選）', amountEur: 150 }],
    },
    {
      id: 'pearl-river-ticket',
      category: 'tickets',
      name: '珠江夜游',
      date: '2026-11-06',
      amountEur: 120,
      breakdown: [{ label: '天字碼頭標準船票', amountEur: 120 }],
    },
    {
      id: 'chen-clan-ticket',
      category: 'tickets',
      name: '陳家祠門票',
      date: '2026-11-07',
      amountEur: 10,
      breakdown: [{ label: '成人票', amountEur: 10 }],
    },
    {
      id: 'nanyue-king-ticket',
      category: 'tickets',
      name: '南越王博物館',
      date: '2026-11-08',
      amountEur: 12,
      breakdown: [{ label: '王墓展區聯票', amountEur: 12 }],
    },
    {
      id: 'liurong-ticket',
      category: 'tickets',
      name: '六榕寺門票',
      date: '2026-11-08',
      amountEur: 5,
      breakdown: [{ label: '成人票', amountEur: 5 }],
    },
  ],
};

export const categoryLabels: Record<ExpenseItem['category'], string> = {
  accommodation: '住宿',
  transportation: '交通',
  tickets: '門票',
  flights: '高鐵票',
};

export function formatHkdAmount(amountHkd: number): string {
  return `HK$${amountHkd.toLocaleString('zh-Hant', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatHkd(amountBase: number, rate: number = CNY_TO_HKD): string {
  return `HK$${(amountBase * rate).toLocaleString('zh-Hant', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatBase(amount: number, currency: TripData['baseCurrency'] = BASE_CURRENCY): string {
  const symbol = currency === 'CNY' ? '¥' : '€';
  return `${symbol}${amount.toLocaleString('zh-Hant', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** @deprecated Use formatBase — kept for component compatibility */
export function formatEur(amount: number): string {
  return formatBase(amount, BASE_CURRENCY);
}

export function formatDateZh(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（週${weekdays[d.getDay()]}）`;
}

/** @deprecated Use CNY_TO_HKD */
export const EUR_TO_HKD = CNY_TO_HKD;
