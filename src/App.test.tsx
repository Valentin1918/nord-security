import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Routes } from '~/constants';
import * as tokenHandlers from '~/utils/tokenHandlers';
import App from './App'


const getWrapper = (additionalProps = {}) => shallow(<App {...additionalProps} />);

const getRouterWrapper = (route) => mount(
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>
);

jest.mock('./components/Login/Login', () => function Login() {
  return <div id="login-page" />
});
jest.mock('./components/PasswordHealth/PasswordHealth', () => function PasswordHealth() {
  return <div id="password-health" />
});


describe('App checking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('App should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.exists()).toBeTruthy();
  })

  it('PrivateRoute should handle a token absence and redirect to PublicRoute with Login', () => {
    const wrapper = getRouterWrapper('/random');
    expect(wrapper.find('Login').exists()).toBeTruthy();
    expect(wrapper.find('PublicRoute').exists()).toBeTruthy();
    expect(wrapper.find('PrivateRoute').exists()).toBeFalsy();
  })

  it('PublicRoute should handle a token absence and stay on PublicRoute with Login', () => {
    const wrapper = getRouterWrapper('/login/something');
    expect(wrapper.find('Login').exists()).toBeTruthy();
    expect(wrapper.find('PublicRoute').exists()).toBeTruthy();
    expect(wrapper.find('PrivateRoute').exists()).toBeFalsy();
  })

  it('PrivateRoute should handle a token absence and redirect on PublicRoute with Login', () => {
    const wrapper = getRouterWrapper(Routes.PasswordHealth);
    expect(wrapper.find('Login').exists()).toBeTruthy();
    expect(wrapper.find('PublicRoute').exists()).toBeTruthy();
    expect(wrapper.find('PrivateRoute').exists()).toBeFalsy();
  })

  it('PublicRoute should handle token and redirect to PrivateRoute with PasswordHealth', () => {
    jest.spyOn(tokenHandlers, 'getToken').mockImplementation(jest.fn(() => 'some-token'))
    const wrapper = getRouterWrapper(Routes.Login);
    expect(wrapper.find('PasswordHealth').exists()).toBeTruthy();
    expect(wrapper.find('PrivateRoute').exists()).toBeTruthy();
    expect(wrapper.find('PublicRoute').exists()).toBeFalsy();
  })

  it('PublicRoute should handle token and redirect to PrivateRoute with PasswordHealth (with wrong url)', () => {
    jest.spyOn(tokenHandlers, 'getToken').mockImplementation(jest.fn(() => 'some-token'))
    const wrapper = getRouterWrapper('/login/something');
    expect(wrapper.find('PasswordHealth').exists()).toBeTruthy();
    expect(wrapper.find('PrivateRoute').exists()).toBeTruthy();
    expect(wrapper.find('PublicRoute').exists()).toBeFalsy();
  })

})
