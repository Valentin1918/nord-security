import { FC, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { IItem } from '~/services/getUserItems';
import updateItem from '~/services/updateItem';
import { Routes } from '~/constants';
import { getToken } from '~/utils/tokenHandlers';

import './update-modal.scss';


interface IUpdateModal {
  item: IItem,
  handleUpdateItem: (response: IItem | string) => void,
}

const UpdateModal: FC<IUpdateModal> = ({ item, handleUpdateItem }) => {

  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    Modal.setAppElement('#app');
  }, []);

  const handleOpenModal = () => {
    if (getToken()) {
      setShowModal(true);
    } else {
      push(Routes.Login);
    }
  }

  const onRequestClose = () => setShowModal(false);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdatePassword().finally();
    }
  }

  const closeModal = () => {
    setNewPass('');
    setShowModal(false);
  }

  const handleUpdatePassword = async () => {
    try {
      const updatedItem = await updateItem({...item, password: newPass});
      closeModal();
      handleUpdateItem(updatedItem);
    } catch (error) {
      handleUpdateItem(error.message);
    }
  }

  return (
    <>
      <button className="update" onClick={handleOpenModal}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={handleChangePassword}
          onKeyDown={onKeyDown}
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={handleUpdatePassword}>
            Change
          </button>
          <button className="button ml-12px" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UpdateModal;
