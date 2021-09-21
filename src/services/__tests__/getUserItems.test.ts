import * as getUrl from '~/utils/getUrl';
import * as tokenHandlers from '~/utils/tokenHandlers';
import { unknownErrorMessage } from '~/constants';
import getUserItems from '../getUserItems';


const getUrlMock = jest.fn(() => 'some-url');
const clearToken = jest.fn();
const getToken = jest.fn(() => 'someToken');

jest.spyOn(tokenHandlers, 'clearToken').mockImplementation(clearToken);
jest.spyOn(tokenHandlers, 'getToken').mockImplementation(getToken);
jest.spyOn(getUrl, 'default').mockImplementation(getUrlMock);

Object.defineProperty(window, 'fetch', {
  value: jest.fn(() => Promise.resolve({
    json: jest.fn(() => ({items: []})),
    status: 200,
  })),
  writable: true,
});

describe('check getUserItems API call', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ordinary checking with response status === 200', async () => {

    expect(getToken).toBeCalledTimes(0);
    expect(clearToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);
    await getUserItems();
    expect(getToken).toBeCalledTimes(1);
    expect(clearToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {'headers': {'Authorization': 'Bearer someToken'}});
  })

  it('checking with response status !== 200', async () => {

    Object.defineProperty(window, 'fetch', {
      value: jest.fn(() => Promise.resolve({
        json: jest.fn(() => ({error: {message: 'some error'}})),
        status: 401,
      }))
    });

    expect(getToken).toBeCalledTimes(0);
    expect(clearToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);

    await expect(getUserItems())
      .rejects
      .toThrow('some error');

    expect(getToken).toBeCalledTimes(1);
    expect(clearToken).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {'headers': {'Authorization': 'Bearer someToken'}});
  })

  it('checking response without items', async () => {

    Object.defineProperty(window, 'fetch', {
      value: jest.fn(() => Promise.resolve({
        json: jest.fn(() => ({})),
        status: 200,
      }))
    });

    expect(getToken).toBeCalledTimes(0);
    expect(clearToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);

    await expect(getUserItems())
      .rejects
      .toThrow(unknownErrorMessage);

    expect(getToken).toBeCalledTimes(1);
    expect(clearToken).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {'headers': {'Authorization': 'Bearer someToken'}});
  })

});
