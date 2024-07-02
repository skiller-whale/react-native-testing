import { useState } from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import mockApi from "../mocks/mockApi.js";
import ApiProvider from "../context/ApiContext.jsx";
import TripsProvider, { SetTripsProvider } from "../context/TripsContext.jsx";
import DrivingHistory from "./DrivingHistory.jsx";

const testTrips = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

const TestTripsProviders = ({ children }) => {
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
