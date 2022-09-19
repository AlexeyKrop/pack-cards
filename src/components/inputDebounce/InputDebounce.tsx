import React, { ChangeEvent, useEffect, useState } from 'react';

import { Input } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { searchPackName } from '../../store/reducers/packsParamsReducer';
import { selectSetFilterForPackName } from '../../store/selectors/selectPacks/selectParamsPacks';
import SkeletonInput from '../skeletonInput/SkeletonInput';

export type InputDebounceType = {
  placeholder: string;
  disabled: boolean;
};
export const InputDebounce: React.FC<InputDebounceType> = ({ placeholder, disabled }) => {
  const packName = useAppSelector(selectSetFilterForPackName);
  const [inputValue, setInputValue] = useState<string>(packName);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(inputValue);

  useEffect(() => {
    dispatch(searchPackName({ packName: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);
  const onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const { value } = e.currentTarget;

    setInputValue(value);
  };

  if (disabled) {
    return <SkeletonInput width={400} active size="large" />;
  }

  return (
    <Input
      allowClear
      defaultValue={packName}
      placeholder={placeholder}
      size="large"
      value={inputValue}
      onChange={onChangeInputValue}
    />
  );
};
