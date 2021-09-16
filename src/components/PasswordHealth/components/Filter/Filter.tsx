import { FC } from 'react';
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import FilterTab from "./components/FilterTab"

import './filter-style.scss';
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({items}) => {
  const weakItemsCount = items.reduce((count, item) => (
    itemHasWeakPassword(item) ? (count + 1) : count
  ), 0)

  const reusedItemsCount = items.reduce((count, item) => (
    itemHasReusedPassword(item, items) ? (count + 1) : count
  ), 0)

  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak}/>
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
    </div>
  );
};

export default Filter;
