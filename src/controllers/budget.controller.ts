import {Request, Response, NextFunction} from "express";
import * as budgetService from '../services/budget.service';
import {ExpenseCategory} from "@prisma/client";

const successResponse = (res: Response, message: string, data: any, status = 200) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
}

export async function getBudgetForMonth(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { month, year } = req.validatedData; // month and year are still from validatedData

        const budgets = await budgetService.getBudgetForMonth(userId, month, year);
        
        const totalBudget = await budgetService.getTotalMonthBudget(userId, month, year);

        const responseData = {
            budgets,
            totalBudget: Number(totalBudget),
            month,
            year,
        }

        return successResponse(res, `Budget for ${month}/${year} fetched successfully`, responseData);
    } catch (e) {
        next(e);
    }
}

export async function getTotalMonthBudget(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { month, year } = req.validatedData; // month and year are still from validatedData

        const totalBudget = await budgetService.getTotalMonthBudget(userId, month, year);

        const responseData = {
            totalBudget: Number(totalBudget),
            month,
            year,
        };

        return successResponse(res, `Total budget for ${month}/${year} fetched successfully`, responseData);
    } catch (e) {
        next(e);
    }
}

export async function setMonthlyBudgets(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.auth?.userId;
        const { month, year } = req.validatedData;
        const { budgets } = req.body;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        if (!Array.isArray(budgets)) {
            res.status(400).json({ success: false, message: 'Budgets must be an array' });
            return;
        }

        const results = await Promise.all(
            budgets.map(({ category, amount }) =>
                budgetService.setBudgetForCategory(
                    userId,
                    category,
                    month,
                    year,
                    amount
                )
            )
        );

        successResponse(res, 'Budgets set successfully', results, 201);
    } catch (e) {
        next(e);
    }
}

export async function getBudgetVsActual(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { month, year } = req.validatedData; // month and year are still from validatedData

        const CATEGORY_ORDER = ["NEEDS", "WANTS", "SAVINGS"];

        const budgetVsActual = await budgetService.getBudgetVsActual(userId, month, year);

        budgetVsActual.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));

        return successResponse(res, `Budget vs actual for ${month}/${year} fetched successfully`, budgetVsActual);
    } catch (e) {
        next(e);
    }
}