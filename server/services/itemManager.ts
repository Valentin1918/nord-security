import { passwords } from '../data';

let items = [];

export const updateItem = (item) => {
  items.push(item);
};

export const getItems = () => {
  return passwords.map((passwordItem) => {
    const updatedItem = items.find(({ id }) => id === passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  })
};



