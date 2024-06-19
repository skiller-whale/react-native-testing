import { confirmTrip, fetchTrips } from "./api.js";
import setupMockServer from "./mocks/setupMockServer.js";

const testTrips = [
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

setupMockServer(testTrips);

describe("API helper functions", () => {
  test("fetching trips works", async () => {
    const trips = await fetchTrips();
    expect(trips).toEqual(testTrips);
  });

  test.todo("confirming a trip by id works (using async/await)");

  test.todo("confirming a trip by id works (using resolves)");

  test.todo("confirming a trip with a bad id throws (using async/await)");

  test.todo("confirming a trip with a bad id throw (using rejects)");

  test.todo("confirming all unconfirmed trips works");
});
