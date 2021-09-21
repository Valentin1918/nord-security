import { API, unknownErrorMessage } from '~/constants';
import getUrl from '~/utils/getUrl';
import { clearToken, getToken } from '~/utils/tokenHandlers';


export interface IItem {
  id: string,
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  });

  const data = await response.json();

  const { items, error } = data;
  if (response.status !== 200 || !items || error) {
    clearToken();
    throw new Error(error?.message || unknownErrorMessage);
  }

  return items;
};

export default getUserItems;
