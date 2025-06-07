"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    monthId: zod_1.z.string(),
    title: zod_1.z.string().min(1),
    amount: zod_1.z.number().positive(),
    type: zod_1.z.enum(['INCOME', 'EXPENSE']),
    category: zod_1.z.enum(['WANTS', 'NEEDS', 'SAVINGS']),
    date: zod_1.z.string().datetime(),
});
