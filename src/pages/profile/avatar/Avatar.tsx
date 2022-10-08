import React, { useState } from 'react';

import avatar from '../../../assets/profile/avatar.png';
import { InputTypeFile } from '../../../components/inputTypeFile/InputTypeFile';
import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { setAppError } from '../../../store/reducers/appReducer';
import { selectUser } from '../../../store/selectors/selectProfile/selectUser';

import s from './avatar.module.css';

type AvatarType = {
  width?: string;
  mode?: 'profile' | 'header';
};

export const Avatar: React.FC<AvatarType> = ({ mode, width }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isAvaBroken, setIsAvaBroken] = useState<boolean>(false);
  const errorHandler: () => void = () => {
    setIsAvaBroken(true);
    dispatch(setAppError({ error: 'image error' }));
  };

  return (
    <div className={s.block}>
      <img
        onError={errorHandler}
        src={isAvaBroken ? avatar : user.avatar}
        style={{ width }}
        alt="ava"
      />
      {mode === 'profile' && (
        <div className={s.circle}>
          <InputTypeFile />
        </div>
      )}
    </div>
  );
};
