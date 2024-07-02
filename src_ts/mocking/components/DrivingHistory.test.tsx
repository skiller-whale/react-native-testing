import { useState, type PropsWithChildren } from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import type { Trip } from "../../../lib/trips.ts";
import mockApi from "../mocks/mockApi.ts";
import ApiProvider from "../context/ApiContext.tsx";
import TripsProvider, { SetTripsProvider } from "../context/TripsContext.tsx";
import DrivingHistory from "./DrivingHistory.tsx";

const testTrips: Trip[] = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

const TestTripsProviders = ({ children }: PropsWithChildren) => {
  const [trips, setTrips] = useState(testTrips);

  return (
    <TripsProvider value={trips}>
      <SetTripsProvider value={setTrips}>{children}</SetTripsProvider>
    </TripsProvider>
  );
};

describe("DrivingHistory", () => {
  beforeAll(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  afterAll(() => jest.useRealTimers());

  test.skip("confirm button works", async () => {
    const user = userEvent.setup();
    render(<DrivingHistory />, { wrapper: TestTripsProviders });

    const confirmTripButton = screen.getByRole("button", {
      name: "Confirm trip trip-1",
    });
    await user.press(confirmTripButton);
    expect(confirmTripButton).toHaveTextContent("Confirming...");
    await waitFor(() => {
      expect(confirmTripButton).toHaveTextContent("Confirmed");
    });
  });
});
