import type { ConnectionStatus } from '../hooks/useOfflineSync';
import type { SyncMeta } from '../services/storage';

interface SyncStatusProps {
  status: ConnectionStatus;
  syncMeta: SyncMeta | null;
  onSync: () => void;
}

const statusConfig: Record<ConnectionStatus, { label: string; color: string; dot: string }> = {
  online: { label: '已連線', color: 'text-sage', dot: 'bg-sage' },
  offline: { label: '離線模式', color: 'text-coral', dot: 'bg-coral' },
  syncing: { label: '同步中…', color: 'text-lavender', dot: 'bg-lavender animate-pulse' },
};

export function SyncStatus({ status, syncMeta, onSync }: SyncStatusProps) {
  const cfg = statusConfig[status];

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`inline-flex items-center gap-1.5 ${cfg.color}`}>
        <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>
      {syncMeta?.lastSyncedAt && status !== 'syncing' && (
        <span className="text-midnight/50 dark:text-cream/40">
          · 上次同步 {new Date(syncMeta.lastSyncedAt).toLocaleTimeString('zh-Hant', { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
      {status === 'online' && (
        <button
          type="button"
          onClick={onSync}
          className="ml-1 rounded-full px-2 py-0.5 text-lavender transition hover:bg-lavender/10"
          aria-label="手動同步"
        >
          同步
        </button>
      )}
    </div>
  );
}
