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

export const BASE_CURRENCY = 'CNY' as const;
export const CNY_TO_HKD = 1.08;

export const defaultTripData: TripData = {
  version: 18,
  lastUpdated: new Date().toISOString(),
  destination: '廣州',
  baseCurrency: BASE_CURRENCY,
  exchangeRate: CNY_TO_HKD,
  mapCenter: { lat: 23.128, lng: 113.272 },
  flights: [
    {
      id: 'hsr-out',
      type: 'departure',
      date: '2026-07-25',
      airline: '搭高鐵',
      flightNumber: '',
      route: '香港西九龍 → 廣州東',
      originCode: 'WEK',
      destCode: 'GGZ',
      departureAirport: '香港西九龍站',
      arrivalAirport: '廣州東站',
      departureTime: '08:30',
      arrivalTime: '10:00',
      duration: '約 1 小時 30 分',
      status: '參考票價（未購票）',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'hsr-return',
      type: 'return',
      date: '2026-07-26',
      airline: '搭高鐵',
      flightNumber: '',
      route: '廣州東 → 香港西九龍',
      originCode: 'GGZ',
      destCode: 'WEK',
      departureAirport: '廣州東站',
      arrivalAirport: '香港西九龍站',
      departureTime: '16:46',
      arrivalTime: '18:31',
      duration: '約 1 小時 45 分',
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
      id: 'yongqing-fang',
      name: '永慶坊',
      description: '西關恩寧路歷史街區，騎樓、粵劇博物館與文青小店雲集。',
      lat: 23.1197,
      lng: 113.2439,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '地鐵 1 號線黃沙站 B 出口步行約 10 分鐘。',
      youtubeVideoId: '4_sHZgcGNcs',
    },
    {
      id: 'dafo-temple',
      name: '大佛寺',
      description: '北京路商圈內的千年古寺，晚間 19:00 亮燈後尤為壯觀。',
      lat: 23.1258,
      lng: 113.2683,
      category: '寺廟',
      openingHours: '08:00 – 21:30',
      tips: '建議 19:00 前抵達，可同時欣賞日景與亮燈。',
      youtubeVideoId: 'Kw6e7x8Bw5k',
    },
    {
      id: 'guangzhou-art-museum',
      name: '廣州藝術博物院',
      description: '廣州藝術博物院（新館），嶺南畫派與當代藝術展覽。',
      lat: 23.1408,
      lng: 113.2777,
      category: '博物館',
      openingHours: '09:00 – 17:30',
      tips: '週一閉館（法定假日除外），建議提前網上預約。',
      youtubeVideoId: 'fLkECV3kFPs',
    },
    {
      id: 'canton-tower',
      name: '廣州塔',
      description: '廣州地標「小蠻腰」，日間登塔可俯瞰珠江新城全景。',
      lat: 23.1066,
      lng: 113.3245,
      category: '地標',
      openingHours: '09:30 – 22:30',
      tips: '日景與夜景各有特色，本次安排下午日景。',
    },
    {
      id: 'guangzhou-east-station',
      name: '廣州東站',
      description: '廣州東站商圈，返程前可順道逛商場及解決晚餐。',
      lat: 23.1507,
      lng: 113.3242,
      category: '交通樞紐',
      openingHours: '全天開放',
      tips: '返程高鐵 16:46 開出，建議 15:30 前抵達車站。',
    },
    {
      id: 'pearl-river-cruise',
      name: '珠江夜游',
      description: '珠江夜游，兩岸燈光與廣州塔倒影交織。',
      lat: 23.1145,
      lng: 113.2612,
      category: '體驗',
      openingHours: '19:00 – 22:00',
      tips: '現場視乎班次及天氣再決定是否購票，建議預留彈性時間。',
      youtubeVideoId: 'xmhEeHIP_Zk',
    },
    {
      id: 'diandude-tianhe',
      name: '點都德（天河北店）',
      description: '點都德天河北店，經典粵式點心與飲茶。',
      lat: 23.141,
      lng: 113.327,
      category: '餐飲',
      openingHours: '07:00 – 22:00',
      tips: '週末建議提前排隊或網上取號。',
      youtubeVideoId: 'V1oCVmmM5gM',
    },
  ],
  itinerary: [
    {
      date: '2026-07-25',
      dayLabel: '第 1 天',
      city: '廣州',
      activities: [
        {
          time: '07:45',
          title: '前往西九龍站',
          location: '香港西九龍站',
          description: '提前抵達車站，辦理出入境及安檢',
          transport: '港鐵／步行',
        },
        {
          time: '08:30',
          title: '高鐵出發',
          location: '香港西九龍 → 廣州東',
          description: '搭乘高鐵前往廣州（預計 10:00 抵達）',
          transport: '二等座（車次待購票）',
        },
        {
          time: '10:30',
          title: '酒店寄放行李',
          location: '天河北區酒店',
          description: '抵達廣州東站後前往酒店，辦理入住或寄放行李',
          transport: '地鐵／的士',
        },
        {
          time: '12:00',
          title: '午餐飲茶',
          location: '點都德（天河北店）',
          description: '品嚐蝦餃、燒賣、腸粉等粵式點心',
          attractionId: 'diandude-tianhe',
          transport: '步行',
        },
        {
          time: '14:00',
          title: '永慶坊',
          location: '永慶坊',
          description: '漫步恩寧路騎樓街，打卡粵劇藝術博物館及網紅巷弄',
          attractionId: 'yongqing-fang',
          transport: '地鐵 1 號線黃沙站',
        },
        {
          time: '18:30',
          title: '大佛寺',
          location: '大佛寺',
          description: '參觀古寺，等候 19:00 亮燈',
          attractionId: 'dafo-temple',
          transport: '地鐵 1 號線公園前站／北京路站',
        },
        {
          time: '19:30',
          title: '晚餐',
          location: '北京路商圈',
          description: '大佛寺附近用膳',
          transport: '步行',
        },
        {
          time: '20:30',
          title: '珠江夜游（視情況）',
          location: '珠江夜游碼頭',
          description: '現場視乎班次及天氣再決定是否上船',
          attractionId: 'pearl-river-cruise',
          transport: '地鐵／的士',
        },
      ],
    },
    {
      date: '2026-07-26',
      dayLabel: '第 2 天',
      city: '廣州',
      activities: [
        {
          time: '08:30',
          title: '酒店附近早餐',
          location: '天河北區',
          description: '酒店或附近茶樓早餐',
          transport: '步行',
        },
        {
          time: '10:00',
          title: '廣州藝術博物院',
          location: '廣州藝術博物院',
          description: '參觀新館展覽（建議提前預約）',
          attractionId: 'guangzhou-art-museum',
          transport: '地鐵／的士',
        },
        {
          time: '13:00',
          title: '博物館附近散步',
          location: '廣州藝術博物院附近',
          description: '參觀完博物館之後喺附近行吓',
          transport: '步行',
        },
        {
          time: '14:30',
          title: '午餐',
          location: '藝術博物院附近',
          description: '博物館周邊用餐',
          transport: '步行',
        },
        {
          time: '15:30',
          title: '退房及取行李',
          location: '天河北區酒店',
          description: '辦理退房，攜行李前往廣州東站',
          transport: '地鐵 3 號線轉 1 號線',
        },
        {
          time: '16:00',
          title: '廣州東站',
          location: '廣州東站',
          description: '在車站商圈閒逛，等候返程列車',
          attractionId: 'guangzhou-east-station',
          transport: '地鐵 1 號線／3 號線廣州東站',
        },
        {
          time: '16:46',
          title: '高鐵返程',
          location: '廣州東 → 香港西九龍',
          description: '搭乘高鐵返回香港（16:46 出發，18:31 抵達）',
          transport: '二等座（車次待購票）',
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

/** @deprecated Use CNY_TO_HKD */
export const EUR_TO_HKD = CNY_TO_HKD;
