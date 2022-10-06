import React, { ChangeEvent, useState } from 'react';

import { Input, Modal, Select } from 'antd';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { editCardsCardTC } from '../../../store/reducers/cardsReducer';

export type EditPackModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  id: string;
};
const DELAY = 2000;

export const EditCardModal: React.FC<EditPackModalType> = ({
  id,
  open,
  setOpen,
  title,
}) => {
  const card = useAppSelector(state => state.cards.cards.find(c => c._id === id));
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>(card!.answer);
  const [question, setQuestion] = useState<string>(card!.question);

  const handleOk: () => void = () => {
    dispatch(editCardsCardTC({ _id: id, question: value, comments: question }));
    setTimeout(() => {
      setOpen(false);
    }, DELAY);
  };

  const handleCancel: () => void = () => {
    setOpen(false);
  };
  const onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const { value } = e.currentTarget;

    setValue(value);
  };
  const onChangeQuestionsInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const { value } = e.currentTarget;

    setQuestion(value);
  };
  const { Option } = Select;

  const handleChange: (value: string) => void = value => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <Select
        defaultValue="Text"
        style={{ width: 472, marginBottom: 30 }}
        onChange={handleChange}
      >
        <Option value="Text">Text</Option>
        <Option value="Image">Image</Option>
        <Option value="Video">Video</Option>
      </Select>
      <Input
        onChange={onChangeQuestionsInputValue}
        value={question}
        style={{ marginBottom: 30 }}
        placeholder="Questions"
      />
      <Input
        onChange={onChangeInputValue}
        value={value}
        style={{ marginBottom: 30 }}
        placeholder="Answer"
      />
    </Modal>
  );
};
