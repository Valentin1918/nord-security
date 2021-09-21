import { FC, useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import { getToken } from '~/utils/tokenHandlers';


const PrivateRoute: FC<RouteProps> = ({
  path,
  component,
}) => {
  const { push } = useHistory();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      push(Routes.Login);
    }
  }, [])

  return token ? <Route path={path} component={component} /> : null
};

export default PrivateRoute;
