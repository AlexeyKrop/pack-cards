import React from 'react';

import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import s from './actions.module.css';

export const Actions: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Button type="text" icon={<ReadOutlined className={s.icon} />} size="middle" />
      <Button type="text" icon={<EditOutlined className={s.icon} />} size="middle" />
      <Button type="text" icon={<DeleteOutlined className={s.icon} />} size="middle" />
    </div>
  );
};
