import { Prisma, PrismaClient } from '../../generated';
import cuid from 'cuid';
import { catBreeds, dogBreeds } from './breeds';

const createDogBreeds: Prisma.BreedCreateInput[] = dogBreeds.map(
  (breed): Prisma.BreedCreateInput => {
    return {
      name: breed.name,
      species: 'DOG',
      subBreeds: {
        createMany: {
          data: breed.subBreeds.map((subBreed) => ({
            id: cuid(),
            name: subBreed,
          })),
        },
      },
    };
  }
);

const createCatBreeds: Prisma.BreedCreateInput[] = catBreeds.map(
  (breed): Prisma.BreedCreateInput => {
    return {
      name: breed.name,
      species: 'CAT',
      subBreeds: {
        createMany: {
          data: breed.subBreeds.map((subBreed) => ({
            id: cuid(),
            name: subBreed,
          })),
        },
      },
    };
  }
);

export const Breed = async (prisma: PrismaClient) => {
  for (const x of [...createDogBreeds, ...createCatBreeds]) {
    await prisma.breed.create({
      data: {
        name: x.name,
        species: x.species,
        subBreeds: x.subBreeds,
      },
    });
  }
};
