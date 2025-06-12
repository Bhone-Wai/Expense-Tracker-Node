import {Request, Response, NextFunction} from "express";

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

declare global {
    namespace Express {
        interface Request {
            validatedData?: any;
        }
    }
}

// Validate Month Year
export const validateMonthYear = (req: Request, res: Response, next: NextFunction) => {
    const { month, year } = req.query.month ? req.query : req.body;

    const monthNum = parseInt(month as string);
    const yearNum = parseInt(year as string);

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return errorResponse(res, 'INVALID_MONTH', 'Month must be between 1 and 12', 400);
    }

    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        return errorResponse(res, 'INVALID_YEAR', 'Invalid year provided', 400);
    }

    req.validatedData = {
        ...req.validatedData,
        month: monthNum,
        year: yearNum,
    }

    next();
}

// Validate Budget Amount
export const validateBudgetAmount = (req: Request, res: Response, next: NextFunction) => {
    const { amount } = req.body;

    if (amount === null) {
        return errorResponse(res, 'MISSING_AMOUNT', 'Amount is required', 400);
    }

    if (typeof amount !== 'number' || amount < 0) {
        return errorResponse(res, 'INVALID_AMOUNT', 'Amount must be a non-negative number', 400);
    }

    next();
}

// Validate Expense Category
export const validateExpenseCategory = (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body;

    if (!category) {
        return errorResponse(res, 'MISSING_CATEGORY', 'Category is required', 400);
    }

    if (!['NEEDS', 'WANTS', 'SAVINGS'].includes(category)) {
        return errorResponse(res, 'INVALID_CATEGORY', 'Category must be NEEDS, WANTS, or SAVINGS', 400);
    }

    next();
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.auth?.userId;

    if (!userId) {
        return errorResponse(res, 'UNAUTHORIZED', 'Unauthorized', 401);
    }

    req.validatedData = {
        ...req.validatedData,
        userId
    };

    next();
}