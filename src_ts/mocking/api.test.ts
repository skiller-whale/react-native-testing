import type { Trip } from "../../lib/trips.ts";
import { server, setTrips } from "./mocks/mockServer.ts";
import { confirmTrip, fetchTrips } from "./api.ts";

const testTrips: Trip[] = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
  {
    id: "trip-2",
    date: "2nd July 2020",
    incidents: 2,
    distance: 30,
    confirmed: true,
  },
  {
    id: "trip-3",
    date: "3rd July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

describe.skip("API helper functions", () => {
  test("fetching trips works", async () => {
    const trips = await fetchTrips();
    expect(trips).toEqual(testTrips);
  });

  test("confirming a trip by id works", async () => {
    const trip = await confirmTrip(testTrips[0].id);
    expect(trip.confirmed).toBe(true);
  });

  test("confirming a trip with a bad id throws", async () => {
    expect.assertions(1);
    try {
      await confirmTrip("ada");
    } catch (error) {
      expect((error as Error).message).toBe("Trip id 'ada' not found.");
    }
  });

  test("confirming all unconfirmed trips works", async () => {
    const trips = await fetchTrips();
    const unconfirmedTrips = trips.filter((trip) => !trip.confirmed);
    expect.assertions(unconfirmedTrips.length);
    for (const trip of unconfirmedTrips) {
      const updatedTrip = await confirmTrip(trip.id);
      expect(updatedTrip).toEqual({ ...trip, confirmed: true });
    }
  });
});
