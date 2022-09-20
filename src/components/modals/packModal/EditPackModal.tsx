import React, { ChangeEvent, useState } from 'react';

import { Checkbox, Input, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { editCardsPackTC } from '../../../store/reducers/packsReducer';

export type EditPackModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  id: string;
};
const DELAY = 2000;

export const EditPackModal: React.FC<EditPackModalType> = ({
  id,
  open,
  setOpen,
  title,
}) => {
  const dispatch = useAppDispatch();
  const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id));

  const [value, setValue] = useState(pack && pack.name);
  const [checked, setChecked] = useState(pack && pack.private);
  const [error, setError] = useState<boolean>(false);
  const handleOk: () => void = () => {
    if (value && value.trim() === '') {
      setError(true);

      return;
    }
    dispatch(editCardsPackTC({ name: value, _id: id }));
    setTimeout(() => {
      setOpen(false);
    }, DELAY);
  };

  const handleCancel: () => void = () => {
    setOpen(false);
  };
  const onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    setError(false);
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
        style={{ marginBottom: 30 }}
        placeholder={error ? 'enter valid pack name' : 'Name Pack'}
        status={error ? 'error' : ''}
      />
      <Checkbox checked={checked} onChange={onChange}>
        Private pack
      </Checkbox>
    </Modal>
  );
};
