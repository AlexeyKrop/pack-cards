import React, { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { FilterBlock } from '../../components/filterBlock/FilterBlock';
import { AddPackModal } from '../../components/modals/packModal/AddPackModal';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { setCardsPackTC } from '../../store/reducers/packsReducer';
import { selectLoggedIn } from '../../store/selectors/selectAuth/selectLoggedIn';
import {
  selectCurrentPageCount,
  selectPageSizeCount,
  selectSetFilterForMaxCountCards,
  selectSetFilterForMinCountCards,
  selectSetFilterForPackName,
  selectSortPacksCards,
} from '../../store/selectors/selectPacks/selectParamsPacks';
import { selectUserID } from '../../store/selectors/selectProfile/selectUserID';

import s from './packs.module.css';
import { PacksTable } from './packsTable/PacksTable';

export const Packs: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const page = useAppSelector(selectCurrentPageCount);
  const pageSizeCount = useAppSelector(selectPageSizeCount);
  const packName = useAppSelector(selectSetFilterForPackName);
  const userID = useAppSelector(selectUserID);
  const min = useAppSelector(selectSetFilterForMinCountCards);
  const max = useAppSelector(selectSetFilterForMaxCountCards);
  const sortPacks = useAppSelector(selectSortPacksCards);

  useEffect(() => {
    dispatch(setCardsPackTC());
  }, [dispatch, page, pageSizeCount, packName, userID, min, max, sortPacks]);
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h2 className={s.title}>Packs list</h2>
        <AddPackModal />
      </div>
      <FilterBlock />
      <PacksTable />
    </div>
  );
};
