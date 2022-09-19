import React, { ChangeEvent, useState } from 'react';

import { Button, Input, Modal } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { createCardsPackTC } from '../../store/reducers/packsReducer';

export const CustomModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal: () => void = () => {
    setOpen(true);
  };

  const handleOk: () => void = () => {
    dispatch(createCardsPackTC({ name: value }));
  };

  const handleCancel: () => void = () => {
    setOpen(false);
  };
  const onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const { value } = e.currentTarget;

    setValue(value);
  };

  return (
    <>
      <Button onClick={showModal} type="primary">
        Add new pack
      </Button>
      <Modal title="Add New Pack" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Input
          onChange={onChangeInputValue}
          value={value}
          bordered={false}
          style={{ borderBottom: '2px solid #000000', opacity: 0.2 }}
          placeholder="Name Pack"
        />
      </Modal>
    </>
  );
};
