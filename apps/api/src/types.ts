import { YogaInitialContext } from '@graphql-yoga/node';
import { PrismaClient } from '@prisma/client';

export type Context = YogaInitialContext & {
  prisma: PrismaClient;
};
