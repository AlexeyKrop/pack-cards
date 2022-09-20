import React from 'react';

import { Modal } from 'antd';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { deleteCardsPackTC } from '../../../store/reducers/packsReducer';

export type DeletePackModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  id: string;
};
export const DeletePackModal: React.FC<DeletePackModalType> = ({
  id,
  open,
  setOpen,
  title,
}) => {
  const dispatch = useAppDispatch();

  const handleOk: () => void = () => {
    dispatch(deleteCardsPackTC({ id }));
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
        Do you really want to remove <strong>Pack Name</strong>? All cards will be
        deleted.
      </h4>
    </Modal>
  );
};
