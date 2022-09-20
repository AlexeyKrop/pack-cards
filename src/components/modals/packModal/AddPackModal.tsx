import React, { ChangeEvent, useState } from 'react';

import { Button, Checkbox, Input, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { createCardsPackTC } from '../../../store/reducers/packsReducer';

export const AddPackModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

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
  const onChange: (e: CheckboxChangeEvent) => void = e => {
    const { checked } = e.target;

    setChecked(checked);
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
          style={{ borderBottom: '2px solid #000000', opacity: 0.2, marginBottom: 30 }}
          placeholder="Name Pack"
        />
        <Checkbox checked={checked} onChange={onChange}>
          Private pack
        </Checkbox>
      </Modal>
    </>
  );
};
