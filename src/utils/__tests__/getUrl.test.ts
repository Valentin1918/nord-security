import getUrl from '../getUrl';
import { API } from '../../constants';

process.env.API_URL = 'http://localhost:9003';

describe('should convert api url and params to URI', () => {
  test.each([
    [
      'http://localhost:9003/api/login',
      API.Login,
      {},
    ],
    [
      'http://localhost:9003/api/login?username=vardenis',
      API.Login,
      {
        username: 'vardenis'
      },
    ],
    [
      'http://localhost:9003/api/login?id=1234',
      API.Login,
      {
        id: 1234
      },
    ],
  ])('should return %s', (expectedResult, api, params) => {
    expect(getUrl(api, params)).toBe(expectedResult);
  });
})
