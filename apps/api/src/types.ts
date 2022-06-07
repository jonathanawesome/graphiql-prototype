import { YogaInitialContext } from '@graphql-yoga/node';
import { PrismaClient } from '../src/prisma/generated';

export type Context = YogaInitialContext & {
  prisma: PrismaClient;
};
