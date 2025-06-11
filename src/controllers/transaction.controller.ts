import {Request, Response, NextFunction} from "express";
import * as transactionService from '../services/transaction.service';

const successResponse = (res: Response, message: string, data: any, status = 200) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
}

const errorResponse = (res: Response, code: string, message: string, status = 400) => {
    res.status(status).json({
        success: false,
        message,
        error: {
            code,
            details: null
        }
    });
}

const getUserIdFromAuth = (req: Request): string | null => req.auth?.userId || null;

export async function getAllTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        // const userId = req.params.userId;
        const userId = getUserIdFromAuth(req);
        if (!userId) return errorResponse(res, 'UNAUTHORIZED', 'Unauthorized', 401);
        const transactions = await transactionService.getAllTransactions(userId);

        return successResponse(res, 'Transactions fetched successfully', transactions);
    } catch (e) {
        next(e);
    }
}

export async function getTransactionsByMonth(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = getUserIdFromAuth(req);
        if (!userId) return errorResponse(res, 'UNAUTHORIZED', 'Unauthorized', 401);

        const { month, year } = req.query;
        const monthNum = parseInt(month as string);
        const yearNum = parseInt(year as string);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            return errorResponse(res, 'INVALID_MONTH', 'Month must be between 1 and 12', 400);
        }

        if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
            return errorResponse(res, 'INVALID_YEAR', 'Invalid year provided', 400);
        }

        const transactions = await transactionService.getTransactionsByMonth(
            userId,
            monthNum,
            yearNum,
        );

        const totalIncome = transactions
            .filter(t => t.type === 'INCOME')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalExpense = transactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const responseData = {
            transactions,
            summary: {
                totalTransactions: transactions.length,
                totalIncome,
                totalExpense,
                netAmount: totalIncome - totalExpense,
            }
        };

        return successResponse(res, `Transactions for ${monthNum}/${yearNum} fetched successfully`, responseData, 200)
    } catch (e) {
        next(e);
    }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = getUserIdFromAuth(req);
        if (!userId) return errorResponse(res, 'UNAUTHORIZED', 'Unauthorized', 401);

        const { title, amount, type, category, date } = req.body;

        const transaction = await transactionService.createTransaction({
            userId,
            title,
            amount,
            type,
            category,
            date: new Date(date),
        });

        return successResponse(res, 'Transaction created successfully', transaction, 201)
    } catch (e) {
        next(e)
    }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = getUserIdFromAuth(req);
        if (!userId) return errorResponse(res, 'UNAUTHORIZED', 'Unauthorized', 401);

        const { id } = req.params;

        await transactionService.deleteTransaction(id, userId);

        return successResponse(res, 'Transaction deleted successfully', null);
    } catch (e) {
        next(e);
    }
}