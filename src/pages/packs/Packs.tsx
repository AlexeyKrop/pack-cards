import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { setCardsPackTC } from '../../store/reducers/packsReducer';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import {
  selectCurrentPageCount,
  selectPageSizeCount,
} from '../../store/selectors/selectParamsPacks';

import { PacksTable } from './packsTable/PacksTable';

export const Packs: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const page = useAppSelector(selectCurrentPageCount);
  const pageSizeCount = useAppSelector(selectPageSizeCount);

  useEffect(() => {
    dispatch(setCardsPackTC());
  }, [dispatch, page, pageSizeCount]);
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return <PacksTable />;
};
