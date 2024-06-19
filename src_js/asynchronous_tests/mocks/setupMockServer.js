import { server, setTrips } from "./mockServer.js";

const setupMockServer = (testTrips) => {
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
