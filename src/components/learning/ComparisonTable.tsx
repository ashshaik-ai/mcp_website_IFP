"use client";

import { useI18n } from "@/lib/i18n/context";
import type { Bi, PortalEntry } from "@/content/portals";

const isBi = (v: unknown): v is Bi =>
  typeof v === "object" && v !== null && "te" in v && "en" in v;

/* A table rather than cards: the rows only mean anything read against each
   other, and a reader is scanning for one practice, not reading top to
   bottom. Scrolls inside its own container so the page never moves sideways. */
export function ComparisonTable({
  rows,
  columns,
}: {
  rows: PortalEntry[];
  columns: { key: string; label: Bi }[];
}) {
  const { lang } = useI18n();

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--if-gold)]/20 bg-white">
      <table className="w-full min-w-[34rem] text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="text-left text-[11px] font-bold uppercase tracking-wide text-[var(--if-text-muted)] px-4 py-3 border-b border-[var(--if-gold)]/20 whitespace-nowrap"
              >
                {c.label[lang]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-[var(--if-gold)]/10 last:border-b-0">
              {columns.map((c, ci) => {
                const v = r[c.key];
                const value = isBi(v) ? v[lang] : typeof v === "string" ? v : "";
                const Cell = ci === 0 ? "th" : "td";
                return (
                  <Cell
                    key={c.key}
                    {...(ci === 0 ? { scope: "row" as const } : {})}
                    className={
                      ci === 0
                        ? "text-left align-top px-4 py-3 font-semibold text-[var(--if-green)]"
                        : "align-top px-4 py-3 text-[var(--if-text)] text-pretty"
                    }
                  >
                    {value}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
