import { Router } from "express";
import transactionRoute from "./transaction.route";
import budgetRoute from "./budget.route";

const router = Router();

router.use('/transactions', transactionRoute);
router.use('/budgets', budgetRoute);

export default router;