import React, { ChangeEvent, useEffect, useState } from 'react';

import { Input } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { searchPackName } from '../../store/reducers/packsParamsReducer';
import { selectSetFilterForPackName } from '../../store/selectors/selectParamsPacks';

export const InputDebounce: React.FC = () => {
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

  return (
    <Input
      allowClear
      defaultValue={packName}
      placeholder="input name pack"
      size="large"
      value={inputValue}
      onChange={onChangeInputValue}
    />
  );
};
