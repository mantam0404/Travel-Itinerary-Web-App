import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';

interface SyncStatusProps {
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
  variant?: 'default' | 'hero' | 'hero-light';
}

const statusConfig: Record<ConnectionStatus, { label: string; color: string; dot: string }> = {
  online: { label: '已連線', color: 'text-[var(--ln-accent)]', dot: 'bg-[var(--ln-accent)]' },
  offline: { label: '離線模式', color: 'text-[#b8860b]', dot: 'bg-[#b8860b]' },
  syncing: { label: '同步中…', color: 'text-[var(--ln-accent)]', dot: 'bg-[var(--ln-accent)] animate-pulse' },
};

const heroStatusConfig: Record<ConnectionStatus, { label: string; color: string; dot: string }> = {
  online: { label: '已連線', color: 'text-white/85', dot: 'bg-white/90' },
  offline: { label: '離線模式', color: 'text-[#e8c547]', dot: 'bg-[#e8c547]' },
  syncing: { label: '同步中…', color: 'text-white/85', dot: 'bg-white/90 animate-pulse' },
};

const heroLightStatusConfig: Record<ConnectionStatus, { label: string; color: string; dot: string }> = {
  online: { label: '已連線', color: 'text-[#4f5cc6]', dot: 'bg-[#4f5cc6]' },
  offline: { label: '離線模式', color: 'text-[#b8860b]', dot: 'bg-[#b8860b]' },
  syncing: { label: '同步中…', color: 'text-[#4f5cc6]', dot: 'bg-[#4f5cc6] animate-pulse' },
};

export function SyncStatus({ status, syncMeta, onSync, variant = 'default' }: SyncStatusProps) {
  const cfg =
    variant === 'hero'
      ? heroStatusConfig[status]
      : variant === 'hero-light'
        ? heroLightStatusConfig[status]
        : statusConfig[status];

  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <span className={`inline-flex items-center gap-1.5 ${cfg.color}`}>
        <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>
      {syncMeta?.lastSyncedAt && status !== 'syncing' && (
        <span
          className={
            variant === 'hero'
              ? 'text-white/60'
              : variant === 'hero-light'
                ? 'text-[#5c6068]'
                : 'text-[var(--ln-ink-tertiary)]'
          }
        >
          上次同步{' '}
          {new Date(syncMeta.lastSyncedAt).toLocaleTimeString('zh-Hant', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )}
      {status === 'online' && (
        <button
          type="button"
          onClick={onSync}
          className={`font-medium transition hover:opacity-80 ${
            variant === 'hero'
              ? 'text-white/90'
              : variant === 'hero-light'
                ? 'text-[#4f5cc6]'
                : 'text-[var(--ln-accent)]'
          }`}
          aria-label="手動同步"
        >
          同步
        </button>
      )}
    </div>
  );
}
