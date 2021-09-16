import { FC } from 'react';

interface IItemIcon {
  title: string,
}

const ItemIcon: FC<IItemIcon> = ({title}) => (
  <div className="item-icon">
    {title.substring(0, 2)}
  </div>
);

export default ItemIcon;
