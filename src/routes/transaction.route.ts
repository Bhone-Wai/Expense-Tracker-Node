import { Router } from "express";
import * as transactionController from '../controllers/transaction.controller';
import {authMiddleware} from "../middlewares/auth.middleware";

import {
    requireAuth,
    validateMonthYear,
} from "../middlewares/validation.middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', transactionController.getAllTransactions);
router.get('/by-month', validateMonthYear, transactionController.getTransactionsByMonth);
router.post('/', transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;