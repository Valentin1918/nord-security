import { useCallback, useEffect, useState } from 'react';
import getUserItems, { IItem } from '~/services/getUserItems';


const userItemsProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([])

  const updateItem = useCallback((newItem) => {
    const updatedItems = [...items];
    const itemPosition = updatedItems.findIndex(({id}) => id === newItem.id);
    updatedItems.splice(itemPosition, 1, newItem);
    setItems(updatedItems);
  }, [items]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const userItems = await getUserItems();
        setItems(userItems);
      } catch (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    })()
  }, []);

  return {
    isLoading,
    errorMessage,
    setErrorMessage,
    items,
    updateItem,
  }
};

export default userItemsProvider;
