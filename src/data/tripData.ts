import { FLIGHT_QUOTE, hkdToBase } from '../constants/flightQuotes';

export interface FlightSegment {
  flightNumber: string;
  originCode: string;
  destCode: string;
  departureTime: string;
  arrivalTime: string;
  /** 此段飛行後的轉機等候說明 */
  layoverAfter?: string;
}

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
  /** 分段航班與轉機詳情 */
  segments?: FlightSegment[];
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

export const BASE_CURRENCY = 'EUR' as const;
export const EUR_TO_HKD = 8.45;

const flightQuoteEur = hkdToBase(FLIGHT_QUOTE.roundTripHkd, EUR_TO_HKD);
const outboundQuoteEur = hkdToBase(FLIGHT_QUOTE.outboundHkd, EUR_TO_HKD);
const returnQuoteEur = hkdToBase(FLIGHT_QUOTE.returnHkd, EUR_TO_HKD);

export const defaultTripData: TripData = {
  version: 12,
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
      departureTime: '00:40',
      arrivalTime: '12:35',
      duration: '約 16 小時（含迪拜轉機）',
      status: '已訂位',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.outboundHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
      segments: [
        {
          flightNumber: 'EK381',
          originCode: 'HKG',
          destCode: 'DXB',
          departureTime: '00:40',
          arrivalTime: '04:25',
          layoverAfter: '迪拜轉機約 3 小時',
        },
        {
          flightNumber: 'EK191',
          originCode: 'DXB',
          destCode: 'LIS',
          departureTime: '07:25',
          arrivalTime: '12:35',
        },
      ],
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
      arrivalTime: '14:45+1',
      duration: '約 21 小時（含迪拜轉機）',
      status: '已訂位',
      cabinClass: FLIGHT_QUOTE.cabinClass,
      quoteHkd: FLIGHT_QUOTE.returnHkd,
      quoteSource: FLIGHT_QUOTE.source,
      quoteUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
      segments: [
        {
          flightNumber: 'EK192',
          originCode: 'LIS',
          destCode: 'DXB',
          departureTime: '14:15',
          arrivalTime: '00:50+1',
          layoverAfter: '迪拜轉機約 2 小時 40 分',
        },
        {
          flightNumber: 'EK382',
          originCode: 'DXB',
          destCode: 'HKG',
          departureTime: '03:30',
          arrivalTime: '14:45',
        },
      ],
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
      tips: '10/24 09:22 抵 Oriente 後 Uber 約 10 分鐘至機場，建議 12:15 前完成 check-in，有充足退稅時間。',
    },
    {
      id: 'montebelo-apartments',
      name: 'Montebelo Apartments',
      description: '里斯本連住 5 晚基地，市區平路地段，Uber 直達各景點。',
      lat: 38.7205,
      lng: -9.1468,
      category: '住宿',
      tips: '10/15–19 共 5 晚。出關後 Uber/Bolt 直達（約 20 分鐘，€10–€15）。',
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
      id: 'lisbon-castle',
      name: '聖若熱城堡',
      description: 'Castelo de S. Jorge，俯瞰里斯本全景的古城堡。',
      lat: 38.7139,
      lng: -9.1334,
      category: '城堡',
      openingHours: '09:00 – 21:00',
      tips: '10/16 09:00 啟用里斯本卡後憑卡免費入場。建議 Uber 直達城堡門口（約 €5）。',
    },
    {
      id: 'alfama',
      name: '阿法瑪區',
      description: '里斯本最古老的街區，法多音樂與蜿蜒石板路交織的舊城氛圍。',
      lat: 38.7139,
      lng: -9.1304,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '城堡參觀後沿斜坡步行下山，穿梭紅瓦屋頂巷弄。',
    },
    {
      id: 'elevador-santa-justa',
      name: '聖胡斯塔升降機',
      description: 'Elevador de Santa Justa，新哥特式升降機連接下城與 Carmo 高地。',
      lat: 38.7121,
      lng: -9.1394,
      category: '古蹟',
      openingHours: '07:30 – 23:00',
      tips: '10/16 憑里斯本卡多數可免費或折扣登頂，登頂俯瞰 Baixa 下城全景。',
    },
    {
      id: 'timeout-market',
      name: 'Time Out Market',
      description: 'Mercado da Ribeira，里斯本人氣美食市集，匯集多家名廚小店。',
      lat: 38.7067,
      lng: -9.146,
      category: '美食',
      openingHours: '10:00 – 00:00',
      tips: '10/16 晚餐首選，尖峰時段人潮較多，建議提早入座。',
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
      tips: '48 小時里斯本卡有效日內免費入場，建議與修道院同日參觀。',
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
      id: 'sintra-national-palace',
      name: '辛特拉國家宮殿',
      description: 'Palácio Nacional de Sintra，辛特拉老城黑白烟囱宫殿，世界遗产。',
      lat: 38.7977,
      lng: -9.3905,
      category: '宮殿',
      openingHours: '09:30 – 18:30',
      tips: '10/18 火車站步行約 10–15 分鐘。門票不含在里斯本卡內，建議官網購票。',
    },
    {
      id: 'regaleira',
      name: '雷加萊拉莊園',
      description: 'Quinta da Regaleira，以倒立天井與神秘花園聞名。',
      lat: 38.7964,
      lng: -9.396,
      category: '莊園',
      openingHours: '09:30 – 20:00',
      tips: '國家宮殿午餐後 Uber 前往（約 €6–8），預留 2 小時。',
    },
    {
      id: 'avenida-liberdade',
      name: '自由大道',
      description: 'Avenida da Liberdade，里斯本最時尚的購物林蔭大道。',
      lat: 38.7209,
      lng: -9.1502,
      category: '購物',
      openingHours: '全天開放',
      tips: '10/19 低強度悠閒散策，品牌店與咖啡館林立。',
    },
    {
      id: 'lx-factory',
      name: 'LX Factory 文創園區',
      description: '舊工廠改造的文創園區，餐廳、書店與設計小店林立。',
      lat: 38.702,
      lng: -9.178,
      category: '文創',
      openingHours: '平日 10:00 – 20:00',
      tips: '10/19 適合輕午茶，園區內有多家特色餐廳。',
    },
    {
      id: 'principe-real',
      name: 'Príncipe Real',
      description: '里斯本質感街區，精品小店、花園與特色餐廳雲集。',
      lat: 38.7156,
      lng: -9.1501,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '10/19 傍晚散步，感受當地文青氛圍。',
    },
    {
      id: 'porto-almada-180',
      name: 'Porto Almada 180 Apartments',
      description: 'Rua do Almada 180，波圖老城平坦地段，電梯直達，連住 4 晚。',
      lat: 41.1472,
      lng: -8.6118,
      category: '住宿',
      tips: '步行 Trindade 地鐵站約 5 分鐘、São Bento 站約 6–8 分鐘。Uber 可直達門口。',
    },
    {
      id: 'porto-ribeira',
      name: '利貝拉杜羅河岸',
      description: '波圖里貝拉區 Ribeira，杜羅河畔彩色房屋與露台餐廳。',
      lat: 41.1402,
      lng: -8.6112,
      category: '歷史街區',
      openingHours: '全天開放',
      tips: '10/20 傍晚河畔氣氛最佳，適合欣賞夕陽與夜景。',
    },
    {
      id: 'dom-luis-bridge',
      name: '路易一世大橋',
      description: 'Ponte Dom Luís I，波圖標誌性雙層鐵橋，連接老城與南岸。',
      lat: 41.1405,
      lng: -8.609,
      category: '橋樑',
      openingHours: '全天開放',
      tips: '10/20 傍晚可在此欣賞落日；下層步行過橋，上層可搭輕軌 D 線。',
    },
    {
      id: 'livraria-lello',
      name: '萊羅書店',
      description: 'Livraria Lello，波圖著名新藝術風格書店，螺旋樓梯極具特色。',
      lat: 41.1469,
      lng: -8.6148,
      category: '文化',
      openingHours: '09:30 – 19:00',
      tips: '10/21 早上場次，提早至官網購買 Ticket-Voucher。',
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
      id: 'igreja-carmo',
      name: '卡爾莫教堂',
      description: 'Igreja do Carmo，波圖著名藍白瓷磚外牆教堂，與 Carmelitas 教堂並立。',
      lat: 41.1473,
      lng: -8.6162,
      category: '教堂',
      openingHours: '07:30 – 19:00',
      tips: '與聖本篤車站步行 3 分鐘，外牆瓷磚極具特色。',
    },
    {
      id: 'palacio-bolsa',
      name: '證券交易所宮',
      description: 'Palácio da Bolsa，新古典主義商會宮殿，阿拉伯厅（Salão Árabe）為必看。',
      lat: 41.1414,
      lng: -8.6156,
      category: '古蹟',
      openingHours: '09:00 – 18:30',
      tips: '10/21 需提前官網預約英文或中文導覽場次。',
    },
    {
      id: 'clerigos-tower',
      name: '牧師塔',
      description: 'Torre dos Clérigos，波圖老城最高塔樓，登頂可俯瞰全城。',
      lat: 41.1479,
      lng: -8.6143,
      category: '古蹟',
      openingHours: '09:00 – 19:00',
      tips: '10/21 傍晚登塔欣賞夜景，或改為河岸晚餐。',
    },
    {
      id: 'igreja-sao-francisco',
      name: '聖弗朗西斯科教堂',
      description: 'Igreja de São Francisco，巴洛克金箔內部裝飾，波圖最華麗教堂之一。',
      lat: 41.1408,
      lng: -8.615,
      category: '教堂',
      openingHours: '09:00 – 17:30',
      tips: '10/22 上午參觀，從住宿步行約 8 分鐘。',
    },
    {
      id: 'foz-porto',
      name: 'Foz 海濱區',
      description: 'Foz do Douro，大西洋海濱步道與燈塔，波圖人的週末度假地。',
      lat: 41.1496,
      lng: -8.6689,
      category: '海濱',
      openingHours: '全天開放',
      tips: '搭 1 號復古電車至 Passeio Alegre 站，沿海散步。',
    },
    {
      id: 'jardim-cristal',
      name: '水晶宮花園',
      description: 'Jardins do Palácio de Cristal，俯瞰杜羅河的高地花園，日落絕景。',
      lat: 41.1478,
      lng: -8.6262,
      category: '公園',
      openingHours: '08:00 – 21:00',
      tips: '10/22 從 Foz 海濱 Uber 前往（約 10 分鐘，€6–€8）欣賞日落。',
    },
    {
      id: 'aveiro',
      name: '阿威羅水鄉',
      description: 'Aveiro「威尼斯」水鄉小鎮，彩色 Moliceiro 小船穿梭運河兩岸。',
      lat: 40.6405,
      lng: -8.6538,
      category: '水鄉小鎮',
      openingHours: '全天開放',
      tips: '從 São Bento 站搭 CP 郊區火車約 1 小時，來回約 €7.5。',
    },
    {
      id: 'casa-musica',
      name: '波圖音樂廳',
      description: 'Casa da Música，荷蘭建築師 Rem Koolhaas 設計的現代音樂殿堂。',
      lat: 41.1585,
      lng: -8.6307,
      category: '文化',
      openingHours: '10:00 – 19:00',
      tips: '10/23 下午安排導覽，建議提前官網預約場次。',
    },
    {
      id: 'santa-catarina',
      name: 'Santa Catarina 購物街',
      description: 'Rua de Santa Catarina，波圖最熱鬧的步行街與咖啡館聚集地。',
      lat: 41.149,
      lng: -8.6075,
      category: '購物',
      openingHours: '全天開放',
      tips: '10/23 傍晚告別晚餐，可順道購買伴手禮。',
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
            '10/15 00:40 香港出發 EK381（04:25 抵迪拜）轉 EK191（07:25 起飛），約 12:35 抵達里斯本。機場 Ask Me Lisboa 領取實體 48h 里斯本卡（先不啟用）。',
          attractionId: 'lisbon-airport',
          transport: '🚗 Uber/Bolt：LIS ➔ Montebelo｜約 20 分｜2 人 €12–18',
        },
        {
          time: '14:30',
          title: 'Montebelo Check-in',
          location: 'Montebelo Apartments',
          description: '辦理入住或寄放行李，適應時差後出發市區散步。',
          attractionId: 'montebelo-apartments',
        },
        {
          time: '16:00',
          title: '龐巴爾下城漫步',
          location: 'Baixa',
          description: '沿龐巴爾下城（Baixa）街道漫步，感受里斯本市中心平坦路段風貌。',
          transport: '🚶 步行｜€0',
        },
        {
          time: '17:30',
          title: '商業廣場',
          location: 'Praça do Comércio',
          description: '在特茹河畔商業廣場散步，欣賞黃色拱門與河景。',
          attractionId: 'praca-comercio',
          transport: '🚶 步行｜€0',
        },
      ],
    },
    {
      date: '2026-10-16',
      dayLabel: '第 2 天',
      city: '里斯本 Lisboa',
      activities: [
        {
          time: '09:00',
          title: '啟用 48 小時里斯本卡',
          location: 'Montebelo 附近',
          description:
            '第一次刷卡即啟用（連續 48 小時至 10/18 09:00）。最划算安排：覆蓋城堡、貝倫與辛特拉去程；10/18 傍晚回程火車需另購票（見當日行程）。',
          transport: '🟢 Lisboa Card 啟用｜2 人卡費已含在預算 €84',
        },
        {
          time: '09:15',
          title: '聖若熱城堡',
          location: 'Castelo de S. Jorge',
          description: '憑里斯本卡免費入場。登城堡俯瞰里斯本全景。',
          attractionId: 'lisbon-castle',
          transport: '🚗 Uber：Montebelo ➔ 城堡｜約 10 分｜2 人 €5–8',
        },
        {
          time: '11:00',
          title: '阿法瑪舊城漫步',
          location: 'Alfama',
          description: '沿斜坡步行下山，穿梭阿法瑪區蜿蜒巷弄與紅瓦屋頂。',
          attractionId: 'alfama',
          transport: '🚶 步行下山｜€0',
        },
        {
          time: '14:00',
          title: '聖胡斯塔升降機',
          location: 'Elevador de Santa Justa',
          description: '憑里斯本卡免費或折扣登頂，俯瞰 Baixa 下城全景。',
          attractionId: 'elevador-santa-justa',
          transport: '🟢 憑 Lisboa Card｜€0',
        },
        {
          time: '19:00',
          title: 'Time Out Market 晚餐',
          location: 'Mercado da Ribeira',
          description: '在里斯本人氣美食市集安排晚餐，匯集多家名廚小店。',
          attractionId: 'timeout-market',
          transport: '🚶 步行或 💳 地鐵單程｜約 €1.7/人',
        },
      ],
    },
    {
      date: '2026-10-17',
      dayLabel: '第 3 天',
      city: '里斯本 貝倫區 Belém',
      activities: [
        {
          time: '09:30',
          title: '哲羅姆派修道院',
          location: 'Mosteiro dos Jerónimos',
          description:
            '憑里斯本卡免費入場，建議事先於官方預約系統登記時段。',
          attractionId: 'jeronimos-monastery',
          transport:
            '🟢 15E 電車：Montebelo 附近 → Praça da Figueira 上車 ➔ Jerónimos｜約 30 分｜€0（卡內）',
        },
        {
          time: '11:00',
          title: '貝倫塔',
          location: 'Torre de Belém',
          description: '參觀大航海時代象徵建築，憑里斯本卡免費入場。',
          attractionId: 'belem-tower',
          transport: '🚶 貝倫區步行｜€0',
        },
        {
          time: '12:30',
          title: '百年蛋撻始祖店',
          location: 'Pastéis de Belém',
          description: '品嚐葡式蛋撻老店，內用與外帶排隊動線不同。',
          attractionId: 'pasteis-belem',
          transport: '🚶 步行｜€0',
        },
        {
          time: '15:00',
          title: '返回市區',
          location: 'Montebelo',
          description: '搭 15E 或 💳 地鐵返回住宿休息。',
          transport: '🟢 15E 電車返程｜€0（卡內，至 10/18 09:00 前有效）',
        },
      ],
    },
    {
      date: '2026-10-18',
      dayLabel: '第 4 天',
      city: '辛特拉 Sintra（一日遊）',
      activities: [
        {
          time: '08:01',
          title: '前往辛特拉',
          location: 'Rossio 站',
          description:
            'Montebelo → Rossio：💳 地鐵或 🚗 Uber（€5–7）。Rossio 搭 CP 往 Sintra（08:01 或 08:31，約 40 分）。去程在卡有效期內可 🟢 刷卡免費。',
          transport: '🟢 CP：Rossio ➔ Sintra｜去程 €0（卡內）',
        },
        {
          time: '09:30',
          title: '辛特拉國家宮殿',
          location: 'Palácio Nacional de Sintra',
          description:
            'Sintra 火車站步行約 10–15 分鐘至老城宮殿。門票需官網購買（不含在里斯本卡）。',
          attractionId: 'sintra-national-palace',
          transport: '🚶 火車站 ➔ 宮殿｜約 12 分｜€0',
        },
        {
          time: '12:30',
          title: '雷加萊拉莊園',
          location: 'Quinta da Regaleira',
          description: '參觀倒立天井與神秘花園。午餐後 Uber 前往。',
          attractionId: 'regaleira',
          transport: '🚗 Uber：老城 ➔ Regaleira｜約 8 分｜2 人 €6–10',
        },
        {
          time: '17:00',
          title: '返回里斯本',
          location: 'Montebelo Apartments',
          description:
            'Sintra 站購回程票至 Lisboa（Rossio）。因卡於 10/18 09:00 失效，傍晚回程需 💳 現場購票或感應信用卡。',
          transport: '💳 CP：Sintra ➔ Rossio｜2 人約 €10–12',
        },
      ],
    },
    {
      date: '2026-10-19',
      dayLabel: '第 5 天',
      city: '里斯本 Lisboa',
      activities: [
        {
          time: '10:00',
          title: '自由大道購物散策',
          location: 'Avenida da Liberdade',
          description: '沿里斯本最時尚林蔭大道漫步，品牌店與咖啡館林立。',
          attractionId: 'avenida-liberdade',
          transport: '🚶 從 Montebelo 步行｜€0',
        },
        {
          time: '13:00',
          title: 'LX Factory 輕午茶',
          location: 'LX Factory',
          description: '舊工廠改造文創園區，可逛書店、設計小店與特色餐廳。',
          attractionId: 'lx-factory',
          transport: '🚗 Uber 單程｜2 人 €4–7',
        },
        {
          time: '16:00',
          title: 'Príncipe Real 質感街區',
          location: 'Príncipe Real',
          description: '傍晚在質感街區散步，感受當地文青氛圍與花園景觀。',
          attractionId: 'principe-real',
          transport: '🚗 Uber 或 🚶 步行｜€0–8',
        },
      ],
    },
    {
      date: '2026-10-20',
      dayLabel: '第 6 天',
      city: '波圖 Porto',
      activities: [
        {
          time: '08:00',
          title: 'CP 高鐵前往波圖（已確認）',
          location: 'Lisboa Santa Apolónia',
          description:
            'Montebelo 退房後前往 Santa Apolónia 站。已確認班次：08:00 發車 ➔ 10:55 抵達 Porto Campanhã（車程約 2 小時 55 分）。',
          transport: '🚗 07:00 Uber 至 Santa Apolónia（€6–10）➔ 🎫 CP 08:00–10:55（已購票）',
        },
        {
          time: '11:15',
          title: 'Porto Almada 180 Check-in',
          location: 'Rua do Almada 180',
          description:
            'Campanhã 站 ➔ Porto Almada 180 Apartments：Uber 直達門口（約 10 分鐘，€6–€8），設電梯方便大型行李。',
          attractionId: 'porto-almada-180',
          transport: '🚗 Uber：Campanhã ➔ Almada 180｜約 10 分｜2 人 €6–8',
        },
        {
          time: '15:00',
          title: '利貝拉杜羅河岸',
          location: 'Ribeira',
          description: '漫步杜羅河畔彩色街區，從住宿步行 8 分鐘即可抵達。',
          attractionId: 'porto-ribeira',
          transport: '🚶 步行約 8 分｜€0',
        },
        {
          time: '18:30',
          title: '路易一世大橋落日',
          location: 'Ponte Dom Luís I',
          description: '在大橋欣賞落日，河畔氣氛最佳時段。',
          attractionId: 'dom-luis-bridge',
          transport: '🚶 步行｜€0',
        },
      ],
    },
    {
      date: '2026-10-21',
      dayLabel: '第 7 天',
      city: '波圖 Porto',
      activities: [
        {
          time: '09:30',
          title: '萊羅書店',
          location: 'Livraria Lello',
          description: '參觀著名新藝術風格書店，需提前官網預約早上場次 Ticket-Voucher。',
          attractionId: 'livraria-lello',
          transport: '🚶 住宿步行 5 分｜€0',
        },
        {
          time: '11:00',
          title: '聖本篤車站與卡爾莫教堂',
          location: 'São Bento / Carmo',
          description: '欣賞車站大廳藍白瓷磚壁畫，步行 3 分鐘至卡爾莫教堂瓷磚外牆。',
          attractionId: 'sao-bento-station',
          transport: '🚶 步行 3–6 分｜€0',
        },
        {
          time: '12:30',
          title: '證券交易所宮導覽',
          location: 'Palácio da Bolsa',
          description: '參加預約的英文或中文導覽，阿拉伯厅為必看亮點。',
          attractionId: 'palacio-bolsa',
          transport: '🚶 步行 5 分｜€0',
        },
        {
          time: '19:00',
          title: '牧師塔夜景或河岸晚餐',
          location: 'Torre dos Clérigos / Ribeira',
          description: '登牧師塔俯瞰波圖夜景，或改為里貝拉河岸晚餐。全程步行 3–8 分鐘。',
          attractionId: 'clerigos-tower',
          transport: '🚶 步行｜€0',
        },
      ],
    },
    {
      date: '2026-10-22',
      dayLabel: '第 8 天',
      city: '波圖 Porto',
      activities: [
        {
          time: '09:30',
          title: '聖弗朗西斯科教堂',
          location: 'Igreja de São Francisco',
          description: '參觀巴洛克金箔內部裝飾，波圖最華麗教堂之一。',
          attractionId: 'igreja-sao-francisco',
          transport: '🚶 步行約 8 分｜€0',
        },
        {
          time: '11:00',
          title: '1 號復古電車前往 Foz',
          location: 'Eléctrico 1',
          description:
            '1 號電車：Infante 站 ➔ Passeio Alegre 站（Foz 海濱）。單程票 €6，上車向司機購買。',
          attractionId: 'foz-porto',
          transport: '💳 1 號電車 Infante➔Foz｜2 人 €12（上車向司機購票）',
        },
        {
          time: '17:30',
          title: '水晶宮花園日落',
          location: 'Jardins do Palácio de Cristal',
          description: 'Foz 海濱 ➔ 水晶宮花園：Uber 約 10 分鐘（€6–€8），高地俯瞰杜羅河日落。',
          attractionId: 'jardim-cristal',
          transport: '🚗 Uber：Foz ➔ 水晶宮｜約 10 分｜2 人 €6–8',
        },
      ],
    },
    {
      date: '2026-10-23',
      dayLabel: '第 9 天',
      city: '阿威羅 Aveiro · 波圖 Porto',
      activities: [
        {
          time: '08:30',
          title: '前往阿威羅',
          location: 'Porto São Bento 站',
          description:
            '從住宿步行 6 分鐘至 São Bento 站，搭 CP 近郊火車（每 30 分鐘一班，車程 1 小時）。售票機購買來回票約 €7.5。',
          attractionId: 'sao-bento-station',
          transport: '🚶 步行 6 分至 São Bento ➔ 💳 CP 至 Aveiro｜2 人來回約 €7.5–15',
        },
        {
          time: '10:00',
          title: '阿威羅水鄉半日遊',
          location: 'Aveiro',
          description: '沿運河漫步，欣賞彩色 Moliceiro 小船與新藝術風格建築。',
          attractionId: 'aveiro',
          transport: '🚶 老城步行｜€0',
        },
        {
          time: '14:00',
          title: '返回波圖',
          location: '波圖',
          description: '搭乘 CP 火車返回波圖 Porto Almada 180。',
          transport: '💳 CP：Aveiro ➔ São Bento｜含於來回票',
        },
        {
          time: '16:00',
          title: '波圖音樂廳導覽',
          location: 'Casa da Música',
          description: '參觀 Rem Koolhaas 設計的現代音樂殿堂，建議提前官網預約導覽。',
          attractionId: 'casa-musica',
          transport: '🚗 Uber：公寓 ➔ Casa da Música｜2 人 €5–8',
        },
        {
          time: '19:00',
          title: 'Santa Catarina 購物與告別晚餐',
          location: 'Rua de Santa Catarina',
          description: '步行街購物伴手禮，安排波圖最後一晚告別晚餐。',
          attractionId: 'santa-catarina',
          transport: '🚶 步行｜€0',
        },
      ],
    },
    {
      date: '2026-10-24',
      dayLabel: '第 10 天',
      city: '離境返港',
      activities: [
        {
          time: '06:15',
          title: '前往 Campanhã 站',
          location: 'Porto Campanhã',
          description: '攜帶行李 Uber 從 Porto Almada 180 直達 Campanhã 站（約 10 分鐘），預留 06:40 班次登車時間。',
          attractionId: 'porto-almada-180',
          transport: '🚗 Uber：Almada 180 ➔ Campanhã｜約 10 分｜2 人 €6–8',
        },
        {
          time: '06:40',
          title: 'CP 高鐵返回里斯本（已確認）',
          location: 'Lisboa Oriente',
          description:
            '已確認班次：06:40 從 Porto Campanhã 發車 ➔ 09:22 抵達 Lisboa Oriente（車程約 2 小時 42 分）。',
          transport: '🎫 CP 06:40–09:22（已購票）',
        },
        {
          time: '09:35',
          title: '轉乘機場',
          location: '里斯本機場 LIS Terminal 1',
          description: 'Oriente 站 Uber 直達 Terminal 1（約 10 分鐘），約 09:45 抵達，距 14:15 起飛有充足時間辦理退稅與登機。',
          attractionId: 'lisbon-airport',
          transport: '🚗 Uber：Oriente ➔ LIS T1｜約 10 分｜2 人 €10–14',
        },
        {
          time: '14:15',
          title: 'EK192 起飛返港',
          location: '里斯本 → 香港',
          description: '搭乘 EK192（14:15 起飛）經迪拜轉機 EK382（03:30 起飛），10/25 約 14:45 抵達香港。',
        },
      ],
    },
  ],
  expenses: [
    {
      id: 'flights-emirates',
      category: 'flights',
      name: '來回機票 EK381/EK191 · EK192/EK382',
      date: '2026-10-15',
      amountEur: flightQuoteEur,
      amountHkd: FLIGHT_QUOTE.roundTripHkd,
      breakdown: [
        {
          label: `EK381/EK191 香港→里斯本（10/15）${FLIGHT_QUOTE.cabinClass}`,
          amountEur: outboundQuoteEur,
        },
        {
          label: `EK192/EK382 里斯本→香港（10/24）${FLIGHT_QUOTE.cabinClass}`,
          amountEur: returnQuoteEur,
        },
      ],
      notes: '已訂位。' + FLIGHT_QUOTE.notes,
      sourceUrl: FLIGHT_QUOTE.sourceUrl,
      quotedAt: FLIGHT_QUOTE.quotedAt,
    },
    {
      id: 'hotel-lisbon',
      category: 'accommodation',
      name: 'Montebelo Apartments（5 晚）',
      date: '2026-10-15',
      amountEur: 225,
      breakdown: [
        { label: '房費（5 晚 × €45/晚，市中心公寓估算）', amountEur: 225 },
      ],
      notes: '10/15–19 共 5 晚。實際以訂房為準。',
    },
    {
      id: 'hotel-porto',
      category: 'accommodation',
      name: 'Porto Almada 180 Apartments（4 晚）',
      date: '2026-10-20',
      amountEur: 200,
      breakdown: [
        { label: '房費（4 晚 × €50/晚，老城公寓估算）', amountEur: 200 },
      ],
      notes: '10/20–23 共 4 晚。Rua do Almada 180，設電梯。實際以訂房為準。',
    },
    {
      id: 'lisboa-card',
      category: 'transportation',
      name: '48 小時里斯本卡 Lisboa Card 48h（2 人）',
      date: '2026-10-16',
      amountEur: 84,
      breakdown: [
        { label: '48 小時成人卡 × 2（含交通＋部分景點）', amountEur: 84 },
      ],
      notes: '10/15 機場領卡，10/16 09:00 啟用（至 10/18 09:00）。覆蓋城堡、貝倫、辛特拉去程；10/18 回程 CP 另購。',
    },
    {
      id: 'cp-lisbon-porto',
      category: 'transportation',
      name: 'CP 國鐵 里斯本↔波圖',
      date: '2026-10-20',
      amountEur: 38,
      breakdown: [
        { label: '10/20 Santa Apolónia 08:00→Campanhã 10:55（已確認）', amountEur: 19 },
        { label: '10/24 Campanhã 06:40→Oriente 09:22（已確認）', amountEur: 19 },
      ],
      notes: '已於 cp.pt 確認班次並購票。',
    },
    {
      id: 'cp-aveiro',
      category: 'transportation',
      name: 'CP 火車 波圖↔阿威羅',
      date: '2026-10-23',
      amountEur: 7.5,
      breakdown: [
        { label: 'São Bento↔Aveiro 來回（2 人，售票機）', amountEur: 7.5 },
      ],
      notes: '10/23 阿威羅半日遊。São Bento 站售票機現場購票。',
    },
    {
      id: 'sintra-local',
      category: 'transportation',
      name: '辛特拉當地交通',
      date: '2026-10-18',
      amountEur: 19,
      breakdown: [
        { label: '國家宮殿↔雷加萊拉 Uber（2 人）', amountEur: 8 },
        { label: 'Sintra→Rossio 回程 CP（卡已過期，2 人）', amountEur: 11 },
      ],
      notes: '10/18 辛特拉一日遊。去程 CP 憑 Lisboa Card；17:00 回程現場購票。',
    },
    {
      id: 'tram-porto-1',
      category: 'transportation',
      name: '波圖 1 號復古電車',
      date: '2026-10-22',
      amountEur: 12,
      breakdown: [
        { label: 'Infante↔Foz 單程票（2 人 × €6）', amountEur: 12 },
      ],
      notes: '10/22 大西洋海濱日。上車向司機購買單程票。',
    },
    {
      id: 'uber-bolt',
      category: 'transportation',
      name: 'Uber / Bolt 叫車',
      date: '2026-10-15',
      amountEur: 72,
      breakdown: [
        { label: '機場→Montebelo（10/15）', amountEur: 12 },
        { label: 'Montebelo→聖若熱城堡（10/16）', amountEur: 5 },
        { label: 'Montebelo→Santa Apolónia（10/20 清晨）', amountEur: 8 },
        { label: '里斯本市區短途（10/16–19）', amountEur: 18 },
        { label: 'Campanhã→Porto Almada 180（10/20）', amountEur: 7 },
        { label: 'Foz→水晶宮花園（10/22）', amountEur: 7 },
        { label: 'Porto Almada→Campanhã（10/24）', amountEur: 6 },
        { label: 'Oriente→機場 Terminal 1（10/24）', amountEur: 12 },
        { label: '波圖市區短途備用', amountEur: 5 },
      ],
      notes: '拖行李或陡坡路段建議叫車，單程多為 €4–€8。',
    },
    {
      id: 'ticket-sintra-national',
      category: 'tickets',
      name: '辛特拉國家宮殿 Palácio Nacional de Sintra',
      date: '2026-10-18',
      amountEur: 26,
      breakdown: [
        { label: '入場門票（2 人，官網或現場）', amountEur: 26 },
      ],
      notes: '不含在里斯本卡內。建議官網提前購票。',
    },
    {
      id: 'ticket-regaleira',
      category: 'tickets',
      name: '雷加萊拉莊園 Quinta da Regaleira',
      date: '2026-10-18',
      amountEur: 36,
      breakdown: [
        { label: '入場門票（2 人）', amountEur: 36 },
      ],
    },
    {
      id: 'ticket-castle',
      category: 'tickets',
      name: '聖若熱城堡 Castelo de S. Jorge',
      date: '2026-10-16',
      amountEur: 0,
      breakdown: [
        { label: '憑 10/16 啟用的 Lisboa Card 免費入場', amountEur: 0 },
      ],
    },
    {
      id: 'ticket-lello',
      category: 'tickets',
      name: '萊羅書店 Livraria Lello',
      date: '2026-10-21',
      amountEur: 20,
      breakdown: [
        { label: 'Ticket-Voucher（2 人，可抵扣購書）', amountEur: 20 },
      ],
      notes: '出發前 30 天官網預約 10/21 早上場次。',
    },
    {
      id: 'ticket-bolsa',
      category: 'tickets',
      name: '證券交易所宮 Palácio da Bolsa',
      date: '2026-10-21',
      amountEur: 20,
      breakdown: [
        { label: '導覽門票（2 人，英文/中文場次）', amountEur: 20 },
      ],
      notes: '出發前 30 天官網預約 10/21 導覽場次。',
    },
    {
      id: 'ticket-clerigos',
      category: 'tickets',
      name: '牧師塔 Torre dos Clérigos',
      date: '2026-10-21',
      amountEur: 16,
      breakdown: [
        { label: '登塔門票（2 人）', amountEur: 16 },
      ],
    },
    {
      id: 'ticket-sao-francisco',
      category: 'tickets',
      name: '聖弗朗西斯科教堂',
      date: '2026-10-22',
      amountEur: 14,
      breakdown: [
        { label: '入場門票（2 人）', amountEur: 14 },
      ],
    },
    {
      id: 'ticket-casa-musica',
      category: 'tickets',
      name: '波圖音樂廳 Casa da Música',
      date: '2026-10-23',
      amountEur: 24,
      breakdown: [
        { label: '導覽門票（2 人估算）', amountEur: 24 },
      ],
    },
    {
      id: 'ticket-jeronimos-slot',
      category: 'tickets',
      name: '哲羅姆派修道院預約',
      date: '2026-10-17',
      amountEur: 0,
      breakdown: [
        { label: '憑里斯本卡免費入場（官網預約時段）', amountEur: 0 },
      ],
      notes: '門票含在里斯本卡，需至官方系統登記入場時段。',
    },
    {
      id: 'ticket-santa-justa',
      category: 'tickets',
      name: '聖胡斯塔升降機',
      date: '2026-10-16',
      amountEur: 0,
      breakdown: [
        { label: '憑 Lisboa Card 免費或折扣登頂', amountEur: 0 },
      ],
    },
  ],
};

export function formatDateZh(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（週${weekdays[d.getDay()]}）`;
}

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

/** @deprecated Use EUR_TO_HKD */
export const CNY_TO_HKD = EUR_TO_HKD;
