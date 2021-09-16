import { FC } from 'react';
import { Routes } from '~/constants';
import FilterTab from './components/FilterTab';

import './filter-style.scss';


export interface IFilter {
  list: number,
  securedList: number,
  vulnerableList: number,
  weakList: number,
  reusedList: number,
  oldList: number,
}

const Filter: FC<IFilter> = ({list, securedList, vulnerableList, weakList, reusedList, oldList}) => (
  <div className="filter">
    <FilterTab title="All" count={list} path={Routes.PasswordHealth} />
    <FilterTab title="Secured" count={securedList} path={Routes.Secured} />
    <FilterTab title="Vulnerable" count={vulnerableList} path={Routes.Vulnerable} />
    <FilterTab title="Weak" count={weakList} path={Routes.Weak} />
    <FilterTab title="Reused" count={reusedList} path={Routes.Reused} />
    <FilterTab title="Old" count={oldList} path={Routes.Old} />
  </div>
)

export default Filter;
