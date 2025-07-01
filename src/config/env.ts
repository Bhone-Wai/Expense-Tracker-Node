import { z } from 'zod';
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).optional(),
    DATABASE_URL: z.string().url(),
    CLIENT_URL: z.string().url().optional(),
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    COOKIE_SECRET: z.string().min(32).optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.format());
    process.exit(1);
}

console.log('Environment variables validated successfully...');
export const env = parsed.data;