/**
 * Prisma Database Client
 * Singleton instance for database access throughout the application
 * 
 * Pattern: Uses global variable to maintain single Prisma Client instance
 * across hot-reloads in development (Next.js pattern). In production,
 * this ensures only one database connection pool is created.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
