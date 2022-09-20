import React, { ChangeEvent, useState } from 'react';

import { Button, Checkbox, Input, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { createCardsPackTC } from '../../../store/reducers/packsReducer';

const DELAY = 2000;

export const AddPackModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const packStatus = useAppSelector(state => state.packs.packStatus);

  const showModal: () => void = () => {
    setOpen(true);
  };

  const handleOk: () => void = () => {
    if (value.trim() === '') {
      setError(true);

      return;
    }
    dispatch(createCardsPackTC({ name: value, private: checked }));
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
    <>
      <Button onClick={showModal} type="primary">
        Add new pack
      </Button>
      <Modal
        title="Add New Pack"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={packStatus === 'loading'}
      >
        <Input
          onChange={onChangeInputValue}
          value={value}
          style={{ marginBottom: 30 }}
          placeholder={error ? 'enter valid pack name' : 'Name Pack'}
          status={error ? 'error' : ''}
        />
        <Checkbox checked={checked} onChange={onChange}>
          Private pack
        </Checkbox>
      </Modal>
    </>
  );
};
