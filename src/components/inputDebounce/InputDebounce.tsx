import React, { ChangeEvent, useEffect, useState } from 'react';

import { Input } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { searchPackNameAC } from '../../store/reducers/packsParamsReducer';

export const InputDebounce: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(inputValue);

  useEffect(() => {
    dispatch(searchPackNameAC({ packName: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);
  const onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    const { value } = e.currentTarget;

    setInputValue(value);
  };

  return (
    <Input
      placeholder="input name pack"
      size="large"
      value={inputValue}
      onChange={onChangeInputValue}
    />
  );
};
