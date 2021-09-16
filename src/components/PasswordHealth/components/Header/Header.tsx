import { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IItem } from '~/services/getUserItems';
import logout from '~/services/logout';
import {Routes} from '~/constants';

import './header-style.scss';


interface IHeader {
  items: Array<IItem>,
  username: string,
  setErrorMessage: (error: string) => void,
}

const Header: FC<IHeader> = ({ items, username, setErrorMessage }) => {

  const { push } = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      push(Routes.Login);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const vulnerable = useMemo(() => !!items.length, [items])

  return (
    <div className={`header ${vulnerable ? 'vulnerable' : ''}`}>
      <div className="user-section">
        <button onClick={handleLogout}>
          {`Logout ${username}`}
        </button>
      </div>
      <h1>
        {
          vulnerable ?
            `${items.length} ${items.length === 1 ? 'Item is' : 'Items are'} vulnerable !` :
            'There is no vulnerable passwords !'
        }
      </h1>
      {vulnerable && (
        <span>
        Create new complex passwords to protect your accounts
      </span>
      )}
    </div>
  )
};

export default Header;
