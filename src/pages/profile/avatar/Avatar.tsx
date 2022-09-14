import React from 'react';

import { FolderViewOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import avatar from '../../../assets/profile/avatar.png';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';

import s from './avatar.module.css';

type AvatarType = {
  width?: string;
  name?: string;
  mode?: 'profile' | 'header';
};

export const Avatar: React.FC<AvatarType> = ({ mode, width, name }) => {
  const isDisabled = useAppSelector(state => state.profile.isDisabled);

  return (
    <div className={s.block}>
      <Button type="text" loading={isDisabled}>
        {name}
      </Button>
      <img style={{ width, marginLeft: 5 }} src={avatar} alt="avatar" />
      {mode === 'profile' && (
        <div className={s.circle}>
          <div className={s.btn}>
            <FolderViewOutlined />
          </div>
        </div>
      )}
    </div>
  );
};
