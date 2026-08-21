/* Zakat calculation.

   Nisab is the value of 87.48g of gold or 612.36g of silver, established from
   Sahih al-Bukhari 1454. The lower of the two is used, which is the silver
   figure in practice — it admits more payers and so favours the recipients.
   Rate is 2.5% (1/40) on wealth held above nisab for one lunar year.

   A guidance estimate only; the UI says so and points to a scholar. */

export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;
export const ZAKAT_RATE = 0.025;

export type Rates = {
  goldGramInr: number;
  silverGramInr: number;
  date: string;
  source: string;
  updated: string;
};

export type Assets = {
  /** Grams of gold held. */
  gold: number;
  /** Grams of silver held. */
  silver: number;
  cash: number;
  business: number;
  /** Debts owed by you, deducted from the total. */
  liabilities: number;
};

export type ZakatResult = {
  goldValue: number;
  silverValue: number;
  netWealth: number;
  nisabGold: number;
  nisabSilver: number;
  /** The lower of the two thresholds — the one that applies. */
  nisab: number;
  meetsNisab: boolean;
  zakatDue: number;
  shortfall: number;
};

export function calculateZakat(assets: Assets, rates: Rates): ZakatResult {
  const goldValue = Math.max(0, assets.gold) * rates.goldGramInr;
  const silverValue = Math.max(0, assets.silver) * rates.silverGramInr;
  const gross = goldValue + silverValue + Math.max(0, assets.cash) + Math.max(0, assets.business);
  const netWealth = Math.max(0, gross - Math.max(0, assets.liabilities));

  const nisabGold = NISAB_GOLD_GRAMS * rates.goldGramInr;
  const nisabSilver = NISAB_SILVER_GRAMS * rates.silverGramInr;
  const nisab = Math.min(nisabGold, nisabSilver);

  const meetsNisab = netWealth >= nisab;
  return {
    goldValue,
    silverValue,
    netWealth,
    nisabGold,
    nisabSilver,
    nisab,
    meetsNisab,
    zakatDue: meetsNisab ? netWealth * ZAKAT_RATE : 0,
    shortfall: meetsNisab ? 0 : nisab - netWealth,
  };
}

export function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}
