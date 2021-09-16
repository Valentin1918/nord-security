import * as getUrl from '~/utils/getUrl';
import * as tokenHandlers from '~/utils/tokenHandlers';
import { unknownErrorMessage } from '~/constants';
import login from '../login';


const getUrlMock = jest.fn(() => 'some-url');
const setToken = jest.fn();

jest.spyOn(tokenHandlers, 'setToken').mockImplementation(setToken);
jest.spyOn(getUrl, 'default').mockImplementation(getUrlMock);

Object.defineProperty(window, 'fetch', {
  value: jest.fn(() => Promise.resolve({
    json: jest.fn(() => ({token: 'some-token'})),
    status: 200,
  })),
  writable: true,
});

describe('check login API call', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ordinary checking with response status === 200', async () => {

    expect(setToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);
    await login('somebody', 'some-password');
    expect(setToken).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {
      body: JSON.stringify({username: 'somebody', password: 'some-password'}), 'headers': {
        'Content-Type': 'application/json',
      }, 'method': 'POST'});
  })

  it('checking with response status !== 200', async () => {

    Object.defineProperty(window, 'fetch', {
      value: jest.fn(() => Promise.resolve({
        json: jest.fn(() => ({error: {message: 'some error'}})),
        status: 401,
      }))
    });

    expect(setToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);

    await expect(login('somebody', 'some-password'))
      .rejects
      .toThrow('some error');

    expect(setToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {
      body: JSON.stringify({username: 'somebody', password: 'some-password'}), 'headers': {
        'Content-Type': 'application/json',
      }, 'method': 'POST'});
  })

  it('checking response without token', async () => {

    Object.defineProperty(window, 'fetch', {
      value: jest.fn(() => Promise.resolve({
        json: jest.fn(() => ({})),
        status: 200,
      }))
    });

    expect(setToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(0);

    await expect(login('somebody', 'some-password'))
      .rejects
      .toThrow(unknownErrorMessage);

    expect(setToken).toBeCalledTimes(0);
    expect(window.fetch).toBeCalledTimes(1);
    expect(window.fetch).toBeCalledWith('some-url', {
      body: JSON.stringify({username: 'somebody', password: 'some-password'}), 'headers': {
        'Content-Type': 'application/json',
      }, 'method': 'POST'});
  })

});
