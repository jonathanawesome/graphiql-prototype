// types
import { BreedModule } from './generated/generated-module-types';

export const BreedResolvers: {
  Breed: BreedModule.BreedResolvers;
  Pet: BreedModule.PetResolvers;
  Mutation: BreedModule.MutationResolvers;
  Query: BreedModule.QueryResolvers;
} = {
  Breed: {
    name: (parent) => parent.name,
    species: (parent) => parent.species || null,
    pets: async (parent, {}, context) => {
      const pets = await context.prisma.breed
        .findUnique({
          where: {
            name: parent.name,
          },
        })
        .pets();

      return pets.map((pet) => ({
        __typename: 'Pet',
        ...pet,
      }));
    },
    subBreeds: async (parent, {}, context) => {
      const subBreeds = await context.prisma.breed
        .findUnique({
          where: {
            name: parent.name,
          },
        })
        .subBreeds();

      return subBreeds.map((subBreed) => ({
        __typename: 'SubBreed',
        ...subBreed,
      }));
    },
    createdAt: (parent) => parent.createdAt || null,
    updatedAt: (parent) => parent.updatedAt || null,
  },
  Pet: {
    breed: async (parent, {}, context) => {
      const breed = await context.prisma.pet
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .breed();
      if (breed) {
        return { __typename: 'Breed', ...breed };
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createBreed: async (_, { input }, context) => {
      const newlyCreatedBreed = await context.prisma.breed.create({
        data: {
          name: input.name,
          species: input.species,
        },
      });
      if (!newlyCreatedBreed) {
        return {
          __typename: 'CreateBreedError',
          message: 'Could not create breed',
          path: 'Mutation/createBreed',
        };
      }
      return { __typename: 'Breed', ...newlyCreatedBreed };
    },
  },
  Query: {
    breed: async (_, args, context) => {
      const breed = await context.prisma.breed.findUnique({
        where: {
          name: args.name,
        },
      });
      if (breed) {
        return {
          __typename: 'Breed',
          ...breed,
        };
      }
      return {
        __typename: 'BreedError',
        message: 'Breed not found.',
        path: 'Query/breed',
      };
    },
    breeds: async (_, { input }, context) => {
      const breeds = await context.prisma.breed.findMany({
        where: {
          species: input.species,
        },
      });
      return breeds.map((breed) => ({
        __typename: 'Breed',
        ...breed,
      }));
    },
  },
};
