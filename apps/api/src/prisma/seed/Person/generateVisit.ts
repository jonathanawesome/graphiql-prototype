import { Prisma } from '../../generated';
import dayjs from 'dayjs';

const scheduledCheckup = ({
  petId,
}: {
  petId: string;
}): Prisma.VisitCreateWithoutPersonInput => {
  const day = dayjs();
  // random day up to 30 days in advance
  const onDay = day.add(Math.floor(Math.random() * 30 + 1), 'day');
  // random start hour between 9am and 6pm
  const startHour = onDay.hour(Math.floor(Math.random() * 18 + 9));
  const endHour = startHour.add(1, 'hour');

  return {
    pet: {
      connect: {
        id: petId,
      },
    },
    scheduledStart: startHour.toDate(),
    scheduledEnd: endHour.toDate(),
    type: 'CHECKUP',
    status: 'SCHEDULED',
  };
};

const completedCheckup = ({
  petId,
}: {
  petId: string;
}): Prisma.VisitCreateWithoutPersonInput => {
  const day = dayjs();
  // random day up to 180 days in the past
  const onDay = day.subtract(Math.floor(Math.random() * 180 + 1), 'day');
  // random start hour between 9am and 6pm
  const startHour = onDay.hour(Math.floor(Math.random() * 18 + 9));
  const endHour = startHour.add(1, 'hour');

  return {
    pet: {
      connect: {
        id: petId,
      },
    },
    scheduledStart: startHour.toDate(),
    scheduledEnd: endHour.toDate(),
    // could do some more randomizing for these check in and check out times 👇
    checkInTime: startHour.toDate(),
    checkOutTime: endHour.toDate(),
    type: 'CHECKUP',
    status: 'COMPLETE',
  };
};

export const generateVisit = ({
  petId,
}: {
  petId: string;
}): Prisma.VisitCreateWithoutPersonInput => {
  // stick generators into an array so we can grab one at random
  const visitTypes = [completedCheckup({ petId }), scheduledCheckup({ petId })];

  // grab and return one at random
  return visitTypes[Math.floor(Math.random() * visitTypes.length)];
};
