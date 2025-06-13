import { z } from 'zod';
import dotenv from "dotenv";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string().url(),
    // NODE_ENV: z.enum(['development', 'production', 'test']).default('development');
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;