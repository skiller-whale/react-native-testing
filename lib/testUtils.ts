import type { ListRenderItemInfo } from "react-native";

export const mockListRenderItemInfo = <Item>(
  item: Item,
): ListRenderItemInfo<Item> => ({
  index: 1,
  separators: {
    highlight: jest.fn(),
    unhighlight: jest.fn(),
    updateProps: jest.fn(),
  },
  item,
});
