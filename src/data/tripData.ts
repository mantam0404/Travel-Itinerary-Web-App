import { FLIGHT_QUOTE } from '../constants/flightQuotes';

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
  tips?: string;
  youtubeVideoId?: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  location: string;
  description: string;
  attractionId?: string;
  transport?: string;
}

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  city: string;
  activities: ItineraryActivity[];
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
}

export const BASE_CURRENCY = 'EUR' as const;
export const EUR_TO_HKD = 8.45;

export const defaultTripData: TripData = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  destination: '葡萄牙',
  baseCurrency: BASE_CURRENCY,
  exchangeRate: EUR_TO_HKD,
  mapCenter: { lat: 38.7223, lng: -9.1393 },
  flights: [
    {
      id: 'out-hkg-lis',
      type: 'departure',
      date: '2026-10-15',
      airline: '搭飛機',
      flightNumber: '',
      route: '香港 → 里斯本',
      originCode: 'HKG',
      destCode: 'LIS',
      departureAirport: '香港國際機場',
      arrivalAirport: '里斯本機場',
      departureTime: '23:55',
      arrivalTime: '09:30+1',
      duration: '約 15 小時',
      status: '參考報價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'return-lis-hkg',
      type: 'return',
      date: '2026-10-20',
      airline: '搭飛機',
      flightNumber: '',
      route: '里斯本 → 香港',
      originCode: 'LIS',
      destCode: 'HKG',
      departureAirport: '里斯本機場',
      arrivalAirport: '香港國際機場',
      departureTime: '12:30',
      arrivalTime: '07:15+1',
      duration: '約 14 小時',
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
      id: 'alfama',
      name: '阿法瑪區',
      description: '里斯本最古老的街區，迷宮般小巷、塗鴉與法多音樂氛圍。',
      lat: 38.7139,
      lng: -9.1304,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '建議傍晚前往，可順道欣賞日落與夜景。',
    },
    {
      id: 'belem-tower',
      name: '貝倫塔',
      description: '里斯本標誌性海事建築，見證大航海時代。',
      lat: 38.6916,
      lng: -9.216,
      category: '古蹟',
      openingHours: '09:30 – 18:00',
      tips: '可與熱羅尼莫斯修道院安排同日參觀。',
    },
    {
      id: 'jeronimos-monastery',
      name: '熱羅尼莫斯修道院',
      description: '世界文化遺產，曼努埃爾式建築的經典代表。',
      lat: 38.6979,
      lng: -9.2067,
      category: '古蹟',
      openingHours: '10:00 – 18:30',
      tips: '週一休館，建議提前網上購票。',
    },
    {
      id: 'sintra-pena',
      name: '佩納宮',
      description: '辛特拉山頂的彩色宮殿，童話般的建築風格。',
      lat: 38.7876,
      lng: -9.3906,
      category: '宮殿',
      openingHours: '09:30 – 18:00',
      tips: '建議預留半天，可搭配辛特拉老城漫步。',
    },
    {
      id: 'lisbon-castle',
      name: '聖喬治城堡',
      description: '俯瞰里斯本全景的古城堡，塔樓視野開闊。',
      lat: 38.7139,
      lng: -9.1334,
      category: '城堡',
      openingHours: '09:00 – 21:00',
      tips: '黃昏時段光線最佳，適合拍攝城市全景。',
    },
    {
      id: 'porto-ribeira',
      name: '波爾圖里貝拉區',
      description: '杜羅河畔彩色房屋與露台餐廳，波爾圖最迷人街區。',
      lat: 41.1402,
      lng: -8.6112,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '傍晚河畔氣氛最佳，可品嚐葡式海鮮。',
    },
    {
      id: 'livraria-lello',
      name: '萊羅書店',
      description: '波爾圖著名新藝術風格書店，螺旋樓梯極具特色。',
      lat: 41.1469,
      lng: -8.6148,
      category: '文化',
      openingHours: '09:30 – 19:00',
      tips: '需提前購票入場，尖峰時段排隊較久。',
    },
    {
      id: 'lisbon-airport',
      name: '里斯本機場',
      description: '里斯本溫貝里薩機場（LIS），葡萄牙主要國際門戶。',
      lat: 38.7742,
      lng: -9.1342,
      category: '交通樞紐',
      openingHours: '全天開放',
      tips: '返程建議預留 3 小時辦理登機及安檢。',
    },
  ],
  itinerary: [
    {
      date: '2026-10-15',
      dayLabel: '第 1 天',
      city: '里斯本',
      activities: [
        {
          time: '09:30',
          title: '抵達里斯本',
          location: '里斯本機場',
          description: '抵達後前往酒店辦理入住或寄放行李',
          attractionId: 'lisbon-airport',
          transport: '地鐵／的士',
        },
        {
          time: '12:00',
          title: '午餐',
          location: '里斯本市中心',
          description: '酒店附近或市中心用餐，適應時差',
          transport: '步行',
        },
        {
          time: '14:30',
          title: '阿法瑪區',
          location: '阿法瑪',
          description: '漫步老城小巷，感受法多音樂與塗鴉藝術',
          attractionId: 'alfama',
          transport: '地鐵／步行',
        },
        {
          time: '18:30',
          title: '晚餐',
          location: '阿法瑪區',
          description: '品嚐葡式海鮮飯或燒烤',
          transport: '步行',
        },
      ],
    },
    {
      date: '2026-10-16',
      dayLabel: '第 2 天',
      city: '里斯本',
      activities: [
        {
          time: '09:30',
          title: '貝倫塔',
          location: '貝倫區',
          description: '參觀大航海時代象徵建築',
          attractionId: 'belem-tower',
          transport: '電車／巴士',
        },
        {
          time: '11:00',
          title: '熱羅尼莫斯修道院',
          location: '貝倫區',
          description: '參觀修道院內部及修道院廣場',
          attractionId: 'jeronimos-monastery',
          transport: '步行',
        },
        {
          time: '13:00',
          title: '午餐',
          location: '貝倫區',
          description: '品嚐貝倫蛋撻',
          transport: '步行',
        },
        {
          time: '16:00',
          title: '聖喬治城堡',
          location: '聖喬治城堡',
          description: '登城堡俯瞰里斯本全景',
          attractionId: 'lisbon-castle',
          transport: '巴士／步行',
        },
      ],
    },
    {
      date: '2026-10-17',
      dayLabel: '第 3 天',
      city: '辛特拉',
      activities: [
        {
          time: '08:30',
          title: '前往辛特拉',
          location: '辛特拉',
          description: '搭乘火車前往辛特拉（約 40 分鐘）',
          transport: '火車',
        },
        {
          time: '10:00',
          title: '佩納宮',
          location: '佩納宮',
          description: '參觀彩色宮殿與周邊花園',
          attractionId: 'sintra-pena',
          transport: '巴士／步行',
        },
        {
          time: '13:30',
          title: '午餐',
          location: '辛特拉老城',
          description: '辛特拉老城用餐及散步',
          transport: '步行',
        },
        {
          time: '17:00',
          title: '返回里斯本',
          location: '里斯本',
          description: '火車返回里斯本酒店',
          transport: '火車',
        },
      ],
    },
    {
      date: '2026-10-18',
      dayLabel: '第 4 天',
      city: '里斯本',
      activities: [
        {
          time: '10:00',
          title: '自由探索',
          location: '里斯本市中心',
          description: '自由安排購物、咖啡或補充未完成的景點',
          transport: '步行',
        },
        {
          time: '13:00',
          title: '午餐',
          location: '自由選擇',
          description: '市中心或海邊餐廳',
          transport: '步行',
        },
        {
          time: '15:00',
          title: '自由活動',
          location: '里斯本',
          description: '可選擇海邊散步或博物館',
          transport: '地鐵／步行',
        },
      ],
    },
    {
      date: '2026-10-19',
      dayLabel: '第 5 天',
      city: '波爾圖',
      activities: [
        {
          time: '08:00',
          title: '前往波爾圖',
          location: '波爾圖',
          description: '搭乘 Alfa Pendular 高速火車（約 3 小時）',
          transport: '火車',
        },
        {
          time: '12:00',
          title: '里貝拉區',
          location: '波爾圖里貝拉區',
          description: '漫步杜羅河畔彩色街區',
          attractionId: 'porto-ribeira',
          transport: '步行',
        },
        {
          time: '14:30',
          title: '萊羅書店',
          location: '波爾圖',
          description: '參觀著名新藝術風格書店',
          attractionId: 'livraria-lello',
          transport: '步行',
        },
        {
          time: '19:00',
          title: '晚餐',
          location: '里貝拉區',
          description: '河畔餐廳品嚐葡式料理',
          transport: '步行',
        },
      ],
    },
    {
      date: '2026-10-20',
      dayLabel: '第 6 天',
      city: '里斯本',
      activities: [
        {
          time: '08:30',
          title: '返回里斯本',
          location: '里斯本',
          description: '火車返回里斯本（約 3 小時）',
          transport: '火車',
        },
        {
          time: '11:30',
          title: '前往機場',
          location: '里斯本機場',
          description: '辦理登機手續，準備返程',
          attractionId: 'lisbon-airport',
          transport: '的士／地鐵',
        },
        {
          time: '12:30',
          title: '搭飛機返程',
          location: '里斯本 → 香港',
          description: '搭乘航班返回香港',
          transport: '經濟艙（航班待購票）',
        },
      ],
    },
  ],
};

export function formatDateZh(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（週${weekdays[d.getDay()]}）`;
}

/** @deprecated Use EUR_TO_HKD */
export const CNY_TO_HKD = EUR_TO_HKD;
