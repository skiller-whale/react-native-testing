import { render, screen, userEvent } from "@testing-library/react-native";
import type { Trip } from "../../lib/trips.ts";
import { mockModuleStackScreenProps } from "../../src_app/routes.ts";
import App from "./App.tsx";

const testTrips: Trip[] = [
  {
    id: "1",
    date: "11th May 2023",
    distance: 10,
    incidents: 0,
    confirmed: true,
  },
];

describe("App", () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test.skip("renders 'no trips available' for empty trips", () => {
    const props = mockModuleStackScreenProps("/ts/interactivity", {
      trips: [],
    });
    render(<App {...props} />);
    const notification = screen.getByText(/No trips available/i);
    expect(notification).toBeOnTheScreen();
  });

  test("renders 'Assessment' tab by default", () => {
    const props = mockModuleStackScreenProps("/ts/interactivity", {
      trips: testTrips,
    });
    render(<App {...props} />);
    const heading = screen.getByRole("heading", {
      name: /Overall Assessment/i,
    });
    expect(heading).toBeOnTheScreen();
  });

  test.todo("renders 'Trips' tab when link is clicked");
});
