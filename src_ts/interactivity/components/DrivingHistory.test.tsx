import type { PropsWithChildren } from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import type { Trip } from "../../../lib/trips.ts";
import TripsProvider, { SetTripsProvider } from "../TripsState.tsx";
import useCursor from "../hooks/useCursor.ts";
import DrivingHistory from "./DrivingHistory.tsx";

const testTrips: Trip[] = [
  {
    id: "1",
    date: "11th May 2023",
    distance: 10,
    incidents: 0,
    confirmed: true,
  },
];

const TestTripsProviders = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

describe("DrivingHistory", () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test.skip("selects trip when clicked", async () => {
    render(<DrivingHistory />, { wrapper: TestTripsProviders });
    const user = userEvent.setup();
    const tripRow = screen.getByRole("button", { name: /Select trip 1/i });
    await user.press(tripRow);
    expect(tripRow).toBeSelected();
  });

  test.todo("updates distance when changed");
});
