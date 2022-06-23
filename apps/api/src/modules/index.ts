import { createApplication } from 'graphql-modules';

// modules
import { BaseModule } from './Base';
import { BreedModule } from './Breed';
import { PersonsModule } from './Persons';
import { PetsModule } from './Pets';
import { VisitsModule } from './Visits';

// This is your application, it contains your GraphQL schema and the implementation of it.
export const graphqlModules = createApplication({
  modules: [BaseModule, BreedModule, PetsModule, PersonsModule, VisitsModule],
});
