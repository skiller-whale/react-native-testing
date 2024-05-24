import { render, screen, within } from "@testing-library/react-native";
import { mockBaseTabScreenProps } from "../routes.js";
import DrivingHistory from "./DrivingHistory.jsx";

const testProps = mockBaseTabScreenProps("DrivingHistory", { trips: [] });

describe("DrivingHistory component", () => {
  test.todo("includes a table with the correct headers");
});
