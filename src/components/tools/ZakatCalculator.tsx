"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  NISAB_GOLD_GRAMS,
  NISAB_SILVER_GRAMS,
  calculateZakat,
  formatInr,
  type Assets,
  type Rates,
} from "@/lib/zakat";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  could_not_load_current_gold: { te: "ప్రస్తుత బంగారం, వెండి ధరలు లోడ్ కాలేదు. దయచేసి పేజీని రిఫ్రెష్ చేయండి.", en: "Could not load current gold and silver rates. Please refresh the page." },
  zakat_calculator: { te: "జకాత్ కాలిక్యులేటర్", en: "Zakat Calculator" },
  loading_rates: { te: "ధరలు లోడ్ అవుతున్నాయి…", en: "Loading rates…" },
  net_wealth: { te: "నికర సంపద", en: "Net wealth" },
  nisab_threshold: { te: "నిసాబ్ పరిమితి", en: "Nisab threshold" },
  zakat_due_2_5: { te: "చెల్లించవలసిన జకాత్ (2.5%)", en: "Zakat due (2.5%)" },
} as const;

const FIELDS: { key: keyof Assets; te: string; en: string; unit: "g" | "inr" }[] = [
  { key: "gold", te: "బంగారం", en: "Gold", unit: "g" },
  { key: "silver", te: "వెండి", en: "Silver", unit: "g" },
  { key: "cash", te: "నగదు & బ్యాంక్", en: "Cash & bank", unit: "inr" },
  { key: "business", te: "వ్యాపార సరుకు", en: "Business stock", unit: "inr" },
  { key: "liabilities", te: "అప్పులు (తీసివేయబడతాయి)", en: "Debts (deducted)", unit: "inr" },
];

/* Held as the text the visitor typed, not as numbers. Numbers meant the five
   fields opened pre-filled with "0": you could not clear one (clearing parsed
   back to 0 and React put the zero straight back), and typing in front of it
   turned an intended 5 into 50. Now an empty field is empty, and the number is
   derived only when the calculation runs. */
type Draft = Record<keyof Assets, string>;
const EMPTY_DRAFT: Draft = { gold: "", silver: "", cash: "", business: "", liabilities: "" };

const toAssets = (d: Draft): Assets => ({
  gold: Number(d.gold) || 0,
  silver: Number(d.silver) || 0,
  cash: Number(d.cash) || 0,
  business: Number(d.business) || 0,
  liabilities: Number(d.liabilities) || 0,
});

/* rates.json is written by a scheduled job against a third-party source. If it
   ever lands with a missing or non-numeric field the calculator used to render
   "Gold Rundefined/g" and a nisab of NaN, which looks like a broken tool
   rather than a stale one. */
const ratesAreUsable = (r: unknown): r is Rates => {
  const x = r as Rates | null;
  return (
    !!x &&
    Number.isFinite(x.goldGramInr) &&
    Number.isFinite(x.silverGramInr) &&
    x.goldGramInr > 0 &&
    x.silverGramInr > 0
  );
};

export function ZakatCalculator() {
  const { lang } = useI18n();
  const [rates, setRates] = useState<Rates | null>(null);
  const [failed, setFailed] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  /* Nothing is owed until something is entered. The result panel used to
     appear the moment the rates loaded, announcing "no Zakat is due" to a
     visitor who had not typed anything. */
  const touched = Object.values(draft).some((v) => v.trim() !== "");

  useEffect(() => {
    let live = true;
    fetch("/rates.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Rates) => {
        if (!live) return;
        if (ratesAreUsable(d)) setRates(d);
        else setFailed(true);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  const result = useMemo(
    () => (rates && touched ? calculateZakat(toAssets(draft), rates) : null),
    [draft, rates, touched],
  );

  if (failed) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
        {copy.could_not_load_current_gold[lang]}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white overflow-hidden">
      <div className="px-6 py-5 border-b border-[var(--if-gold)]/20">
        <h3 className="font-display text-xl font-bold text-[var(--if-green)]">
          {copy.zakat_calculator[lang]}
        </h3>
        <p className="text-sm text-[var(--if-text-muted)] mt-1 text-pretty">
          {rates
            ? lang === "te"
              ? `బంగారం ₹${rates.goldGramInr}/గ్రా · వెండి ₹${rates.silverGramInr}/గ్రా · ${rates.date}`
              : `Gold ₹${rates.goldGramInr}/g · Silver ₹${rates.silverGramInr}/g · ${rates.date}`
            : copy.loading_rates[lang]}
        </p>
      </div>

      <div className="px-6 py-5 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const id = `zakat-${f.key}`;
          return (
            <label key={f.key} htmlFor={id} className="block">
              <span className="block text-xs font-bold uppercase tracking-wide text-[var(--if-green)] mb-1.5">
                {f[lang]}
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--if-text-muted)]">
                  {f.unit === "g" ? "g" : "₹"}
                </span>
                <input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={draft[f.key]}
                  onChange={(e) => {
                    const v = e.target.value;
                    /* Digits and at most one point, up to fifteen of them.
                       Number(v) >= 0 let "1e999" through, which multiplied out
                       to Infinity and printed the zakat due as an infinity
                       sign; it also accepted a lone "-", which the input then
                       held while swallowing the digit typed after it. An empty
                       string and a partial "12." stay valid so the field can
                       still be cleared and a decimal still typed. */
                    if (v === "" || (/^\d{0,15}(\.\d{0,4})?$/.test(v))) {
                      setDraft((d) => ({ ...d, [f.key]: v }));
                    }
                  }}
                  placeholder="0"
                  /* 16px minimum, or iOS Safari zooms the page on focus. */
                  className="w-full min-h-11 pl-8 pr-3 text-base rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 text-[var(--if-text)] tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
                />
              </div>
            </label>
          );
        })}
      </div>

      {result && (
        <div className="px-6 pb-6" aria-live="polite">
          <dl className="rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/20 divide-y divide-[var(--if-gold)]/10 text-sm">
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-[var(--if-text-muted)]">
                {copy.net_wealth[lang]}
              </dt>
              <dd className="font-mono tabular-nums font-semibold">{formatInr(result.netWealth)}</dd>
            </div>
            <div className="flex justify-between px-4 py-2.5">
              <dt className="text-[var(--if-text-muted)]">
                {copy.nisab_threshold[lang]}
              </dt>
              <dd className="font-mono tabular-nums">{formatInr(result.nisab)}</dd>
            </div>
          </dl>

          <div
            className={`mt-4 rounded-xl p-5 text-center border ${
              result.meetsNisab
                ? "bg-[var(--if-green)] border-transparent"
                : "bg-white border-[var(--if-gold)]/20"
            }`}
          >
            {result.meetsNisab ? (
              <>
                <p className="text-[11px] uppercase tracking-widest text-[var(--if-gold-light)]">
                  {copy.zakat_due_2_5[lang]}
                </p>
                <p className="font-display text-3xl font-bold text-[var(--if-gold-light)] tabular-nums mt-1">
                  {formatInr(result.zakatDue)}
                </p>
              </>
            ) : (
              <p className="text-sm text-[var(--if-text-muted)] text-pretty">
                {lang === "te"
                  ? `మీ సంపద నిసాబ్ కంటే ${formatInr(result.shortfall)} తక్కువ — జకాత్ వర్తించదు.`
                  : `Your wealth is ${formatInr(result.shortfall)} below nisab — no Zakat is due.`}
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-[var(--if-text-muted)] text-pretty">
            {lang === "te"
              ? `నిసాబ్ = ${NISAB_GOLD_GRAMS} గ్రా. బంగారం లేదా ${NISAB_SILVER_GRAMS} గ్రా. వెండి విలువ — రెండింటిలో తక్కువది వర్తిస్తుంది (సహీహ్ అల్-బుఖారీ 1454). ఇది మార్గదర్శక అంచనా మాత్రమే — ఖచ్చితమైన తీర్పు కోసం విశ్వసనీయ ఆలిమ్‌ను సంప్రదించండి.`
              : `Nisab is the value of ${NISAB_GOLD_GRAMS}g of gold or ${NISAB_SILVER_GRAMS}g of silver, whichever is lower (Sahih al-Bukhari 1454). This is a guidance estimate only — consult a trusted scholar for a precise ruling.`}
          </p>
        </div>
      )}
    </div>
  );
}
