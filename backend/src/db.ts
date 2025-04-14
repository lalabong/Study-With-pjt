import prisma from './lib/prisma.js';

const testConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', (error as Error).message);
    return false;
  }
};

export { prisma, testConnection }; 