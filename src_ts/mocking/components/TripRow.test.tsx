import { render, screen, userEvent } from "@testing-library/react-native";
import type { Trip } from "../../../lib/trips";
import TripRow from "./TripRow.tsx";

const testTrip: Trip = {
  id: "trip-1",
  date: "1st July 2020",
  incidents: 2,
  distance: 30,
  confirmed: false,
};

describe("TripRow", () => {
  beforeAll(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  afterAll(() => jest.useRealTimers());

  test.skip("confirm button triggers confirmation", async () => {
    const user = userEvent.setup();
    render(<TripRow trip={testTrip} confirmTrip={async () => {}} />);

    const confirmButton = screen.getByRole("button", {
      name: "Confirm trip trip-1",
    });
    await user.press(confirmButton);
  });
});
