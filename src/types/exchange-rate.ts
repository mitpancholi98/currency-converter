export type ExchangeRates = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};
