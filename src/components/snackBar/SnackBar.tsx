import React from 'react';

import { Alert } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { setAppError } from '../../store/reducers/appReducer';
import { selectError } from '../../store/selectors/selectApp/selectError';

import s from './snackBar.module.css';

export const SnackBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleClose: () => void = () => {
    dispatch(setAppError({ error: null }));
  };

  return (
    <div>
      {error && (
        <Alert
          className={s.wrapper}
          message={error}
          type="error"
          closable
          banner
          afterClose={handleClose}
        />
      )}
    </div>
  );
};
