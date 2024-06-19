import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import type { Trip } from "../../../lib/trips.ts";
import MockTripsProviders from "../mocks/MockTripsProviders.tsx";
import setupMockServer from "../mocks/setupMockServer.ts";
import DrivingHistory from "./DrivingHistory.tsx";

const testTrips: Trip[] = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: true,
  },
  {
    id: "trip-2",
    date: "2nd July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

setupMockServer(testTrips);

describe("DrivingHistory", () => {
  beforeAll(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  afterAll(() => jest.useRealTimers());

  test("confirm trip buttons have correct initial state", () => {
    render(<DrivingHistory />, { wrapper: MockTripsProviders(testTrips) });

    const trip1Button = screen.getByRole("button", {
      name: "Confirm trip trip-1",
    });
    expect(trip1Button).toBeDisabled();
    expect(trip1Button).toHaveTextContent(/^Confirmed$/);

    const trip2Button = screen.getByRole("button", {
      name: "Confirm trip trip-2",
    });
    expect(trip2Button).toBeEnabled();
    expect(trip2Button).toHaveTextContent(/^Confirm$/);
  });

  test.todo("confirm trip buttons work");
});
