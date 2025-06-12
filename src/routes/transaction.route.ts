import { Router } from "express";
import * as transactionController from '../controllers/transaction.controller';
import {authMiddleware} from "../middlewares/auth";

import {
    requireAuth,
    validateMonthYear,
} from "../middlewares/validation";

const router = Router();

router.use(authMiddleware);

router.get('/', transactionController.getAllTransactions);
router.get('/by-month', validateMonthYear, transactionController.getTransactionsByMonth);
router.post('/', requireAuth, transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;