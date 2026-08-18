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
  version: 4,
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
      airline: '阿聯酋航空',
      flightNumber: 'EK381 · EK191',
      route: '香港 → 里斯本',
      originCode: 'HKG',
      destCode: 'LIS',
      departureAirport: '香港國際機場',
      arrivalAirport: '里斯本機場',
      departureTime: '00:05',
      arrivalTime: '12:35',
      duration: '約 16 小時（迪拜轉機）',
      status: '已訂位',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'return-lis-hkg',
      type: 'return',
      date: '2026-10-24',
      airline: '阿聯酋航空',
      flightNumber: 'EK192 · EK382',
      route: '里斯本 → 香港',
      originCode: 'LIS',
      destCode: 'HKG',
      departureAirport: '里斯本機場',
      arrivalAirport: '香港國際機場',
      departureTime: '14:15',
      arrivalTime: '07:15+1',
      duration: '約 15 小時（迪拜轉機）',
      status: '已訂位',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.returnHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
  ],
  attractions: [
    {
      id: 'lisbon-airport',
      name: '里斯本機場',
      description: '里斯本溫貝里薩機場（LIS），葡萄牙主要國際門戶。',
      lat: 38.7742,
      lng: -9.1342,
      category: '交通樞紐',
      openingHours: '全天開放',
      tips: '10/24 建議 11:15 前抵達機場辦理退稅與登機。',
    },
    {
      id: 'praca-comercio',
      name: '商業廣場',
      description: '里斯本最具代表性的河畔廣場（Praça do Comércio），黃色拱門與特茹河景觀。',
      lat: 38.7075,
      lng: -9.1365,
      category: '廣場',
      openingHours: '全天開放',
      tips: '可沿龐巴爾下城（Baixa）步行至此，傍晚光線最佳。',
    },
    {
      id: 'jeronimos-monastery',
      name: '哲羅姆派修道院',
      description: '世界文化遺產 Mosteiro dos Jerónimos，曼努埃爾式建築經典。',
      lat: 38.6979,
      lng: -9.2067,
      category: '古蹟',
      openingHours: '10:00 – 18:30',
      tips: '憑里斯本卡號至官方預約系統登記入場時段，避開人潮。',
    },
    {
      id: 'belem-tower',
      name: '貝倫塔',
      description: '里斯本標誌性海事建築 Torre de Belém，見證大航海時代。',
      lat: 38.6916,
      lng: -9.216,
      category: '古蹟',
      openingHours: '09:30 – 18:00',
      tips: '48 小時里斯本卡 Day 1 免費入場，建議與修道院同日參觀。',
    },
    {
      id: 'pasteis-belem',
      name: '百年蛋撻始祖店',
      description: 'Pastéis de Belém，1837 年創立的葡式蛋撻老店。',
      lat: 38.6976,
      lng: -9.203,
      category: '美食',
      openingHours: '08:00 – 23:00',
      tips: '內用與外帶排隊動線不同，建議錯開尖峰時段。',
    },
    {
      id: 'lx-factory',
      name: 'LX Factory 文創園區',
      description: '舊工廠改造的文創園區，餐廳、書店與設計小店林立。',
      lat: 38.702,
      lng: -9.178,
      category: '文創',
      openingHours: '平日 10:00 – 20:00',
      tips: '適合傍晚前往，園區內有多家特色餐廳。',
    },
    {
      id: 'sintra-pena',
      name: '佩納宮',
      description: '辛特拉山頂彩色宮殿 Palácio Nacional da Pena，童話般建築。',
      lat: 38.7876,
      lng: -9.3906,
      category: '宮殿',
      openingHours: '09:30 – 18:00',
      tips: '務必預約 10/17 09:00 或 09:30 第一場次，官網實名購票。',
    },
    {
      id: 'regaleira',
      name: '雷加萊拉莊園',
      description: 'Quinta da Regaleira，以倒立天井與神秘花園聞名。',
      lat: 38.7964,
      lng: -9.396,
      category: '莊園',
      openingHours: '09:30 – 20:00',
      tips: '建議佩納宮後搭 435 公車或 Uber 前往，預留 2 小時。',
    },
    {
      id: 'lisbon-castle',
      name: '聖若熱城堡',
      description: 'Castelo de S. Jorge，俯瞰里斯本全景的古城堡。',
      lat: 38.7139,
      lng: -9.1334,
      category: '城堡',
      openingHours: '09:00 – 21:00',
      tips: '10/18 09:00 前憑里斯本卡免費入場（卡於 09:00 失效）。',
    },
    {
      id: 'miradouro-portas-sol',
      name: '太陽門觀景台',
      description: 'Miradouro das Portas do Sol，阿法瑪區最佳日落觀景點之一。',
      lat: 38.712,
      lng: -9.1335,
      category: '觀景台',
      openingHours: '全天開放',
      tips: '城堡參觀後步行即可抵達，適合拍攝紅瓦屋頂全景。',
    },
    {
      id: 'alfama',
      name: '阿法瑪區',
      description: '里斯本最古老的街區，28 號電車（Eléctrico 28）與法多音樂氛圍。',
      lat: 38.7139,
      lng: -9.1304,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '傍晚可搭 28 號電車穿梭老城，晚餐可安排法多表演。',
    },
    {
      id: 'porto-ribeira',
      name: '利貝拉杜羅河岸',
      description: '波圖里貝拉區 Ribeira，杜羅河畔彩色房屋與露台餐廳。',
      lat: 41.1402,
      lng: -8.6112,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '傍晚河畔氣氛最佳，適合欣賞夕陽與夜景。',
    },
    {
      id: 'dom-luis-bridge',
      name: '路易一世大橋',
      description: 'Ponte Dom Luís I，波圖標誌性雙層鐵橋，連接老城與加亞新城。',
      lat: 41.1405,
      lng: -8.609,
      category: '橋樑',
      openingHours: '全天開放',
      tips: '10/19 傍晚可在此欣賞夕陽；下層步行過橋，上層可搭輕軌 D 線。',
    },
    {
      id: 'livraria-lello',
      name: '萊羅書店',
      description: 'Livraria Lello，波圖著名新藝術風格書店，螺旋樓梯極具特色。',
      lat: 41.1469,
      lng: -8.6148,
      category: '文化',
      openingHours: '09:30 – 19:00',
      tips: '提早至官網購買 Ticket-Voucher，門票金額可抵扣購書消費。',
    },
    {
      id: 'sao-bento-station',
      name: '聖本篤車站',
      description: 'Estação de São Bento，以藍白瓷磚歷史壁畫聞名的火車站。',
      lat: 41.1456,
      lng: -8.6102,
      category: '交通樞紐',
      openingHours: '06:00 – 01:00',
      tips: '大廳瓷磚壁畫免費參觀，也是前往阿威羅的出發站。',
    },
    {
      id: 'clerigos-tower',
      name: '牧師塔',
      description: 'Torre dos Clérigos，波圖老城最高塔樓，登頂可俯瞰全城。',
      lat: 41.1479,
      lng: -8.6143,
      category: '古蹟',
      openingHours: '09:00 – 19:00',
      tips: '塔樓階梯較陡，建議穿舒適鞋履。',
    },
    {
      id: 'vila-nova-gaia',
      name: '加亞新城',
      description: 'Vila Nova de Gaia，杜羅河南岸波特酒酒莊與河景露台林立。',
      lat: 41.137,
      lng: -8.613,
      category: '酒莊區',
      openingHours: '各酒莊不同',
      tips: '過橋後可品嚐 Port Wine，亦可搭加亞新城纜車（Teleférico de Gaia）。',
    },
    {
      id: 'douro-valley',
      name: '杜羅河谷',
      description: 'Douro Valley 酒莊梯田，葡萄牙最著名的葡萄酒產區之一。',
      lat: 41.1617,
      lng: -7.7881,
      category: '自然風光',
      openingHours: '依一日遊行程',
      tips: '建議參加含接送的一日遊，省心且可品酒。',
    },
    {
      id: 'timeout-market',
      name: 'Time Out Market',
      description: 'Mercado da Ribeira，里斯本人氣美食市集，匯集多家名廚小店。',
      lat: 38.7067,
      lng: -9.146,
      category: '美食',
      openingHours: '10:00 – 00:00',
      tips: '10/22 回程里斯本後適合在此安排晚宴，尖峰時段人潮較多。',
    },
    {
      id: 'cascais',
      name: '卡斯凱什',
      description: 'Cascais 濱海小鎮，白色沙灘、漁港與悠閒海濱步道。',
      lat: 38.697,
      lng: -9.421,
      category: '海濱小鎮',
      openingHours: '全天開放',
      tips: '從 Cais do Sodré 站搭 CP 火車約 40 分鐘，單程約 €2.40。',
    },
    {
      id: 'boca-inferno',
      name: '地獄之口',
      description: 'Boca do Inferno，卡斯凱什海岸懸崖洞穴，海浪衝擊形成壯觀景觀。',
      lat: 38.689,
      lng: -9.431,
      category: '自然奇觀',
      openingHours: '全天開放',
      tips: '建議與卡斯凱什同日安排，從市中心步行或搭公車約 20 分鐘。',
    },
  ],
  itinerary: [
    {
      date: '2026-10-15',
      dayLabel: '第 1 天',
      city: '里斯本 Lisboa',
      activities: [
        {
          time: '12:35',
          title: 'EK191 抵達里斯本',
          location: '里斯本機場 LIS',
          description:
            '搭乘 EK381（香港出發）經迪拜轉機 EK191，約 12:35 抵達。機場入境大廳 Ask Me Lisboa 櫃檯領取實體「48 小時里斯本卡」（先不啟用）。飯店 ➔ 機場建議 Uber/Bolt 直達（約 20–30 分鐘）。',
          attractionId: 'lisbon-airport',
        },
        {
          time: '14:30',
          title: '飯店 Check-in',
          location: '里斯本市區',
          description: '辦理入住或寄放行李，適應時差後出發市區散步。',
        },
        {
          time: '16:00',
          title: '龐巴爾下城漫步',
          location: 'Baixa',
          description: '沿龐巴爾下城街道漫步，感受里斯本市中心風貌。市區以步行為主。',
        },
        {
          time: '17:30',
          title: '商業廣場',
          location: 'Praça do Comércio',
          description: '在特茹河畔商業廣場散步，欣賞黃色拱門與河景。叫車或備用地鐵可刷感應信用卡。',
          attractionId: 'praca-comercio',
        },
      ],
    },
    {
      date: '2026-10-16',
      dayLabel: '第 2 天',
      city: '里斯本 貝倫區 Belém',
      activities: [
        {
          time: '09:00',
          title: '啟用里斯本卡',
          location: '貝倫區',
          description: '早上 09:00 啟用 48 小時里斯本卡（Day 1）。搭乘 15E 電車或 728 巴士往返貝倫區與市區，交通免費搭乘。',
        },
        {
          time: '09:30',
          title: '哲羅姆派修道院',
          location: 'Mosteiro dos Jerónimos',
          description: '參觀修道院內部及修道院廣場。憑里斯本卡免費入場，建議事先於官方預約系統登記時段。',
          attractionId: 'jeronimos-monastery',
        },
        {
          time: '11:00',
          title: '貝倫塔',
          location: 'Torre de Belém',
          description: '參觀大航海時代象徵建築，憑里斯本卡免費入場。',
          attractionId: 'belem-tower',
        },
        {
          time: '12:30',
          title: '百年蛋撻始祖店',
          location: 'Pastéis de Belém',
          description: '品嚐葡式蛋撻老店，內用與外帶排隊動線不同。',
          attractionId: 'pasteis-belem',
        },
        {
          time: '15:00',
          title: 'LX Factory 文創園區',
          location: 'LX Factory',
          description: '舊工廠改造文創園區，可逛書店、設計小店與特色餐廳。',
          attractionId: 'lx-factory',
        },
      ],
    },
    {
      date: '2026-10-17',
      dayLabel: '第 3 天',
      city: '辛特拉 Sintra（一日遊）',
      activities: [
        {
          time: '08:00',
          title: '前往辛特拉',
          location: 'Rossio 站',
          description:
            '市區 ➔ 辛特拉：Rossio 站搭乘 CP 火車（約 40 分鐘）。48 小時里斯本卡 Day 2，CP 火車免費刷卡進出。',
        },
        {
          time: '09:00',
          title: '佩納宮（第一場）',
          location: 'Palácio Nacional da Pena',
          description:
            '預約第一場次（09:00 或 09:30）入場。辛特拉當地搭 434 公車或 Uber 上山至佩納宮。門票需提早於官網單獨購買時段。',
          attractionId: 'sintra-pena',
        },
        {
          time: '12:30',
          title: '雷加萊拉莊園',
          location: 'Quinta da Regaleira',
          description: '參觀倒立天井與神秘花園，建議佩納宮後搭 435 公車或 Uber 前往。',
          attractionId: 'regaleira',
        },
        {
          time: '17:00',
          title: '返回里斯本',
          location: '里斯本',
          description: '傍晚搭乘 CP 火車返回里斯本飯店。',
        },
      ],
    },
    {
      date: '2026-10-18',
      dayLabel: '第 4 天',
      city: '里斯本 Lisboa',
      activities: [
        {
          time: '08:30',
          title: '聖若熱城堡',
          location: 'Castelo de S. Jorge',
          description:
            '09:00 前進入城堡（里斯本卡於 09:00 失效，憑卡免費入場）。登城堡俯瞰里斯本全景。',
          attractionId: 'lisbon-castle',
        },
        {
          time: '10:30',
          title: '太陽門觀景台',
          location: 'Miradouro das Portas do Sol',
          description: '城堡參觀後步行至觀景台，欣賞阿法瑪區紅瓦屋頂全景。',
          attractionId: 'miradouro-portas-sol',
        },
        {
          time: '14:00',
          title: '28 號電車',
          location: 'Eléctrico 28',
          description:
            '09:00 後市區移動可搭地鐵／電車，或短途 Uber/Bolt（幾歐元即可）。亦可直接刷感應式信用卡（Contactless）。',
        },
        {
          time: '19:30',
          title: '法多晚餐',
          location: '阿法瑪區',
          description: '在阿法瑪區安排法多（Fado）晚餐，感受葡萄牙傳統音樂。',
          attractionId: 'alfama',
        },
      ],
    },
    {
      date: '2026-10-19',
      dayLabel: '第 5 天',
      city: '波圖 Porto',
      activities: [
        {
          time: '08:00',
          title: '高鐵前往波圖',
          location: 'CP Alfa Pendular',
          description:
            '里斯本 ➔ 波圖：CP 國鐵 Alfa Pendular（約 3 小時）。出發前 30–60 天預購早鳥票（Promo Ticket）。',
        },
        {
          time: '12:00',
          title: '飯店 Check-in',
          location: '波圖市區',
          description:
            'Porto Campanhã 站 ➔ 飯店建議叫 Uber/Bolt 直達，避免拖行李走斜坡（車資約 €5–€8）。',
        },
        {
          time: '15:00',
          title: '利貝拉杜羅河岸',
          location: 'Ribeira',
          description: '漫步杜羅河畔彩色街區，感受波圖最迷人氛圍。',
          attractionId: 'porto-ribeira',
        },
        {
          time: '18:30',
          title: '路易一世大橋夕陽',
          location: 'Ponte Dom Luís I',
          description: '在大橋欣賞夕陽，河畔氣氛最佳時段。',
          attractionId: 'dom-luis-bridge',
        },
      ],
    },
    {
      date: '2026-10-20',
      dayLabel: '第 6 天',
      city: '波圖 Porto',
      activities: [
        {
          time: '09:30',
          title: '萊羅書店',
          location: 'Livraria Lello',
          description: '參觀著名新藝術風格書店，需提前官網購買 Voucher。',
          attractionId: 'livraria-lello',
        },
        {
          time: '11:00',
          title: '聖本篤車站',
          location: 'Estação de São Bento',
          description: '欣賞大廳藍白瓷磚歷史壁畫，免費參觀。',
          attractionId: 'sao-bento-station',
        },
        {
          time: '12:30',
          title: '牧師塔',
          location: 'Torre dos Clérigos',
          description: '登塔俯瞰波圖全城，階梯較陡請穿舒適鞋履。全天以步行為主。',
          attractionId: 'clerigos-tower',
        },
        {
          time: '16:00',
          title: '加亞新城品波特酒',
          location: 'Vila Nova de Gaia',
          description:
            '橫跨路易一世大橋至加亞新城品波特酒（Port Wine）。過橋可走大橋下層；上層可搭輕軌 D 線或加亞新城纜車。逛累可叫 Uber/Bolt（單程約 €4–€6）。',
          attractionId: 'vila-nova-gaia',
        },
      ],
    },
    {
      date: '2026-10-21',
      dayLabel: '第 7 天',
      city: '波圖近郊',
      activities: [
        {
          time: '09:00',
          title: '【方案 A】杜羅河谷酒莊',
          location: 'Douro Valley',
          description: '參加杜羅河谷一日遊（含接送），品酒並欣賞酒莊梯田風光。建議提前預訂一日遊行程。',
          attractionId: 'douro-valley',
        },
        {
          time: '09:00',
          title: '【方案 B】阿威羅水鄉',
          location: 'Aveiro',
          description:
            'São Bento 站搭 CP 郊區火車（約 1 小時）前往阿威羅水鄉小鎮。火車單程約 €3.80，現場買或刷卡即可。',
          attractionId: 'sao-bento-station',
        },
      ],
    },
    {
      date: '2026-10-22',
      dayLabel: '第 8 天',
      city: '里斯本 Lisboa',
      activities: [
        {
          time: '10:00',
          title: '波圖午餐後返里斯本',
          location: 'CP 國鐵',
          description:
            '波圖 ➔ 里斯本：CP 國鐵返回 Lisboa Oriente 或 Lisboa Santa Apolónia 站。提早預購早鳥票（約 €15–€20）。',
        },
        {
          time: '14:30',
          title: '飯店 Check-in',
          location: '里斯本市區',
          description: '火車站至飯店建議叫 Uber 直達。',
        },
        {
          time: '19:00',
          title: 'Time Out Market 晚宴',
          location: 'Mercado da Ribeira',
          description: '在里斯本人氣美食市集安排晚宴，匯集多家名廚小店。',
          attractionId: 'timeout-market',
        },
      ],
    },
    {
      date: '2026-10-23',
      dayLabel: '第 9 天',
      city: '里斯本周邊',
      activities: [
        {
          time: '09:00',
          title: '【方案 A】卡斯凱什濱海小鎮',
          location: 'Cascais',
          description:
            'Lisboa Cais do Sodré 站搭 CP 火車（約 40 分鐘）。單程約 €2.40，直接刷感應信用卡進站，不需買卡。',
          attractionId: 'cascais',
        },
        {
          time: '11:30',
          title: '【方案 A】地獄之口',
          location: 'Boca do Inferno',
          description: '卡斯凱什海岸懸崖洞穴，海浪衝擊形成壯觀景觀，與卡斯凱什同日安排。',
          attractionId: 'boca-inferno',
        },
        {
          time: '09:00',
          title: '【方案 B】自由大道購物',
          location: 'Avenida da Liberdade',
          description: '自由大道（Avenida da Liberdade）購物，並漫遊 Príncipe Real 街區。市區搭地鐵或步行即可。',
        },
      ],
    },
    {
      date: '2026-10-24',
      dayLabel: '第 10 天',
      city: '離境返港',
      activities: [
        {
          time: '09:30',
          title: '前往里斯本機場',
          location: '里斯本機場 LIS',
          description:
            '攜帶行李強烈建議 Uber/Bolt 直達機場（車程約 20–30 分鐘，車資約 €10–€15）。11:15 前抵達辦理退稅與登機。',
          attractionId: 'lisbon-airport',
        },
        {
          time: '14:15',
          title: 'EK192 起飛返港',
          location: '里斯本 → 香港',
          description: '搭乘 EK192（14:15 起飛）經迪拜轉機 EK382 返回香港。',
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
