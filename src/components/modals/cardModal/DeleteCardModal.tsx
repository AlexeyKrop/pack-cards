import React from 'react';

import { Modal } from 'antd';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { deleteCardsCardTC } from '../../../store/reducers/cardsReducer';

export type DeleteCardModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  id: string;
};
export const DeleteCardModal: React.FC<DeleteCardModalType> = ({
  title,
  open,
  setOpen,
  id,
}) => {
  const dispatch = useAppDispatch();
  // const card = useAppSelector(state => state.cards.cards.find(p => p._id === id));
  const handleOk: () => void = () => {
    dispatch(deleteCardsCardTC(id));
  };

  const handleCancel: () => void = () => {
    setOpen(false);
  };

  return (
    <Modal
      okText="Delete"
      okType="danger"
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h4>
        Do you really want to remove <strong>pack && pack.name</strong>? All cards will be
        deleted.
      </h4>
    </Modal>
  );
};
