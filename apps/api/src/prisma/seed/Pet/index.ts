import { Prisma, PrismaClient } from '../../generated';
import cuid from 'cuid';
import { petNames } from './petNames';
import { catBreeds, dogBreeds } from '../Breed/breeds';

export const dogPetIds = Array.from({ length: 10 }, () => cuid());
export const catPetIds = Array.from({ length: 10 }, () => cuid());

const dogPets = (): Prisma.PetCreateInput[] => {
  return dogPetIds.map((dogPetId) => ({
    id: dogPetId,
    name: petNames[Math.floor(Math.random() * petNames.length)],
    breed: {
      connect: {
        name: dogBreeds[Math.floor(Math.random() * dogBreeds.length)].name,
      },
    },
  }));
};

const catPets = (): Prisma.PetCreateInput[] => {
  return catPetIds.map((catPetId) => ({
    id: catPetId,
    name: petNames[Math.floor(Math.random() * petNames.length)],
    breed: {
      connect: {
        name: catBreeds[Math.floor(Math.random() * catBreeds.length)].name,
      },
    },
  }));
};

export const Pet = async (prisma: PrismaClient) => {
  for (const x of [...dogPets(), ...catPets()]) {
    await prisma.pet.create({
      data: {
        id: x.id,
        name: x.name,
        breed: x.breed,
      },
    });
  }
};
