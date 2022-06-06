import { createModule } from 'graphql-modules';

import { PetsTypeDefs } from './typeDefs';
import { PetsResolvers } from './resolvers';

export const PetsModule = createModule({
  id: 'Pets',
  dirname: __dirname,
  typeDefs: [PetsTypeDefs],
  resolvers: [PetsResolvers],
});
