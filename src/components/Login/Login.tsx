import { FC, SyntheticEvent, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import login from '~/services/login';
import LoadingScreen from '~/components/LoadingScreen';
import ErrorBlock from '~/components/ErrorBlock';

import './login-style.scss';


const initialFalsyFields = { username: false, password: false };

const Login: FC = () => {

  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [invalidFields, setInvalidFields] = useState(initialFalsyFields);
  const [emptyFields, setEmptyFields] = useState(initialFalsyFields);


  const resetWarnings = (emptyFieldName?: string) => {
    if (invalidFields.username || invalidFields.password) {
      setInvalidFields(initialFalsyFields);
    }
    if (emptyFields[emptyFieldName]) {
      setEmptyFields({...emptyFields, [emptyFieldName]: false});
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  }

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    resetWarnings('username');
    setUsername(e.target.value);
  }

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    resetWarnings('password');
    setPassword(e.target.value);
  }


  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.length || !password.length) {
      const resultingEmptyFields = {username: !username.length, password: !password.length};
      setEmptyFields(resultingEmptyFields);
      const errorMessage = `Fill the following fields: ${Object.keys(resultingEmptyFields).filter(f => resultingEmptyFields[f]).join(', ')}`;
      setErrorMessage(errorMessage);
      return errorMessage; // need for test
    }
    setIsLoading(true);
    resetWarnings();

    try {
      await login(username, password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setInvalidFields(error.cause);
      setErrorMessage(error.message);
      setIsLoading(false);
    }

  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">
          Password Health
        </h1>
        <input
          value={username}
          onChange={updateUsername}
          placeholder="Username"
          type="text"
          className={`input mt-24px ${invalidFields.username ? 'invalid' : ''} ${emptyFields.username ? 'empty' : ''}`}
          autoComplete="on"
        />
        <input
          value={password}
          onChange={updatePassword}
          placeholder="Password"
          type="password"
          className={`input mt-24px ${invalidFields.password ? 'invalid' : ''} ${emptyFields.password ? 'empty' : ''}`}
          autoComplete="on"
        />
        <ErrorBlock
          className={`mt-8px ${(emptyFields.username || emptyFields.password) ? 'empty-warning' : ''}`}
          error={errorMessage}
        />
        <button type="submit" className={`button ${errorMessage ? 'mt-8px' : 'mt-48px'}`}>
          Login
        </button>
      </form>
      {isLoading && <LoadingScreen />}
    </div>
  )
};

export default Login;
