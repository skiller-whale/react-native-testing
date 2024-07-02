import { delay } from "msw";

export default (trips, setTrips) => ({
  fetchTrips: jest.fn(async () => {
    await delay(200);
    return trips;
  }),
  confirmTrip: jest.fn(async (tripId) => {
    await delay(200);
    const trip = trips.find((trip) => trip.id === tripId);
    if (!trip) {
      throw new Error(`Trip id '${tripId}' not found.`);
    }
    const confirmedTrip = { ...trip, confirmed: true };
    setTrips((trips) =>
      trips.map((trip) =>
        trip.id === tripId ? confirmedTrip : trip
      )
    );
    return confirmedTrip;
  }),
});
