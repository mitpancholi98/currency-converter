import z from 'zod';

export const currencyConverterSchema = z
  .object({
    from: z
      .string({ error: '"from" currency is required' })
      .trim()
      .length(3, { message: '"from" currency must be a 3-letter code' }),
    to: z
      .string({ error: '"to" currency is required' })
      .trim()
      .length(3, { message: '"to" currency must be a 3-letter code' }),
    amount: z.coerce
      .number({ error: '"amount" must be a valid number' })
      .positive({ error: '"amount" must be greater than 0' }),
  })
  .refine((data) => data.from !== data.to, {
    message: 'Invalid currency pair',
    path: ['to'],
  });
