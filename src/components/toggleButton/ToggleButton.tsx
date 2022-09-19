import React, { useState } from 'react';

import { Radio, RadioChangeEvent } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { setMyCardsPack } from '../../store/reducers/packsParamsReducer';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';
import { SkeletonButton } from '../skeletonButton/SkeletonButton';

type ToggleButtonType = {
  disabled: boolean;
};
const options = [
  {
    label: 'My',
    value: 'My',
  },
  {
    label: 'All',
    value: 'All',
  },
];

export const ToggleButton: React.FC<ToggleButtonType> = ({ disabled }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userID = user._id;
  const [btnValue, setBtnValue] = useState<string>('All');

  const onChange: (e: RadioChangeEvent) => void = ({ target: { value } }) => {
    if (value === 'My') {
      dispatch(setMyCardsPack({ id: userID }));
    }
    if (value === 'All') {
      dispatch(setMyCardsPack({ id: '' }));
    }
    setBtnValue(value);
  };

  if (disabled) {
    return <SkeletonButton width={200} active size="large" />;
  }

  return (
    <Radio.Group
      size="large"
      defaultValue="All"
      options={options}
      onChange={onChange}
      value={btnValue}
      optionType="button"
      buttonStyle="solid"
    />
  );
};
