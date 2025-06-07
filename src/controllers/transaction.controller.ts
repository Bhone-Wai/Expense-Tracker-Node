import {Request, Response, NextFunction} from "express";
import * as transactionService from '../services/transaction.service';
import {transactionSchema} from "../validators/transaction.schema";

export async function getAllTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.userId;
        const transactions = await transactionService.getAllTransactions(userId);
        res.json(transactions);
    } catch (e) {
        next(e);
    }
}

export async function getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params;
        const transaction = await transactionService.getTransactionById(id);
        res.json(transaction);
    } catch (e) {
        next(e);
    }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = transactionSchema.parse(req.body);
        const transaction = await transactionService.createTransaction(parsed);
        res.status(201).json(transaction);
    } catch (e) {
        next(e)
    }
}