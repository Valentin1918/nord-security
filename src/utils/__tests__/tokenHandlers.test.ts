import { getToken, clearToken, setToken } from '../tokenHandlers';


describe('check if token handlers interact with localStorage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      }
    });
  });

  it('getToken checking', () => {
    expect(window.localStorage.getItem).toBeCalledTimes(0);
    getToken();
    expect(window.localStorage.getItem).toBeCalledTimes(1);
    expect(window.localStorage.getItem).toBeCalledWith('token');
  })

  it('setToken checking', () => {
    expect(window.localStorage.setItem).toBeCalledTimes(0);
    setToken('new_token');
    expect(window.localStorage.setItem).toBeCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith('token', 'new_token');
  })

  it('clearToken checking', () => {
    expect(window.localStorage.removeItem).toBeCalledTimes(0);
    clearToken();
    expect(window.localStorage.removeItem).toBeCalledTimes(1);
    expect(window.localStorage.removeItem).toBeCalledWith('token');
  })
});
