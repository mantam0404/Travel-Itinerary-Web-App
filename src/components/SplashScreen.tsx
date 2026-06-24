import { useEffect, useState } from 'react';

interface SplashScreenProps {
  isDark: boolean;
  ready: boolean;
  onComplete: () => void;
}

const MIN_DISPLAY_MS = 1400;
const FADE_MS = 500;

export function SplashScreen({ isDark, ready, onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'visible' | 'exit' | 'done'>('visible');

  useEffect(() => {
    if (!ready) return;

    const started = Date.now();
    const timer = window.setTimeout(() => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setPhase('exit'), wait);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (phase !== 'exit') return;
    const timer = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`ln-splash ${isDark ? '' : 'ln-splash-light'} ${phase === 'exit' ? 'ln-splash-exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="載入巴塞隆納旅行行程"
    >
      <div className="ln-splash-glow" aria-hidden />
      <div className="ln-splash-content">
        <div className="ln-splash-mark" aria-hidden>
          <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 18c-11 0-20 9-20 20 0 14 20 36 20 36s20-22 20-36c0-11-9-20-20-20z"
              fill="url(#splash-pin)"
            />
            <circle cx="50" cy="38" r="7.5" fill="#ffffff" />
            <path
              d="M28 62l8-3 5 2 18-10 3 1-4 9-5-1-8 3-3-5 2-6-6 10z"
              fill="#ffffff"
              opacity="0.95"
            />
            <defs>
              <linearGradient id="splash-pin" x1="30" y1="18" x2="70" y2="74">
                <stop offset="0%" stopColor="#ff385c" />
                <stop offset="55%" stopColor="#e00b41" />
                <stop offset="100%" stopColor="#92174d" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="ln-splash-eyebrow">Barcelona · Oct 15–24, 2026</p>
        <h1 className="ln-splash-title">巴塞隆納旅行行程</h1>
        <p className="ln-splash-subtitle">離線行程 · 地圖 · 費用追蹤</p>
        <div className="ln-splash-loader" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
