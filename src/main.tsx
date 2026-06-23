import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

registerSW({
  onNeedRefresh() {
    if (confirm('有新版本可用，是否立即更新？')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.info('應用程式已可離線使用');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
