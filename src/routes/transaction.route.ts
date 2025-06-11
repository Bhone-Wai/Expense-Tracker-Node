import { Router } from "express";
import * as transactionController from '../controllers/transaction.controller';
import {authMiddleware} from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get('/', transactionController.getAllTransactions);
router.get('/by-month', transactionController.getTransactionsByMonth);
router.post('/', transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);

export default router;