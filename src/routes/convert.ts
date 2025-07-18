import { Router } from 'express';
import { convertCurrency } from '../services/currencyService';
import { currencyConverterSchema } from '../schema/convert';

const router = Router();

router.get('/', async (req, res) => {
  const { from, to, amount } = currencyConverterSchema.parse(req.query);
  const converted = await convertCurrency(from, to, amount);
  const data = { from, to, amount, converted };
  res.json({
    status: 200,
    message: 'Currency converted successfully',
    success: true,
    data,
  });
});

export default router;
