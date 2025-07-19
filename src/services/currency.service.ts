import { getCache, setCache } from '../utils/cache';
import { fetchExchangeRate } from '../utils/frankfurter-api';

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
    rate = await fetchExchangeRate(from, to);
    await setCache(key, rate.toString(), TTL);
  }

  return parseFloat((amount * rate).toFixed(2));
};
