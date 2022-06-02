import { PrismaClient } from '../prisma/generated';

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
});
