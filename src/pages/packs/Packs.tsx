import React, { useEffect } from 'react';

import { Button } from 'antd';
import { Navigate } from 'react-router-dom';

import { DoubleRangeSlider } from '../../components/doubleRangeSlider/DoubleRangeSlider';
import { InputDebounce } from '../../components/inputDebounce/InputDebounce';
import { ToggleButton } from '../../components/toggleButton/ToggleButton';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { setCardsPackTC } from '../../store/reducers/packsReducer';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import {
  selectCurrentPageCount,
  selectPageSizeCount,
  selectSetFilterForPackName,
} from '../../store/selectors/selectParamsPacks';
import { selectUserID } from '../../store/selectors/selectUserID';

import s from './packs.module.css';
import { PacksTable } from './packsTable/PacksTable';

export const Packs: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const page = useAppSelector(selectCurrentPageCount);
  const pageSizeCount = useAppSelector(selectPageSizeCount);
  const packName = useAppSelector(selectSetFilterForPackName);
  const userID = useAppSelector(selectUserID);

  useEffect(() => {
    dispatch(setCardsPackTC());
  }, [dispatch, page, pageSizeCount, packName, userID]);
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h2 className={s.title}>Packs list</h2>
        <Button type="primary">Add new pack</Button>
      </div>
      <div className={s.filterBlock}>
        <InputDebounce />
        <ToggleButton />
        <DoubleRangeSlider />
      </div>
      <PacksTable />;
    </div>
  );
};
