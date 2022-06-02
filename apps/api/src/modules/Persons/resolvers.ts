/** types */
import { PersonsModule } from './generated/generated-module-types';

export const PersonsResolvers: {
  Person: PersonsModule.PersonResolvers;
  Mutation: PersonsModule.MutationResolvers;
  Query: PersonsModule.QueryResolvers;
} = {
  Person: {
    id: (person) => person.id,
    firstName: (person) => person.firstName || null,
    lastName: (person) => person.lastName || null,
    type: (person) => person.type || null,
    pets: async (person, {}, context) => {
      const pets = await context.prisma.person
        .findUnique({
          where: {
            id: person.id,
          },
        })
        .pets();

      return pets.map((pet) => ({
        __typename: 'Pet',
        ...pet,
      }));
    },
    visits: async (person, {}, context) => {
      const visits = await context.prisma.visit.findMany({
        where: {
          personId: person.id,
        },
      });

      return visits.map((visit) => ({
        __typename: 'Visit',
        ...visit,
      }));
    },
    createdAt: (person) => person.createdAt || null,
    updatedAt: (person) => person.updatedAt || null,
  },
  Mutation: {
    createPerson: async (_, { input }, context) => {
      const newlyCreatedPerson = await context.prisma.person.create({
        data: {
          firstName: input.name.firstName,
          lastName: input.name.lastName,
          type: input.type,
        },
      });

      if (!newlyCreatedPerson) {
        return {
          __typename: 'CreatePersonError',
          message: 'Could not create person',
          path: 'Mutation/createPerson',
        };
      }
      return { __typename: 'Person', ...newlyCreatedPerson };
    },
  },
  Query: {
    person: async (_, { id }, context) => {
      const person = await context.prisma.person.findUnique({
        where: {
          id,
        },
      });
      if (person) {
        return {
          __typename: 'Person',
          ...person,
        };
      }
      return {
        __typename: 'PersonError',
        message: 'Person not found.',
        path: 'Query/person',
      };
    },
    persons: async (_, { input }, context) => {
      const persons = await context.prisma.person.findMany({
        where: {
          type: input.type,
        },
      });
      return persons.map((person) => ({
        __typename: 'Person',
        ...person,
      }));
    },
    employees: async (_, { input }, context) => {
      const persons = await context.prisma.person.findMany({
        where: {
          type: 'EMPLOYEE',
          id: { in: input?.specificEmployeeIds },
        },
      });
      return persons.map((person) => ({
        __typename: 'Person',
        ...person,
      }));
    },
    petOwners: async (_, { limit }, context) => {
      const persons = await context.prisma.person.findMany({
        where: {
          type: 'PET_OWNER',
        },
        take: limit || undefined,
      });
      return persons.map((person) => ({
        __typename: 'Person',
        ...person,
      }));
    },
  },
};
