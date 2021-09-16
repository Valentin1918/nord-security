import { API, unknownErrorMessage } from '~/constants';
import getUrl from '../utils/getUrl';
import { setToken } from '~/utils/tokenHandlers';


class ValidationError extends Error {
  private cause: {[key: string]: boolean};
  constructor(errObj) {
    super(errObj?.message || unknownErrorMessage);
    this.name = 'ValidationError';
    this.cause = errObj?.fields;
  }
}

const login = async (username: string, password: string) => {

  const response = await fetch(getUrl(API.Login), {
    method: "POST",
    body: JSON.stringify({username, password}),
    headers: {'Content-Type': 'application/json'},
  });

  const data = await response.json();
  const { token, error } = data;
  if (response.status !== 200 || !token || error) {
    throw new ValidationError(error);
  }

  setToken(token);
};

export default login;
