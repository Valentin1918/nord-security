import { API, unknownErrorMessage } from '~/constants';
import getUrl from '~/utils/getUrl';
import { clearToken, getToken } from '~/utils/tokenHandlers';


const logout = async () => {
  const currentToken = getToken();

  const response = await fetch(getUrl(API.Logout), {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    }
  });

  clearToken();

  if (response.status !== 200) {
    const data = await response.json();
    throw new Error(data?.error?.message || unknownErrorMessage);
  }
};

export default logout;
