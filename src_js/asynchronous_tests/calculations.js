import { DrivingLevel } from "./constants.js";

export const calculateDrivingScore = (distance, incidents) => {
  const incidentsPerMile = incidents / distance;
  if (incidentsPerMile > 1) {
    return 0;
  }
  return Math.round(100 - 100 * incidentsPerMile);
};

export const calculateDrivingLevel = (drivingScore) => {
  if (drivingScore >= 90) {
    return DrivingLevel.verySafe;
  } else if (drivingScore >= 70) {
    return DrivingLevel.safe;
  } else if (drivingScore >= 30) {
    return DrivingLevel.unsafe;
  } else {
    return DrivingLevel.dangerous;
  }
};

export const calculateDrivingAssessment = (trips) => {
  const tripsCount = trips.length;
  const incidentsCount = trips.reduce((acc, trip) => acc + trip.incidents, 0);
  const totalDistance = trips.reduce((acc, trip) => acc + trip.distance, 0);
  const drivingScore = calculateDrivingScore(totalDistance, incidentsCount);
  const drivingLevel = calculateDrivingLevel(drivingScore);

  return {
    drivingScore,
    drivingLevel,
    tripsCount,
    incidentsCount,
    totalDistance,
  };
};
