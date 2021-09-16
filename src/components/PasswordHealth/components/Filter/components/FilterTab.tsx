import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface IFilterTab {
  title: string;
  count: number;
  path: string;
}

const FilterTab: FC<IFilterTab> = ({
  title,
  count,
  path,
}) => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={`filter-tab ${path === pathname ? 'active': ''}`} onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
}

export default FilterTab;
