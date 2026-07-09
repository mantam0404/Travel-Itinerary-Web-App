import { useState } from 'react';
import type { ExpenseItem } from '../data/tripData';
import {
  categoryLabels,
  formatEur,
  formatHkd,
  formatHkdAmount,
  type ExpenseItem as ExpenseItemType,
} from '../data/tripData';
import { ScrollReveal } from './ScrollReveal';
import { IconChevron } from './icons';

interface ExpenseTrackerProps {
  expenses: ExpenseItem[];
  exchangeRate: number;
}

const categoryEmoji: Record<ExpenseItemType['category'], string> = {
  accommodation: '住宿',
  transportation: '交通',
  tickets: '門票',
  flights: '機票',
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
    { accommodation: 0, transportation: 0, tickets: 0, flights: 0, total: 0 } as Record<string, number>,
  );

  const formatAmount = (eur: number) =>
    showEur ? formatEur(eur) : formatHkd(eur, exchangeRate);

  return (
    <section id="expenses" className="space-y-4 px-4 py-6">
      <ScrollReveal>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-[var(--ln-ink-secondary)]">匯率 €1 = HK${exchangeRate.toFixed(2)}</p>
          <button
            type="button"
            onClick={() => setShowEur(!showEur)}
            className="ln-chip ln-pressable shrink-0 text-xs"
          >
            {showEur ? '顯示 HKD' : '顯示 EUR'}
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={60}>
        <div className="ln-panel grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-3">
            <p className="ln-label">總支出（含參考機票）</p>
            <p className="ln-tabular mt-1 text-2xl font-semibold text-[var(--ln-accent)]">
              {formatAmount(totals.total)}
            </p>
            {!showEur && (
              <p className="mt-0.5 text-xs text-[var(--ln-ink-tertiary)]">≈ {formatEur(totals.total)}</p>
            )}
          </div>
          {(['flights', 'accommodation', 'transportation', 'tickets'] as const).map((cat) => (
            <div key={cat}>
              <p className="text-xs text-[var(--ln-ink-secondary)]">{categoryLabels[cat]}</p>
              <p className="ln-tabular mt-1 text-lg font-semibold">{formatAmount(totals[cat])}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(['all', 'flights', 'accommodation', 'transportation', 'tickets'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`ln-chip ln-pressable shrink-0 ${filter === cat ? 'ln-chip-active' : ''}`}
            >
              {cat === 'all' ? '全部' : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="space-y-2">
        {filtered.map((expense, index) => (
          <ScrollReveal key={expense.id} delay={120 + index * 40}>
            <ExpenseCard
              expense={expense}
              exchangeRate={exchangeRate}
              showEur={showEur}
              categoryLabel={categoryEmoji[expense.category]}
            />
          </ScrollReveal>
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
        className="ln-pressable flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-[var(--ln-bg-hover)]"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-snug">{expense.name}</p>
          <p className="mt-0.5 text-xs text-[var(--ln-ink-secondary)]">
            {categoryLabel} · {expense.date}
          </p>
        </div>
          <div className="flex shrink-0 items-center gap-2 text-right">
          <div>
            <p className="ln-tabular font-semibold text-[var(--ln-accent)]">
              {showEur ? formatEur(expense.amountEur) : formatHkd(expense.amountEur, exchangeRate)}
            </p>
            {!showEur && (
              <p className="text-xs text-[var(--ln-ink-tertiary)]">{formatEur(expense.amountEur)}</p>
            )}
          </div>
          <span className={`ln-chevron ml-2 text-[var(--ln-ink-tertiary)] ${expanded ? 'ln-chevron-open' : ''}`}>
            <IconChevron />
          </span>
        </div>
      </button>

      <div className={`ln-accordion-body ${expanded ? 'ln-accordion-body-open' : ''}`}>
        <div className="ln-accordion-inner">
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
            {expense.amountHkd && (
              <p className="mt-2 text-xs font-medium text-[var(--ln-ink-secondary)]">
                參考報價：{formatHkdAmount(expense.amountHkd)}
                {expense.quotedAt && (
                  <span className="text-[var(--ln-ink-tertiary)]"> · 更新於 {expense.quotedAt}</span>
                )}
              </p>
            )}
            {expense.sourceUrl && (
              <a
                href={expense.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[var(--ln-accent)] underline underline-offset-2"
              >
                在 Google Flights 查看最新價格 →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
