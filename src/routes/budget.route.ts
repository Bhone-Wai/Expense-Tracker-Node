import { Router } from "express";
import * as budgetController from '../controllers/budget.controller';

import {
    requireAuth,
    validateMonthYear,
    validateBudgetAmount,
    validateExpenseCategory
} from "../middlewares/validation.middleware";

import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get('/monthly', validateMonthYear, budgetController.getBudgetForMonth);
router.get('/monthly-total', validateMonthYear, budgetController.getTotalMonthBudget);
router.get('/monthly-compare', validateMonthYear, budgetController.getBudgetVsActual);
router.post('/monthly-setup', validateMonthYear, budgetController.setMonthlyBudgets);


export default router;