import axios from 'axios';
import { getCache, setCache } from '../utils/cache';

const TTL = 300;

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
): Promise<number> => {
  const key = `${from}_${to}`;
  const cachedRate = await getCache(key);
  let rate = cachedRate ? parseFloat(cachedRate) : null;

  if (!rate) {
    const res = await axios.get(
      `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
    );
    rate = res.data.rates[to];
  }

  if (!rate || rate <= 0) {
    throw new Error(`Failed to convert currency from ${from} to ${to}`);
  }

  await setCache(key, rate.toString(), TTL);
  return parseFloat((amount * rate).toFixed(2));
};
