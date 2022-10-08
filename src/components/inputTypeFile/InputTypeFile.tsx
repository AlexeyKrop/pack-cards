import React, { ChangeEvent, useRef } from 'react';

import { FolderViewOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import s from '../../pages/profile/avatar/avatar.module.css';
import { setAppError } from '../../store/reducers/appReducer';
import { updateUserProfileTC } from '../../store/reducers/profileReducer';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';

export const InputTypeFile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectFileHandler: () => void = () => {
    inputRef.current?.click();
  };

  const uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      // eslint-disable-next-line no-magic-numbers
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateUserProfileTC(user.name, file64));
        });
      } else {
        dispatch(setAppError({ error: 'Big file' }));
      }
    }
  };

  const convertFileToBase64: (file: File, callBack: (value: string) => void) => void = (
    file,
    callBack,
  ) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const file64 = reader.result as string;

      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button type="button" className={s.btn} onClick={selectFileHandler}>
        <FolderViewOutlined />
      </button>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={uploadHandler}
      />
    </div>
  );
};
