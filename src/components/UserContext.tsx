import { createContext, useContext, useEffect, useState } from 'react';
import { API, unknownErrorMessage } from '~/constants';
import getUrl from '~/utils/getUrl';
import { clearToken, getToken } from '~/utils/tokenHandlers';

interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}

const UserContext = createContext<IUser>({
  updateUser: () => {},
  deleteData: () => {},
  errorMessage: null,
  isLoading: true,
  username: null,
  email: null,
  id: null,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const [id, setId] = useState<string>(null);

  const updateUser = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    const response = await fetch(getUrl(API.User), {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      }
    });

    const data = await response.json();

    if (response.status !== 200 || data?.error) {
      setErrorMessage(data?.error?.message || unknownErrorMessage);
      clearToken();
    } else {
      setUsername(data?.username);
      setEmail(data?.email);
      setId(data?.id);
    }

    setIsLoading(false);
  }

  const deleteData = () => {
    setErrorMessage(null);
    setIsLoading(false);
    setUsername(null);
    setEmail(null);
    setId(null);
  };

  useEffect(() => {
   updateUser();
  }, []);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    username,
    email,
    id,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;