import { createModule } from 'graphql-modules';

import { BaseTypeDefs } from './typeDefs';

export const BaseModule = createModule({
  id: 'Base',
  dirname: __dirname,
  typeDefs: [BaseTypeDefs],
});
