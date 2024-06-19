import type { Trip } from "../../../lib/trips.ts";
import { server, setTrips } from "./mockServer.ts";

const setupMockServer = (testTrips: Trip[]) => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    setTrips(testTrips);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};

export default setupMockServer;
