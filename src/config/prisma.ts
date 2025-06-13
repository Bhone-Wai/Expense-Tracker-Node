import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Test if tables exist
        const result = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;
        console.log('📋 Available tables:', result);

    } catch (error) {
        console.error('❌ Database connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Call this before starting your server
testConnection();