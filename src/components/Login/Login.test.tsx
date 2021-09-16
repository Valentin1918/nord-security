import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Login from './Login';


jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as object),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const getWrapper = (additionalProps = {}) => mount(<Login {...additionalProps} />);

describe('Login checking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('Check Login mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.login-page')).toBeTruthy();
    expect(wrapper.find('.login-form')).toBeTruthy();
    expect(wrapper.find('.input').length).toBe(2);
    expect(wrapper.find('.text-center')).toBeTruthy();
    expect(wrapper.find('.text-center').text()).toBe('Password Health');
    expect(wrapper.find('.button').length).toBe(1);
    expect(wrapper.find('.button').first().text()).toBe('Login');
    expect(wrapper.find('ErrorBlock').length).toBe(0);
  })

  it('Check Login handler with empty fields', async () => {
    const wrapper = getWrapper();
    await act(async () => {
      const reply = await wrapper.find('.login-form').prop('onSubmit')({preventDefault: jest.fn()});
      expect(reply).toBe('Fill the following fields: username, password');
    })
  })

  it('Check Login handler with empty password', async () => {
    const wrapper = getWrapper();
    await act(async () => {
      await wrapper.find('.input').at(0).simulate('change', { target: { value: 'some user' } });
    })
    wrapper.update();
    await act(async () => {
      const reply = await wrapper.find('.login-form').prop('onSubmit')({preventDefault: jest.fn()});
      expect(reply).toBe('Fill the following fields: password');
    })
  })

  it('Check Login handler with empty username', async () => {
    const wrapper = getWrapper();
    await act(async () => {
      await wrapper.find('.input').at(1).simulate('change', { target: { value: 'strong-password' } });
    })
    wrapper.update();
    await act(async () => {
      const reply = await wrapper.find('.login-form').prop('onSubmit')({preventDefault: jest.fn()});
      expect(reply).toBe('Fill the following fields: username');
    })
  })

})
