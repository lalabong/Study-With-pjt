import prisma from '#lib/prisma';

const testConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

export { prisma, testConnection };
