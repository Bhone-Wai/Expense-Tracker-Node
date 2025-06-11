import { Router } from "express";
import transactionRoute from "./transaction.route";

const router = Router();

router.use('/transactions', transactionRoute);

export default router;