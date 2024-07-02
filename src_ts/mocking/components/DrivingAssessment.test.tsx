import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import type { Trip } from "../../../lib/trips.ts";
import MockTripsProviders from "../mocks/MockTripsProviders.tsx";
import DrivingAssessment from "./DrivingAssessment.tsx";

const testTrips: Trip[] = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

describe("DrivingAssessment", () => {
  beforeAll(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  afterAll(() => jest.useRealTimers());

  test.skip("syncing happens every 10 seconds", async () => {
    render(<DrivingAssessment />, { wrapper: MockTripsProviders(testTrips) });
  });
});
