export type Trip = {
  id: string;
  date: string;
  incidents: number;
  distance: number;
  confirmed: boolean;
};

export const generateRandomTrips  = (): Trip[] => {
  const trips: Trip[] = [
    {
      id: "trip-1",
      date: "1st July 2020",
      incidents: getRandomInt(1, 2),
      distance: 30,
      confirmed: getRandomBoolean(),
    },
    {
      id: "trip-2",
      date: "3rd July 2020",
      incidents: getRandomInt(1, 6),
      distance: 20,
      confirmed: getRandomBoolean(),
    },
    {
      id: "trip-3",
      date: "5th July 2020",
      incidents: 0,
      distance: 8,
      confirmed: getRandomBoolean(),
    },
    {
      id: "trip-4",
      date: "8th July 2020",
      incidents: getRandomInt(1, 12),
      distance: 80,
      confirmed: getRandomBoolean(),
    },
    {
      id: "trip-5",
      date: "12th July 2020",
      incidents: 10,
      distance: 100,
      confirmed: getRandomBoolean(),
    },
  ];

  for (let i = 0; i < getRandomInt(2, 5); i++) {
    trips.push({
      id: `trip-${trips.length + 1}`,
      date: `${13 + i}th July 2020`,
      incidents: getRandomInt(10, 40),
      distance: getRandomInt(40, 60),
      confirmed: getRandomBoolean(),
    });
  }

  return trips;
};

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomBoolean = () => Math.random() < 0.5;
