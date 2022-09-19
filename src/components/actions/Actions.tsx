import React from 'react';

import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { selectUserID } from '../../store/selectors/selectProfile/selectUserID';

import s from './actions.module.css';

type ActionsType = {
  _id: string;
};
export const Actions: React.FC<ActionsType> = ({ _id }) => {
  const userID = useAppSelector(selectUserID);

  return (
    <div className={s.wrapper}>
      <Button type="text" icon={<ReadOutlined className={s.icon} />} size="middle" />
      {userID === _id && (
        <>
          <Button type="text" icon={<EditOutlined className={s.icon} />} size="middle" />
          <Button
            type="text"
            icon={<DeleteOutlined className={s.icon} />}
            size="middle"
          />
        </>
      )}
    </div>
  );
};
