import dayjs from 'dayjs';

/** types */
import { VisitsModule } from './generated/generated-module-types';

export const VisitsResolvers: {
  Visit: VisitsModule.VisitResolvers;
  Mutation: VisitsModule.MutationResolvers;
  Query: VisitsModule.QueryResolvers;
} = {
  Visit: {
    id: (parent) => parent.id,
    scheduledStart: (parent) => parent.scheduledStart || null,
    scheduledEnd: (parent) => parent.scheduledEnd || null,
    checkInTime: (parent) => parent.checkInTime || null,
    checkOutTime: (parent) => parent.checkOutTime || null,
    totalCost: (parent) => parent.totalCost || null,
    type: (parent) => parent.type || null,
    status: (parent) => parent.status || null,
    person: async (parent, _, context) => {
      const person = await context.prisma.visit
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .person();
      if (person) {
        return { __typename: 'Person', ...person };
      } else {
        return null;
      }
    },
    pet: async (parent, _, context) => {
      const pet = await context.prisma.visit
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .pet();
      if (pet) {
        return { __typename: 'Pet', ...pet };
      } else {
        return null;
      }
    },
    createdAt: (parent) => parent.createdAt || null,
    updatedAt: (parent) => parent.updatedAt || null,
  },
  Mutation: {
    createVisit: async (_, { input }, context) => {
      const newlyCreatedVisit = await context.prisma.visit.create({
        data: {
          scheduledStart: dayjs(input.scheduledStart).toISOString(),
          scheduledEnd: dayjs(input.scheduledStart).add(1, 'hour').toISOString(),
          type: input.type,
          status: 'SCHEDULED',
          person: {
            connect: {
              id: input.personId,
            },
          },
          pet: {
            connect: {
              id: input.petId,
            },
          },
        },
      });

      if (!newlyCreatedVisit) {
        return {
          __typename: 'CreateVisitError',
          message: 'Could not create visit',
          path: 'createVisit',
        };
      }
      return { __typename: 'Visit', ...newlyCreatedVisit };
    },
  },
  Query: {
    visit: async (_, args, context) => {
      const visit = await context.prisma.visit.findUnique({
        where: {
          id: args.id,
        },
      });
      if (visit) {
        return {
          __typename: 'Visit',
          ...visit,
        };
      }
      return {
        __typename: 'VisitError',
        message: 'Visit not found.',
        path: 'Query/visit',
      };
    },
    visits: async (_, { input }, context) => {
      const visits = await context.prisma.visit.findMany({
        where: {
          status: input?.visitStatus || undefined,
          type: input?.visitType || undefined,
        },
        take: input?.limit || undefined,
      });

      return visits.map((visit) => ({
        __typename: 'Visit',
        ...visit,
      }));
    },
  },
};
