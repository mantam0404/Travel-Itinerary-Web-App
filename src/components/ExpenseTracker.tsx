import { useState } from 'react';
import type { ExpenseItem } from '../data/tripData';
import {
  categoryLabels,
  formatEur,
  formatHkd,
  type ExpenseItem as ExpenseItemType,
} from '../data/tripData';

interface ExpenseTrackerProps {
  expenses: ExpenseItem[];
  exchangeRate: number;
}

const categoryEmoji: Record<ExpenseItemType['category'], string> = {
  accommodation: '住宿',
  transportation: '交通',
  tickets: '門票',
};

export function ExpenseTracker({ expenses, exchangeRate }: ExpenseTrackerProps) {
  const [showEur, setShowEur] = useState(false);
  const [filter, setFilter] = useState<ExpenseItemType['category'] | 'all'>('all');

  const filtered = filter === 'all' ? expenses : expenses.filter((e) => e.category === filter);

  const totals = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amountEur;
      acc.total += e.amountEur;
      return acc;
    },
    { accommodation: 0, transportation: 0, tickets: 0, total: 0 } as Record<string, number>,
  );

  const formatAmount = (eur: number) =>
    showEur ? formatEur(eur) : formatHkd(eur, exchangeRate);

  return (
    <section id="expenses" className="space-y-4 px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--ln-ink-secondary)]">匯率 €1 = HK${exchangeRate.toFixed(2)}</p>
        <button type="button" onClick={() => setShowEur(!showEur)} className="ln-chip shrink-0 text-xs">
          {showEur ? '顯示 HKD' : '顯示 EUR'}
        </button>
      </div>

      <div className="ln-panel grid grid-cols-2 gap-3 p-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="ln-label">總支出</p>
          <p className="ln-tabular mt-1 text-2xl font-semibold text-[var(--ln-accent)]">
            {formatAmount(totals.total)}
          </p>
          {!showEur && (
            <p className="mt-0.5 text-xs text-[var(--ln-ink-tertiary)]">≈ {formatEur(totals.total)}</p>
          )}
        </div>
        {(['accommodation', 'transportation', 'tickets'] as const).map((cat) => (
          <div key={cat}>
            <p className="text-xs text-[var(--ln-ink-secondary)]">{categoryLabels[cat]}</p>
            <p className="ln-tabular mt-1 text-lg font-semibold">{formatAmount(totals[cat])}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {(['all', 'accommodation', 'transportation', 'tickets'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`ln-chip shrink-0 ${filter === cat ? 'ln-chip-active' : ''}`}
          >
            {cat === 'all' ? '全部' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            exchangeRate={exchangeRate}
            showEur={showEur}
            categoryLabel={categoryEmoji[expense.category]}
          />
        ))}
      </div>
    </section>
  );
}

function ExpenseCard({
  expense,
  exchangeRate,
  showEur,
  categoryLabel,
}: {
  expense: ExpenseItem;
  exchangeRate: number;
  showEur: boolean;
  categoryLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="ln-panel overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-[var(--ln-bg-hover)]"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-snug">{expense.name}</p>
          <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">
            {categoryLabel} · {expense.date}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="ln-tabular font-semibold text-[var(--ln-accent)]">
            {showEur ? formatEur(expense.amountEur) : formatHkd(expense.amountEur, exchangeRate)}
          </p>
          {!showEur && (
            <p className="text-xs text-[var(--ln-ink-tertiary)]">{formatEur(expense.amountEur)}</p>
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[var(--ln-border)] px-4 pb-4">
          <p className="ln-label mb-2 mt-3">費用明細</p>
          <ul className="space-y-2">
            {expense.breakdown.map((item, i) => (
              <li key={i} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0 text-[var(--ln-ink-secondary)]">{item.label}</span>
                <span className="ln-tabular shrink-0 font-medium">
                  {showEur ? formatEur(item.amountEur) : formatHkd(item.amountEur, exchangeRate)}
                </span>
              </li>
            ))}
          </ul>
          {expense.notes && (
            <p className="mt-3 text-xs leading-relaxed text-[var(--ln-ink-tertiary)]">{expense.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}
