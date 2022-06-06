import { createModule } from 'graphql-modules';

import { BreedTypeDefs } from './typeDefs';
import { BreedResolvers } from './resolvers';

export const BreedModule = createModule({
  id: 'Breed',
  dirname: __dirname,
  typeDefs: [BreedTypeDefs],
  resolvers: [BreedResolvers],
});
