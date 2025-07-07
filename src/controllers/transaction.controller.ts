import {Request, Response, NextFunction} from "express";
import * as transactionService from '../services/transaction.service';

const successResponse = (res: Response, message: string, data: any, status = 200) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
}

export async function getAllTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.validatedData;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
        const transactions = await transactionService.getAllTransactions(userId, limit);

        return successResponse(res, 'Transactions fetched successfully', transactions);
    } catch (e) {
        next(e);
    }
}

export async function getTransactionsByMonth(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, month, year } = req.validatedData;

        const transactions = await transactionService.getTransactionsByMonth(
            userId,
            month,
            year,
        );

        return successResponse(res, `Transactions for ${month}/${year} fetched successfully`, transactions, 200)
    } catch (e) {
        next(e);
    }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { title, amount, type, incomeCategory, expenseCategory, date } = req.body;


        const transaction = await transactionService.createTransaction({
            userId,
            title,
            amount,
            type,
            incomeCategory,
            expenseCategory,
            date: new Date(date),
        });

        successResponse(res, 'Transaction created successfully', transaction, 201);
    } catch (e) {
        next(e)
    }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.validatedData;

        const { id } = req.params;

        await transactionService.deleteTransaction(id, userId);

        return successResponse(res, 'Transaction deleted successfully', null);
    } catch (e) {
        next(e);
    }
}