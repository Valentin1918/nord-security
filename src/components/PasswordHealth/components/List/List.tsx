import {FC, useState} from 'react';
import {IItem} from "~/services/getUserItems";
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  items: Array<IItem>,
}

interface IUpdateModal {
  item: IItem;
}

const UpdateModal: FC<IUpdateModal> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)} 
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={async () => {
            await updateItem({
              ...item,
              password: newPass,
            })

            window.location.reload();
          }}>Change</button>
          <button className="button ml-12px" onClick={() => {
            setNewPass('');
            setShowModal(false)
          }}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

const List: FC<IList> = ({items}) => (
  <ul className="list">
    {
      items.map((item) => (
        <li className="item">
          <ItemIcon title={item.title}/>
          <div>
            <div className="title">
              {item.title}
            </div>
            <div className="description">
              {item.description}
            </div>
          </div>
          <UpdateModal item={item} />
        </li>
      ))
    }
  </ul>
)

export default List;
