import { useState } from "react";

const useCursor = <Item extends { id: string }>(initialItems: Item[]) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = items.find((item) => item.id === selectedId);

  const selectItem = (idOrObject: string | Item) => {
    const id = typeof idOrObject === "string" ? idOrObject : idOrObject.id;
    setSelectedId(id);
  };

  const updateSelectedItem = (newObject: Item) => {
    setItems((items) =>
      items.map((item) => (item.id === selectedId ? newObject : item))
    );
  };

  return [items, selectedItem, selectItem, updateSelectedItem] as const;
};

export default useCursor;
