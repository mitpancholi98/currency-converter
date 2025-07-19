import axios from 'axios';
import { ExchangeRates } from '../types/exchange-rate';

export const fetchExchangeRate = async (
  from: string,
  to: string
): Promise<number> => {
  const res = await axios.get<ExchangeRates>(
    `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
  );
  const rate = res.data.rates[to];

  if (!rate || rate <= 0) {
    throw new Error(`Failed to fetch exchange rate from ${from} to ${to}`);
  }

  return rate;
};
