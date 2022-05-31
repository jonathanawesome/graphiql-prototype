/** types */
import { Prisma } from '@prisma/client';
import { PetsModule } from './generated/generated-module-types';

export const PetsResolvers: {
  Pet: PetsModule.PetResolvers;
  Mutation: PetsModule.MutationResolvers;
  Query: PetsModule.QueryResolvers;
} = {
  Pet: {
    id: (pet) => pet.id,
    name: (pet) => pet.name || null,
    // owner: async (pet, {}, context) => {
    //   const owner = await context.prisma.pet
    //     .findUnique({
    //       where: {
    //         id: pet.id,
    //       },
    //     })
    //     .owner();
    //   if (owner) {
    //     return { __typename: 'Person', ...owner };
    //   } else {
    //     return null;
    //   }
    // },
    // breed: async (pet, {}, context) => {
    //   const breed = await context.prisma.pet
    //     .findUnique({
    //       where: {
    //         id: pet.id,
    //       },
    //     })
    //     .breed();
    //   if (breed) {
    //     return { __typename: 'Breed', ...breed };
    //   } else {
    //     return null;
    //   }
    // },
    // visits: async (pet, {}, context) => {
    //   const visits = await context.prisma.pet
    //     .findUnique({
    //       where: {
    //         id: pet.id,
    //       },
    //     })
    //     .visits();
    //   if (visits) {
    //     return visits.map((visit) => ({ __typename: 'Visit', ...visit }));
    //   } else {
    //     return null;
    //   }
    // },
    createdAt: (pet) => pet.createdAt || null,
    updatedAt: (pet) => pet.updatedAt || null,
  },
  Mutation: {
    createPet: async (_, { input }, context) => {
      const newlyCreatedPet = await context.prisma.pet.create({
        data: {
          name: input.name,
          owner: {
            connect: {
              id: input.ownerId,
            },
          },
          breed: {
            connect: {
              name: input.breedName,
            },
          },
        },
      });
      if (!newlyCreatedPet) {
        return {
          __typename: 'CreatePetError',
          message: 'Could not create Pet',
          path: 'Mutation/createPet',
        };
      }
      return { __typename: 'Pet', ...newlyCreatedPet };
    },
  },
  Query: {
    pet: async (_, args, context) => {
      const pet = await context.prisma.pet.findUnique({
        where: {
          id: args.id,
        },
      });
      if (pet) {
        return {
          __typename: 'Pet',
          ...pet,
        };
      }
      return {
        __typename: 'PetError',
        message: 'Pet not found.',
        path: 'Query/pet',
      };
    },
    pets: async (_, { input }, context) => {
      let where: Prisma.PetWhereInput = {};

      if (input?.breedName) {
        where = {
          breed: {
            name: input?.breedName,
          },
        };
      }

      if (input?.ownerId) {
        where = {
          ownerId: input?.ownerId,
        };
      }

      if (input?.breedName && input?.ownerId) {
        where = {
          AND: [
            {
              breed: {
                name: input.breedName,
              },
            },
            {
              ownerId: input.ownerId,
            },
          ],
        };
      }

      const pets = await context.prisma.pet.findMany({ where });

      return pets.map((pet) => ({
        __typename: 'Pet',
        ...pet,
      }));
    },
  },
};
