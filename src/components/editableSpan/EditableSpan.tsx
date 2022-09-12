import * as React from 'react';
import { ChangeEvent, useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';

import s from './editableSpan.module.css';

type EditableSpanType = {
  callBack: (name: string, avatar?: string) => void;
  title: string;
};

export const EditableSpan: React.FC<EditableSpanType> = ({ callBack, title }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>(title);

  const onClickDoubleHandler: () => void = () => {
    setInputValue(title);
    setEditMode(!editMode);
  };
  const handleClick: () => void = () => {
    callBack(inputValue);
    onClickDoubleHandler();
  };

  const changeUserNameValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className={s.wrapper}>
      {!editMode ? (
        <div onDoubleClick={onClickDoubleHandler}>
          <span>{title}</span>
          <EditFilled style={{ width: '20px', height: '20px' }} />
        </div>
      ) : (
        <div className={s.group}>
          <Input
            bordered={false}
            autoFocus
            className={s.input}
            value={inputValue}
            onChange={changeUserNameValue}
          />
          <Button size="small" className={s.btn} onClick={handleClick}>
            save
          </Button>
        </div>
      )}
    </div>
  );
};
