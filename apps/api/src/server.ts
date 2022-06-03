import { createServer } from '@graphql-yoga/node';
import { useGraphQLModules } from '@envelop/graphql-modules';
import express from 'express';

/** prisma */
import { prisma } from './prisma';

/** schema */
import { graphqlModules } from './modules';

/** types */
import { Context } from './types';

const app = express();

const graphQLServer = createServer({
  cors: {
    origin: ['http://localhost:61000'],
  },
  context: async ({ request }): Promise<Context> => {
    return { request, prisma };
  },
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGraphQLModules(graphqlModules),
  ],
});

app.use('/graphql', graphQLServer);

app.listen(4000, () => {
  console.log('GraphQL API located at http://localhost:4000/graphql');
});
