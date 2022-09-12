import * as React from 'react';
import { useState } from 'react';

import { EditFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';

import s from './editableSpan.module.css';

type EditableSpanType = {
  callBack: (name: string, avatar?: string) => void;
  title: string;
};

export const EditableSpan: React.FC<EditableSpanType> = ({ callBack, title }) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState<string>(title);

  const onClickDoubleHandler: () => void = () => {
    setValue(title);
    setEditMode(!editMode);
  };
  const handleClick: () => void = () => {
    callBack(value);
    onClickDoubleHandler();
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
          <Input bordered={false} autoFocus className={s.input} value={value} />
          <Button size="small" className={s.btn} onClick={handleClick}>
            save
          </Button>
        </div>
      )}
    </div>
  );
};
