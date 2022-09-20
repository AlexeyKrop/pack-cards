import React from 'react';

import { FolderViewOutlined } from '@ant-design/icons';

import avatar from '../../../assets/profile/avatar.png';

import s from './avatar.module.css';

type AvatarType = {
  width?: string;
  mode?: 'profile' | 'header';
};

export const Avatar: React.FC<AvatarType> = ({ mode, width }) => {
  return (
    <div className={s.block}>
      <img style={{ width }} src={avatar} alt="avatar" />
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
