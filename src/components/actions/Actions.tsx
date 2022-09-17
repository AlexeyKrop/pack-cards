import React from 'react';

import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';

import s from './actions.module.css';

export const Actions: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <ReadOutlined className={s.icon} />
      <EditOutlined className={s.icon} />
      <DeleteOutlined className={s.icon} />
    </div>
  );
};
