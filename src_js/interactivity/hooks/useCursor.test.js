import { act, renderHook } from "@testing-library/react-native";
import useCursor from "./useCursor.js";

const testItems = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
];

describe("useCursor", () => {
  const items = 0;
  const selectedItem = 1;
  const selectItem = 2;
  const updateSelectedItem = 3;

  test("returns initial items with none selected", () => {
    const { result } = renderHook(() => useCursor(testItems));
    expect(result.current[items]).toEqual(testItems);
    expect(result.current[selectedItem]).toBeUndefined();
  });

  test.todo("selects an item");

  test.todo("updates the selected item");
});
