# Spain Travel Itinerary — 西班牙旅行行程 PWA

離線優先的西班牙旅行行程規劃 Web App，專為 2026 年 10 月 Barcelona & Madrid 之旅設計。

## 功能特色

- **繁體中文介面**，景點與地名保留英文原文
- **航班資訊／儀表板** — Cathay Pacific CX321 / CX318
- **每日行程** — 10 天完整行程（Barcelona + Madrid）
- **互動地圖** — Leaflet + OpenStreetMap，支援離線瓦片快取
- **費用追蹤** — 住宿、交通、門票分類，HKD 顯示並可切換 EUR
- **離線優先** — Service Worker (Workbox) + IndexedDB (LocalForage)
- **深色／淺色模式** — 預設深色模式
- **PWA** — 可安裝至手機主畫面

## 技術棧

- React 19 + TypeScript + Vite 7
- Tailwind CSS 4
- vite-plugin-pwa (Workbox)
- LocalForage (IndexedDB)
- Leaflet + react-leaflet

## 線上版本

**手機瀏覽器網址：** https://mantam0404.github.io/Travel-Itinerary-Web-App/

> 首次使用需由倉庫擁有者在 GitHub 啟用 Pages（只需設定一次）：
> 1. 開啟 [Repository Settings → Pages](https://github.com/mantam0404/Travel-Itinerary-Web-App/settings/pages)
> 2. **Source** 選擇 **Deploy from a branch**
> 3. **Branch** 選 `gh-pages`，資料夾選 `/ (root)`，按 **Save**
> 4. 等待約 1–2 分鐘後，即可在手機瀏覽器開啟上方網址

建議加入主畫面（Add to Home Screen）以獲得最佳 PWA 體驗。

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

## 離線使用

1. 首次以網路連線開啟應用程式
2. 瀏覽地圖各區域以快取瓦片
3. 離線時自動使用快取資料與已快取地圖

## 專案結構

```
src/
├── components/     # UI 元件
├── data/         # 行程、航班、費用資料
├── hooks/        # 離線同步、主題切換
├── services/     # IndexedDB 儲存服務
├── App.tsx
└── main.tsx
```
