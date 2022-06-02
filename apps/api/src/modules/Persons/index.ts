import { createModule } from 'graphql-modules';

import { PersonsTypeDefs } from './typeDefs';
import { PersonsResolvers } from './resolvers';

export const PersonsModule = createModule({
  id: 'Persons',
  dirname: __dirname,
  typeDefs: [PersonsTypeDefs],
  resolvers: [PersonsResolvers],
});
