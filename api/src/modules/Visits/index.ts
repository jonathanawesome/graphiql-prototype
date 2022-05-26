import { createModule } from 'graphql-modules';

import { VisitsTypeDefs } from './typeDefs';
// import { VisitsResolvers } from './resolvers';

export const VisitsModule = createModule({
  id: 'Visits',
  dirname: __dirname,
  typeDefs: [VisitsTypeDefs],
  // resolvers: [VisitsResolvers],
});
