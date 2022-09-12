import * as React from 'react';
import { useState } from 'react';

import { EditFilled } from '@ant-design/icons';

type EditableSpanType = {
  callBack: (name: string, avatar?: string) => void;
  title: string;
};

export const EditableSpan: React.FC<EditableSpanType> = ({ callBack, title }) => {
  const [editMode, setEditMode] = useState(false);

  const onClickDoubleHandler: () => void = () => {
    setEditMode(!editMode);
  };
  const onClickHandler: () => void = () => {
    callBack('inputValue');
    onClickDoubleHandler();
  };

  return (
    <div>
      {!editMode ? (
        <div onDoubleClick={onClickDoubleHandler}>
          <span>{title}</span>
          <EditFilled style={{ width: '20px', height: '20px' }} />
        </div>
      ) : (
        <div>
          <input type="text" />
          <button type="button" onClick={onClickHandler}>
            submit
          </button>
        </div>
      )}
    </div>
  );
};
