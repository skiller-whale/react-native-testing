import { useState } from "react";

const useCursor = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(null);

  const selectedItem = items.find((item) => item.id === selectedId);

  const selectItem = (idOrObject) => {
    const id = typeof idOrObject === "string" ? idOrObject : idOrObject.id;
    setSelectedId(id);
  };

  const updateSelectedItem = (newObject) => {
    setItems((items) =>
      items.map((item) => (item.id === selectedId ? newObject : item))
    );
  };

  return [items, selectedItem, selectItem, updateSelectedItem];
};

export default useCursor;
