import express from 'express';
import dotenv from 'dotenv';
import router from "./routes";
import {clerkMiddleware} from "@clerk/express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));

app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

