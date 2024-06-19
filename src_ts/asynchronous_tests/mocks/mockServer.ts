import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import type { Trip } from "../../../lib/trips.ts";

const networkDelay = 200;

let initialTrips: Trip[] = [];
let trips: Trip[] = [...initialTrips];

export const setTrips = (testTrips: Trip[]) => {
  initialTrips = [...testTrips];
  trips = [...testTrips];
};

export const resetTrips = () => {
  trips = [...initialTrips];
};

const handlers = [
  http.get("https://dummyapi.skillerwhale/trips", async () => {
    await delay(networkDelay);
    return HttpResponse.json({ trips });
  }),
  http.post("https://dummyapi.skillerwhale/trips/reset", async () => {
    await delay(networkDelay);
    resetTrips();
    return HttpResponse.json({ trips });
  }),
  http.get("https://dummyapi.skillerwhale/trips/:id", async ({ params }) => {
    await delay(networkDelay);
    const { id } = params;
    const trip = trips.find((trip) => trip.id === id);
    if (trip) {
      return HttpResponse.json({ trip });
    } else {
      return HttpResponse.json({ error: "Trip not found" }, { status: 404 });
    }
  }),
  http.post(
    "https://dummyapi.skillerwhale/trips/:id/confirm",
    async ({ params }) => {
      await delay(networkDelay);
      const { id } = params;
      if (trips.some((trip) => trip.id === id)) {
        trips = trips.map((trip) =>
          trip.id === id ? { ...trip, confirmed: true } : trip
        );
        return HttpResponse.json({
          trip: trips.find((trip) => trip.id === id),
        });
      } else {
        return HttpResponse.json({ error: "Trip not found" }, { status: 404 });
      }
    }
  ),
];

export const server = setupServer(...handlers);
