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

> **GitHub Pages 設定：** 請將 Branch 設為 `gh-pages`（不是 `main` 或功能分支）。`main` 每次 push 會由 GitHub Actions 自動建置並更新 `gh-pages`。

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
