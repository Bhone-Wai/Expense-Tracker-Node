import { z } from 'zod';

export const transactionSchema = z.object({
    userId: z.string(),
    monthId: z.string(),
    title: z.string().min(1),
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.enum(['WANTS', 'NEEDS', 'SAVINGS']),
    date: z.string().datetime(),
});