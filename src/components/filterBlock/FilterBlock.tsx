import React, { useState } from 'react';

import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import s from '../../pages/packs/packs.module.css';
import { setResetFilter } from '../../store/reducers/packsParamsReducer';
import { selectPacksStatus } from '../../store/selectors/selectPacks/selectPacksStatus';
import { selectSetFilterForPackName } from '../../store/selectors/selectPacks/selectParamsPacks';
import { DoubleRangeSlider } from '../doubleRangeSlider/DoubleRangeSlider';
import { InputDebounce } from '../inputDebounce/InputDebounce';
import { SkeletonButton } from '../skeletonButton/SkeletonButton';
import { ToggleButton } from '../toggleButton/ToggleButton';

export const FilterBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPacksStatus);
  const searchPackName = useAppSelector(selectSetFilterForPackName);
  const [myAllSortBtnValue, setMyAllSortBtnValue] = useState<string>('All');
  const [searchPackNameInputValue, setSearchPackNameInputValue] = useState<
    string | undefined
  >(searchPackName);
  const onClickResetFilter: () => void = () => {
    dispatch(setResetFilter());
    setMyAllSortBtnValue('All');
    setSearchPackNameInputValue('');
  };

  return (
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
        <SkeletonButton size="large" margin="25px 0" />
      ) : (
        <Button
          style={{ margin: '25px 0' }}
          type="primary"
          icon={<FilterOutlined />}
          size="middle"
          onClick={onClickResetFilter}
        >
          Reset filter
        </Button>
      )}
    </div>
  );
};
