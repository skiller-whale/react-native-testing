import { render, screen, userEvent } from "@testing-library/react-native";
import TripsProvider, { SetTripsProvider } from "../TripsState.jsx";
import useCursor from "../hooks/useCursor.js";
import DrivingHistory from "./DrivingHistory.jsx";

const testTrips = [
  {
    id: "1",
    date: "11th May 2023",
    distance: 10,
    incidents: 0,
  },
];

const TestTripsProviders = ({ children }) => {
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
