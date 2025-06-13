import express from 'express';
import dotenv from 'dotenv';
import router from "./routes";
import {clerkMiddleware} from "@clerk/express";
import {env} from "./config/env";

dotenv.config();

const app = express();

app.use(express.json());
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));

app.use('/api/v1', router);

const PORT = env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});