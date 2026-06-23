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

const categoryIcons: Record<ExpenseItemType['category'], string> = {
  accommodation: '🏨',
  transportation: '🚇',
  tickets: '🎫',
};

const categoryColors: Record<ExpenseItemType['category'], string> = {
  accommodation: 'bg-coral/20 text-terracotta dark:text-coral',
  transportation: 'bg-sage/20 text-sage',
  tickets: 'bg-lavender/20 text-lavender',
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
    <section id="expenses" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h2 className="text-xl font-bold">費用與預算</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowEur(!showEur)}
          className="rounded-full border border-midnight/10 px-3 py-1.5 text-xs transition hover:bg-white/50 dark:border-cream/10 dark:hover:bg-dusk/50"
        >
          {showEur ? '顯示 HKD' : '顯示 EUR'}
        </button>
      </div>

      <div className="glass-card pastel-gradient grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-xs text-midnight/50 dark:text-cream/50">總支出</p>
          <p className="text-2xl font-bold text-terracotta dark:text-coral">
            {formatAmount(totals.total)}
          </p>
          {!showEur && (
            <p className="text-xs text-midnight/40 dark:text-cream/40">
              ≈ {formatEur(totals.total)}
            </p>
          )}
        </div>
        {(['accommodation', 'transportation', 'tickets'] as const).map((cat) => (
          <div key={cat}>
            <p className="text-xs text-midnight/50 dark:text-cream/50">
              {categoryIcons[cat]} {categoryLabels[cat]}
            </p>
            <p className="text-lg font-semibold">{formatAmount(totals[cat])}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'accommodation', 'transportation', 'tickets'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
              filter === cat
                ? 'bg-terracotta text-white dark:bg-coral'
                : 'bg-white/50 dark:bg-dusk/50'
            }`}
          >
            {cat === 'all' ? '全部' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            exchangeRate={exchangeRate}
            showEur={showEur}
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
}: {
  expense: ExpenseItem;
  exchangeRate: number;
  showEur: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`rounded-xl px-2 py-1 text-lg ${categoryColors[expense.category]}`}>
            {categoryIcons[expense.category]}
          </span>
          <div>
            <p className="font-semibold">{expense.name}</p>
            <p className="text-xs text-midnight/50 dark:text-cream/50">
              {categoryLabels[expense.category]} · {expense.date}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-terracotta dark:text-coral">
            {showEur ? formatEur(expense.amountEur) : formatHkd(expense.amountEur, exchangeRate)}
          </p>
          {!showEur && (
            <p className="text-xs text-midnight/40 dark:text-cream/40">
              {formatEur(expense.amountEur)}
            </p>
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-midnight/5 px-4 pb-4 dark:border-cream/5">
          <p className="mb-2 mt-3 text-xs font-medium text-midnight/50 dark:text-cream/50">
            費用明細
          </p>
          <ul className="space-y-1.5">
            {expense.breakdown.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-midnight/70 dark:text-cream/70">{item.label}</span>
                <span>
                  {showEur
                    ? formatEur(item.amountEur)
                    : formatHkd(item.amountEur, exchangeRate)}
                </span>
              </li>
            ))}
          </ul>
          {expense.notes && (
            <p className="mt-3 text-xs italic text-midnight/50 dark:text-cream/50">
              💡 {expense.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
