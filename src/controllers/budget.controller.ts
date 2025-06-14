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
        const { userId, month, year } = req.validatedData;

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
        const { userId, month, year } = req.validatedData;

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

export async function setBudgetForCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, month, year } = req.validatedData;
        const { category, amount } = req.body;

        const budget = await budgetService.setBudgetForCategory(
            userId,
            category as ExpenseCategory,
            month,
            year,
            amount,
        );

        return successResponse(res, 'Budget set successfully', budget, 201);
    } catch (e) {
        next(e);
    }
}

export async function getBudgetVsActual(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, month, year } = req.validatedData;

        const budgetVsActual = await budgetService.getBudgetVsActual(userId, month, year);

        return successResponse(res, `Budget vs actual for ${month}/${year} fetched successfully`, budgetVsActual);
    } catch (e) {
        next(e);
    }
}