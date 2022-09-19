import React, { useEffect, useState } from 'react';

import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Navigate } from 'react-router-dom';

import { DoubleRangeSlider } from '../../components/doubleRangeSlider/DoubleRangeSlider';
import { InputDebounce } from '../../components/inputDebounce/InputDebounce';
import { SkeletonButton } from '../../components/skeletonButton/SkeletonButton';
import { ToggleButton } from '../../components/toggleButton/ToggleButton';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { setResetFilter } from '../../store/reducers/packsParamsReducer';
import { setCardsPackTC } from '../../store/reducers/packsReducer';
import { selectLoggedIn } from '../../store/selectors/selectAuth/selectLoggedIn';
import { selectPacksStatus } from '../../store/selectors/selectPacks/selectPacksStatus';
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
  const status = useAppSelector(selectPacksStatus);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const page = useAppSelector(selectCurrentPageCount);
  const pageSizeCount = useAppSelector(selectPageSizeCount);
  const packName = useAppSelector(selectSetFilterForPackName);
  const userID = useAppSelector(selectUserID);
  const min = useAppSelector(selectSetFilterForMinCountCards);
  const max = useAppSelector(selectSetFilterForMaxCountCards);
  const sortPacks = useAppSelector(selectSortPacksCards);
  const [myAllSortBtnValue, setMyAllSortBtnValue] = useState<string>('All');
  const [searchPackNameInputValue, setSearchPackNameInputValue] = useState<string>('');

  useEffect(() => {
    dispatch(setCardsPackTC());
  }, [dispatch, page, pageSizeCount, packName, userID, min, max, sortPacks]);
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }
  const onClickResetFilter: () => void = () => {
    dispatch(setResetFilter());
    setMyAllSortBtnValue('All');
    setSearchPackNameInputValue('');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.top}>
        <h2 className={s.title}>Packs list</h2>
        <Button type="primary">Add new pack</Button>
      </div>
      <div className={s.filterBlock}>
        <div className={s.inputDebounceWrapper}>
          <h3>Search</h3>
          <InputDebounce
            disabled={status === 'loading'}
            inputValue={searchPackNameInputValue}
            changeInputValue={setSearchPackNameInputValue}
            placeholder="Provide your text"
          />
        </div>
        <div className={s.toggleButtonWrapper}>
          <h3>Show packs cards</h3>
          <ToggleButton
            disabled={status === 'loading'}
            btnValue={myAllSortBtnValue}
            toggleCallback={setMyAllSortBtnValue}
          />
        </div>
        <div className={s.doubleRangeSliderWrapper}>
          <h3>Number of cards</h3>
          <DoubleRangeSlider disabled={status === 'loading'} className={s.slider} />
        </div>
        {status === 'loading' ? (
          <SkeletonButton size="large" />
        ) : (
          <Button
            type="primary"
            icon={<FilterOutlined />}
            size="middle"
            onClick={onClickResetFilter}
          >
            Reset filter
          </Button>
        )}
      </div>
      <PacksTable />
    </div>
  );
};
