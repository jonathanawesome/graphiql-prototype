import { Prisma, PrismaClient } from '../../generated';
import cuid from 'cuid';
import { faker } from '@faker-js/faker';
import { catPetIds, dogPetIds } from '../Pet';
import { generateVisit } from './generateVisit';

const employee = (): Prisma.PersonCreateInput => ({
  id: cuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  type: 'EMPLOYEE',
});

const employees: Prisma.PersonCreateInput[] = Array.from({ length: 10 }, () =>
  employee()
);

const catOwner = (): Prisma.PersonCreateInput => {
  const catPetId = catPetIds[Math.floor(Math.random() * catPetIds.length)];
  return {
    id: cuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    type: 'PET_OWNER',
    pets: {
      connect: {
        id: catPetIds[Math.floor(Math.random() * catPetIds.length)],
      },
    },
    visits: {
      create: generateVisit({ petId: catPetId }),
    },
  };
};

const catOwners: Prisma.PersonCreateInput[] = Array.from({ length: 10 }, () =>
  catOwner()
);

const dogOwner = (): Prisma.PersonCreateInput => {
  const dogPetId = dogPetIds[Math.floor(Math.random() * dogPetIds.length)];
  return {
    id: cuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    type: 'PET_OWNER',
    pets: {
      connect: {
        id: dogPetId,
      },
    },
    visits: {
      create: generateVisit({ petId: dogPetId }),
    },
  };
};

const dogOwners: Prisma.PersonCreateInput[] = Array.from({ length: 10 }, () =>
  dogOwner()
);

export const Person = async (prisma: PrismaClient) => {
  for (const x of [...catOwners, ...dogOwners, ...employees]) {
    await prisma.person.create({
      data: {
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        type: x.type,
        pets: x.pets,
        visits: x.visits,
      },
    });
  }
};
