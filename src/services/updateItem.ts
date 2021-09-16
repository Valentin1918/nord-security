import { API, unknownErrorMessage } from '~/constants';
import getUrl from '~/utils/getUrl';
import { clearToken, getToken } from '~/utils/tokenHandlers';
import { IItem } from './getUserItems';


const updateItem = async (itemToUpdate: IItem) => {
  const response = await fetch(getUrl(API.Items), {
    method: "POST",
    body: JSON.stringify(itemToUpdate),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }
  });

  const data = await response.json();
  const { item, error, status } = data;

  if (response.status !== 200 || !item || error) {
    clearToken();
    throw new Error(error?.message || unknownErrorMessage);
  }

  return data.item;
}

export default updateItem;