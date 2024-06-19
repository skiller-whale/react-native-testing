import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import App from "./App.jsx";
import setupMockServer from "./mocks/setupMockServer.js";

const testTrips = [
  {
    id: "trip-1",
    date: "1st July 2020",
    incidents: 2,
    distance: 30,
    confirmed: false,
  },
];

setupMockServer(testTrips);

describe("App", () => {
  beforeAll(() => jest.useFakeTimers());
  afterEach(() => jest.runOnlyPendingTimers());
  afterAll(() => jest.useRealTimers());

  test.todo("renders 'loading' placeholder, then driving assessment");

  test.skip("renders driving history when trips tab clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tripsTab = screen.getByRole("button", { name: "Driving history tab" });
    await user.press(tripsTab);

    const heading = screen.getByRole("heading", { name: "Driving History" });
    expect(heading).toBeOnTheScreen();
  });
});
