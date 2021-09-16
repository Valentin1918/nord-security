import { passwords } from '../data';


const items = [];

export const updateItem = (item) => {
  items.push(item);
};

export const getItems = () => {
  return passwords.map((passwordItem) => {
    const allItemUpdates = items.filter(({ id }) => id === passwordItem.id);

    return allItemUpdates.length ? allItemUpdates[allItemUpdates.length - 1] : passwordItem;
  })
};



