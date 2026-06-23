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

export interface ItineraryDay {
  date: string;
  dayLabel: string;
  city: string;
  activities: {
    time: string;
    title: string;
    location: string;
    description: string;
    attractionId?: string;
  }[];
}

export interface ExpenseItem {
  id: string;
  category: 'accommodation' | 'transportation' | 'tickets';
  name: string;
  date: string;
  amountEur: number;
  breakdown: { label: string; amountEur: number }[];
  notes?: string;
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

export const defaultTripData: TripData = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  destination: 'Spain',
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
      departureTime: '23:55',
      arrivalTime: '07:15+1',
      duration: '14h 20m',
      status: '已確認',
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
      departureTime: '11:30',
      arrivalTime: '06:45+1',
      duration: '13h 15m',
      status: '已確認',
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
  ],
  itinerary: [
    {
      date: '2026-10-15',
      dayLabel: '第 1 天',
      city: 'Barcelona',
      activities: [
        {
          time: '23:55',
          title: '出發航班',
          location: 'Hong Kong International Airport (HKG)',
          description: '搭乘 Cathay Pacific CX321 前往 Barcelona',
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
          location: 'Barcelona El Prat Airport (BCN)',
          description: '入境後搭乘 Aerobús 前往市區，辦理 Hotel 入住',
        },
        {
          time: '14:00',
          title: '漫步 La Rambla',
          location: 'La Rambla',
          description: '熟悉市區環境，品嚐第一杯西班牙咖啡',
          attractionId: 'la-rambla',
        },
        {
          time: '17:00',
          title: '探索 Gothic Quarter',
          location: 'Gothic Quarter (Barri Gòtic)',
          description: '穿梭中世紀小巷，參觀 Barcelona Cathedral',
          attractionId: 'gothic-quarter',
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
          description: '預約時段入場，細賞高第建築奇蹟',
          attractionId: 'sagrada-familia',
        },
        {
          time: '14:00',
          title: 'Casa Batlló 外觀',
          location: 'Casa Batlló',
          description: 'Passeig de Gràcia 建築群巡禮',
          attractionId: 'casa-batllo',
        },
        {
          time: '16:30',
          title: 'La Boqueria Market',
          location: 'La Boqueria Market',
          description: '品嚐新鮮海鮮與 Jamón ibérico',
          attractionId: 'boqueria',
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
          title: 'Park Güell',
          location: 'Park Güell',
          description: '彩色馬賽克花園與城市全景攝影',
          attractionId: 'park-guell',
        },
        {
          time: '15:00',
          title: 'Barceloneta Beach',
          location: 'Barceloneta Beach',
          description: '海灘休憩，享用 Paella 海鮮飯',
          attractionId: 'barceloneta',
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
          title: 'Montjuïc 山丘',
          location: 'Montjuïc',
          description: '搭乘纜車上山，參觀 National Art Museum of Catalonia',
          attractionId: 'montjuic',
        },
        {
          time: '20:00',
          title: 'Magic Fountain 燈光秀',
          location: 'Montjuïc',
          description: '免費欣賞音樂噴泉表演',
          attractionId: 'montjuic',
        },
      ],
    },
    {
      date: '2026-10-20',
      dayLabel: '第 6 天',
      city: 'Barcelona → Madrid',
      activities: [
        {
          time: '09:00',
          title: 'AVE 高速列車',
          location: 'Barcelona Sants Station',
          description: '搭乘 Renfe AVE 前往 Madrid（約 2.5 小時）',
        },
        {
          time: '14:00',
          title: '抵達 Madrid',
          location: 'Madrid Atocha Station',
          description: '入住 Hotel，漫步 Retiro Park 周邊',
        },
      ],
    },
    {
      date: '2026-10-21',
      dayLabel: '第 7 天',
      city: 'Madrid',
      activities: [
        {
          time: '10:00',
          title: 'Prado Museum',
          location: 'Museo del Prado',
          description: '欣賞 Goya、Velázquez 等大師名作',
        },
        {
          time: '16:00',
          title: 'Royal Palace of Madrid',
          location: 'Royal Palace of Madrid',
          description: '參觀歐洲最大的皇宮之一',
        },
      ],
    },
    {
      date: '2026-10-22',
      dayLabel: '第 8 天',
      city: 'Madrid → Barcelona',
      activities: [
        {
          time: '09:00',
          title: '返回 Barcelona',
          location: 'Madrid Atocha Station',
          description: 'AVE 高速列車返回 Barcelona',
        },
        {
          time: '15:00',
          title: '自由活動',
          location: 'Barcelona',
          description: '最後採買紀念品與伴手禮',
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
          title: '最後一日漫遊',
          location: 'El Born District',
          description: '悠閒早午餐，整理行李準備返程',
        },
      ],
    },
    {
      date: '2026-10-24',
      dayLabel: '第 10 天',
      city: 'Barcelona',
      activities: [
        {
          time: '11:30',
          title: '返程航班',
          location: 'Barcelona El Prat Airport (BCN)',
          description: '搭乘 Cathay Pacific CX318 返回 Hong Kong',
        },
      ],
    },
  ],
  expenses: [
    {
      id: 'hotel-barcelona',
      category: 'accommodation',
      name: 'Hotel Barcelona Center',
      date: '2026-10-16',
      amountEur: 720,
      breakdown: [
        { label: '房費（6 晚 × €100/晚）', amountEur: 600 },
        { label: '城市稅 City Tax', amountEur: 36 },
        { label: '早餐加購', amountEur: 84 },
      ],
      notes: '位於 Eixample 區，步行可達 Sagrada Família',
    },
    {
      id: 'hotel-madrid',
      category: 'accommodation',
      name: 'Hotel Madrid Gran Vía',
      date: '2026-10-20',
      amountEur: 240,
      breakdown: [
        { label: '房費（2 晚 × €100/晚）', amountEur: 200 },
        { label: '城市稅 City Tax', amountEur: 12 },
        { label: '早餐加購', amountEur: 28 },
      ],
    },
    {
      id: 'aerobus',
      category: 'transportation',
      name: 'Aerobús 機場巴士',
      date: '2026-10-16',
      amountEur: 14,
      breakdown: [{ label: '來回票（1 人）', amountEur: 14 }],
    },
    {
      id: 'metro-10trip',
      category: 'transportation',
      name: 'T-Casual 地鐵票',
      date: '2026-10-16',
      amountEur: 11.35,
      breakdown: [{ label: '10 次票 × 1 張', amountEur: 11.35 }],
    },
    {
      id: 'ave-train',
      category: 'transportation',
      name: 'Renfe AVE 高速列車',
      date: '2026-10-20',
      amountEur: 130,
      breakdown: [
        { label: 'Barcelona → Madrid（單程）', amountEur: 65 },
        { label: 'Madrid → Barcelona（單程）', amountEur: 65 },
      ],
    },
    {
      id: 'taxi-airport',
      category: 'transportation',
      name: '機場計程車',
      date: '2026-10-24',
      amountEur: 35,
      breakdown: [{ label: 'Hotel → BCN 機場', amountEur: 35 }],
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
      id: 'park-guell-ticket',
      category: 'tickets',
      name: 'Park Güell 門票',
      date: '2026-10-18',
      amountEur: 10,
      breakdown: [{ label: '紀念區入場票', amountEur: 10 }],
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
      id: 'prado-ticket',
      category: 'tickets',
      name: 'Prado Museum 門票',
      date: '2026-10-21',
      amountEur: 15,
      breakdown: [{ label: '一般入場票', amountEur: 15 }],
    },
    {
      id: 'royal-palace-ticket',
      category: 'tickets',
      name: 'Royal Palace of Madrid 門票',
      date: '2026-10-21',
      amountEur: 12,
      breakdown: [{ label: '一般入場票', amountEur: 12 }],
    },
  ],
};

export const categoryLabels: Record<ExpenseItem['category'], string> = {
  accommodation: '住宿',
  transportation: '交通',
  tickets: '門票',
};

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
