import { FC, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IItem } from '~/services/getUserItems';
import {Routes} from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import itemIsOld from '~/utils/itemIsOld';
import { useUserContext } from '../UserContext';
import LoadingScreen from '../LoadingScreen';
import ErrorBlock from '../ErrorBlock';
import useItemsProvider from './useItemsProvider';
import List from './components/List/List';
import Filter, { IFilter } from './components/Filter/Filter';
import Header from './components/Header/Header';


const routesMap = [
  { path: Routes.PasswordHealth, itemsName: 'list', exact: true },
  { path: Routes.Secured, itemsName: 'securedList', exact: false },
  { path: Routes.Vulnerable, itemsName: 'vulnerableList', exact: false },
  { path: Routes.Weak, itemsName: 'weakList', exact: false },
  { path: Routes.Reused, itemsName: 'reusedList', exact: false },
  { path: Routes.Old, itemsName: 'oldList', exact: false },
]

const PasswordHealth: FC = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    isLoading,
    errorMessage,
    setErrorMessage,
    updateItem,
  } = useItemsProvider();

  const {itemsMap, countsMap} = useMemo(() => {

    const itemsMap = {
      list: items,
      securedList: items.filter(item => !itemHasWeakPassword(item) && !itemHasReusedPassword(item, items) && !itemIsOld(item)),
      vulnerableList: items.filter(item => itemHasWeakPassword(item) || itemHasReusedPassword(item, items) || itemIsOld(item)),
      weakList: items.filter(itemHasWeakPassword),
      reusedList: items.filter(item => itemHasReusedPassword(item, items)),
      oldList: items.filter(itemIsOld),
    };

    const countsMap = Object.entries(itemsMap).reduce((acc: IFilter, [key, value]: [string, IItem[]]) => {
      acc[key] = value.length
      return acc
    }, {list: 0, securedList: 0, vulnerableList: 0, weakList: 0, reusedList: 0, oldList: 0})

    return {
      itemsMap,
      countsMap,
    }
  }, [items])

  const handleUpdateItem = (response: IItem | string) => {
    if (typeof response === 'string') {
      setErrorMessage(response);
    } else {
      updateItem(response);
    }
  }

  const routes = useMemo(() => routesMap.map(({path, itemsName, exact}) => (
    <Route exact={exact} path={path} key={`route_${itemsName}`}>
      <List items={itemsMap[itemsName]} handleUpdateItem={handleUpdateItem} />
    </Route>
  )), [items])

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />
  }

  return (
    <div className="container">
      <Header items={itemsMap.vulnerableList} username={username} setErrorMessage={setErrorMessage} />
      <Filter {...countsMap} />
      <Switch>
        {routes}
        <Redirect to={Routes.PasswordHealth} />
      </Switch>
    </div>
  );
};

export default PasswordHealth;
