import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
import { Routes } from '~/constants';
import { getToken } from '~/utils/tokenHandlers';


const PublicRoute: FC<RouteProps> = ({
  path,
  component,
}) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (getToken()) {
      push(Routes.PasswordHealth);
    } else if (pathname !== Routes.Login) {
      push(Routes.Login);
    }
  }, [])

  return <Route path={path} component={component} />
};

export default PublicRoute;
