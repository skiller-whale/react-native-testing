import { delay } from "msw";
import type { Trip } from "../../../lib/trips.ts";
import type { Dispatch, SetStateAction } from "react";

export default (trips: Trip[], setTrips: Dispatch<SetStateAction<Trip[]>>) => ({
  fetchTrips: jest.fn(async () => {
    await delay(200);
    return trips;
  }),
  confirmTrip: jest.fn(async (tripId: string) => {
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
