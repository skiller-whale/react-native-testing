import { render, screen, within } from "@testing-library/react-native";
import { mockBaseTabScreenProps } from "../routes.ts";
import DrivingHistory from "./DrivingHistory.tsx";

const testProps = mockBaseTabScreenProps("DrivingHistory", { trips: [] });

describe("DrivingHistory component", () => {
  test.todo("includes a table with the correct headers");
});
