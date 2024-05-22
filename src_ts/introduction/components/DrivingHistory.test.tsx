import { render, screen, within } from "@testing-library/react-native";
import { mockBaseTabScreenProps } from "../routes.ts";
import DrivingHistory from "./DrivingHistory.tsx";

const testProps = mockBaseTabScreenProps("DrivingHistory", { trips: [] });

describe("DrivingHistory component", () => {
  test("includes a table with the correct headers", () => {
    render(<DrivingHistory {...testProps} />);
    const table = screen.getByRole("table");
    expect(table).toBeOnTheScreen();
    expect(
      within(table).getByRole("columnheader", { name: "Date" }),
    ).toBeOnTheScreen();
    expect(
      within(table).getByRole("columnheader", { name: "Distance" }),
    ).toBeOnTheScreen();
    expect(
      within(table).getByRole("columnheader", { name: "Incidents" }),
    ).toBeOnTheScreen();
    expect(
      within(table).getByRole("columnheader", { name: "Score" }),
    ).toBeOnTheScreen();
  });
});
