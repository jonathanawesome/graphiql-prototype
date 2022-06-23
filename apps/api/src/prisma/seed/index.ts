import { PrismaClient } from '../generated';

// data
import { Breed } from './Breed';
import { Person } from './Person';
import { Pet } from './Pet';

const prisma = new PrismaClient();

const seed = async () => {
  await Breed(prisma);
  await Pet(prisma);
  await Person(prisma);
};

seed()
  .catch((err) => {
    throw err;
  })
  .finally(() => {
    prisma.$disconnect();
  });
