import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const networkDelay = 200;

let trips = [];

export const setTrips = (testTrips) => {
  trips = [...testTrips];
};

const handlers = [
  http.get("https://dummyapi.skillerwhale/trips", async () => {
    await delay(networkDelay);
    return HttpResponse.json({ trips });
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
