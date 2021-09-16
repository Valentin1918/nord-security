import { FC } from 'react';
import { IItem } from '~/services/getUserItems';
import UpdateModal from '~/components/PasswordHealth/components/UpdateModal/UpdateModal';
import ItemIcon from './components/ItemIcon';

import './list-style.scss';


interface IList {
  items: Array<IItem>,
  handleUpdateItem: (response: IItem | string) => void,
}

const List: FC<IList> = ({ items, handleUpdateItem }) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item" key={`item_${item.id}`}>
        <ItemIcon title={item.title} />
        <div>
          <div className="title">
            {item.title}
          </div>
          <div className="description">
            {item.description}
          </div>
        </div>
        <UpdateModal item={item} handleUpdateItem={handleUpdateItem} />
      </li>
    ))}
  </ul>
)

export default List;
