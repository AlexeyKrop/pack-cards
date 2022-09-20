import React, { ChangeEvent, useState } from 'react';

import { Checkbox, Input, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { editCardsPackTC } from '../../../store/reducers/packsReducer';

export type EditPackModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  id: string;
};
export const EditPackModal: React.FC<EditPackModalType> = ({
  id,
  open,
  setOpen,
  title,
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

  const handleOk: () => void = () => {
    dispatch(editCardsPackTC({ name: value, _id: id }));
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
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <Input
        onChange={onChangeInputValue}
        value={value}
        bordered={false}
        style={{ borderBottom: '2px solid rgba(0, 0, 0, .5) ', marginBottom: 30 }}
        placeholder="Name Pack"
      />
      <Checkbox checked={checked} onChange={onChange}>
        Private pack
      </Checkbox>
    </Modal>
  );
};
