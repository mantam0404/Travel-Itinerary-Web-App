# Portugal Travel Itinerary — 葡萄牙旅行行程 PWA

離線優先的葡萄牙旅行行程規劃 Web App，專為 **2026 年 10 月 15–24 日** 里斯本 · 辛特拉 · 波圖 **10 日 9 夜**自由行設計。

> **分支說明：** 此為獨立行程分支 `cursor/portugal-trip-a2de`，與 `main`（西班牙）及 `cursor/guangzhou-trip-a2de`（廣州）互不干擾。**請勿合併至 `main`。**

## 線上版本

**手機瀏覽器網址：** https://mantam0404.github.io/Travel-Itinerary-Web-App/

推送至 `cursor/portugal-trip-a2de` 會觸發 GitHub Actions 部署至 `gh-pages`。與廣州分支共用同一 URL，**後部署的分支會覆蓋線上版本**。

建議加入主畫面（Add to Home Screen）以獲得最佳 PWA 體驗。若曾開啟過其他行程版本，請清除網站資料後重新開啟。

---

## 行程概要

| 項目 | 內容 |
|------|------|
| **旅行日期** | 2026-10-15（四）→ 2026-10-24（六） |
| **天數** | 10 日 9 夜 |
| **主要城市** | 里斯本 Lisboa、辛特拉 Sintra、波圖 Porto |
| **幣別** | EUR（參考匯率 1 EUR = 8.45 HKD） |
| **主要交通** | CP 國鐵、48 小時里斯本卡、Uber/Bolt、步行 |

### 航班資訊

| 方向 | 航班 | 日期 | 時間（當地） |
|------|------|------|--------------|
| 去程 | EK381 HKG→DXB · EK191 DXB→LIS | 10/15 | 00:40 香港出發 → 04:25 迪拜 → 07:25 迪拜 → **12:35 抵里斯本** |
| 回程 | EK192 LIS→DXB · EK382 DXB→HKG | 10/24 | 14:15 里斯本 → 次日 00:50 迪拜 → 03:30 迪拜 → **10/25 14:45 抵香港** |

---

## 每日行程

| 日期 | 地點 | 重點 |
|------|------|------|
| **10/15（四）** | 里斯本 | EK191 抵達、Check-in、Baixa 漫步、商業廣場 Praça do Comércio |
| **10/16（五）** | 貝倫區 Belém | 09:00 啟用里斯本卡、哲羅姆派修道院、貝倫塔、Pastéis de Belém、LX Factory |
| **10/17（六）** | 辛特拉 Sintra | CP 火車、佩納宮（第一場）、雷加萊拉莊園、傍晚返里斯本 |
| **10/18（日）** | 里斯本 | 聖若熱城堡（09:00 前）、太陽門觀景台、28 號電車、法多晚餐 |
| **10/19（一）** | 波圖 Porto | CP Alfa Pendular 高鐵、Check-in、里貝拉 Ribeira、路易一世大橋夕陽 |
| **10/20（二）** | 波圖 | 萊羅書店、聖本篤車站、牧師塔、加亞新城品波特酒 |
| **10/21（三）** | 阿威羅 Aveiro | São Bento 站火車一日遊、運河漫步、傍晚返波圖 |
| **10/22（四）** | 里斯本 | 波圖午餐後 CP 高鐵返里斯本、Time Out Market 晚宴 |
| **10/23（五）** | 卡斯凱什 Cascais | Cais do Sodré 火車、濱海小鎮、地獄之口 Boca do Inferno、返里斯本 |
| **10/24（六）** | 離境 | 11:15 前抵機場、EK192 返港 |

---

## 預訂與票券清單

| 項目 | 葡萄牙文 | 建議行動 |
|------|----------|----------|
| **48 小時里斯本卡** | Lisboa Card 48h | 10/15 機場 Ask Me Lisboa 領實體卡，10/16 09:00 啟用 |
| **CP 國鐵高鐵票** | Alfa Pendular (AP) | 提前 30–60 天購早鳥票（10/19 去波圖、10/22 返里斯本） |
| **佩納宮門票** | Palácio Nacional da Pena | 官網預約 10/17 09:00 或 09:30 第一場 |
| **萊羅書店門票** | Livraria Lello | 官網購買 Ticket-Voucher |
| **哲羅姆派修道院** | Mosteiro dos Jerónimos | 憑里斯本卡號至官方系統預約入場時段 |

---

## 功能特色

- **繁體中文介面**，景點與地名保留葡文／英文原文
- **首頁預設展開行程** — hero 封面圖、去程／回程航班卡片
- **每日行程** — 10 天完整時間軸，點擊景點可跳轉地圖
- **互動地圖** — 22 個景點標記，Leaflet + OpenStreetMap，支援離線瓦片快取
- **費用與預算** — 機票、住宿、交通、門票分類，HKD / EUR 切換顯示
- **大字體** — 120% root font-size，方便長輩閱讀
- **深色／淺色模式** — 首頁 hero 與地圖／費用頁標題列可切換
- **首頁／地圖／費用** — 三個底部分頁

---

## 景點地圖（22 處）

里斯本機場、商業廣場、哲羅姆派修道院、貝倫塔、Pastéis de Belém、LX Factory、佩納宮、雷加萊拉莊園、聖若熱城堡、太陽門觀景台、阿法瑪區、里貝拉、路易一世大橋、萊羅書店、聖本篤車站、牧師塔、加亞新城、杜羅河谷、阿威羅、Time Out Market、卡斯凱什、地獄之口。

---

## 技術棧

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- vite-plugin-pwa (Workbox)
- LocalForage (IndexedDB) — 儲存空間 `portugal-travel-app`
- Leaflet + react-leaflet

---

## 快速開始

```bash
npm install
npm run dev
```

開啟 http://localhost:5173

## 建置與預覽

```bash
npm run build
npm run preview
```

### 圖片腳本

```bash
npm run images:attractions   # 下載 Wikimedia 景點圖
npm run images:trip            # 生成 hero 與每日封面圖
npm run images:all             # PWA 圖示 + 景點圖
```

## 離線使用

1. 首次以網路連線開啟應用程式
2. 瀏覽地圖各區域以快取瓦片
3. 離線時自動使用快取資料與已快取地圖

## 專案結構

```
src/
├── components/       # UI 元件（HomePage、TravelMap、ItineraryDayCard…）
├── data/
│   └── tripData.ts   # 葡萄牙行程、航班、景點（主要資料來源）
├── constants/
│   └── flightQuotes.ts
├── hooks/            # 離線同步、主題
├── services/         # IndexedDB 儲存、航班報價同步
├── utils/
│   └── itineraryImages.ts
├── App.tsx
└── main.tsx

scripts/
├── attraction-sources.json
├── download-attraction-images.mjs
├── generate-trip-images.mjs
└── fetch-flight-quote.mjs

.github/workflows/
└── deploy-portugal.yml   # 推送本分支時部署 gh-pages
```

## 修改行程

編輯 `src/data/tripData.ts` 後：

1. 更新 `version` 欄位（強制 PWA 快取刷新）
2. 若新增景點，更新 `scripts/attraction-sources.json` 並執行 `npm run images:attractions`
3. 若需更新每日封面，調整 `scripts/generate-trip-images.mjs` 的 `DAY_SOURCES`
4. 執行 `npm run build` 驗證建置

---

## 授權

私人旅行規劃專案。
