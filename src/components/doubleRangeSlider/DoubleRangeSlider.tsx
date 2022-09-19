import React, { useEffect, useState } from 'react';

import { InputNumber, Slider } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import {
  setFilterForMaxCountCards,
  setFilterForMinCountCards,
} from '../../store/reducers/packsParamsReducer';
import {
  selectSetFilterForMaxCountCards,
  selectSetFilterForMinCountCards,
} from '../../store/selectors/selectPacks/selectParamsPacks';

import s from './doubleRanheSlider.module.css';

const MIN_DEFAULT_RANGE_VALUE = 0;
const MAX_DEFAULT_RANGE_VALUE = 100;

type DoubleRangeSliderType = {
  className: string;
};
export const DoubleRangeSlider: React.FC<DoubleRangeSliderType> = ({ className }) => {
  const min = useAppSelector(selectSetFilterForMinCountCards);
  const max = useAppSelector(selectSetFilterForMaxCountCards);
  const dispatch = useAppDispatch();
  const [sliderValue, setSliderValue] = useState<[number, number]>([min, max]);

  useEffect(() => {
    setSliderValue([min, max]);
  }, [min, max]);
  const onChangeSliderTrack: (value: [number, number]) => void = value => {
    setSliderValue(value);
  };
  const onAfterChange: (value: [number, number]) => void = value => {
    dispatch(setFilterForMinCountCards({ min: value[0] }));
    dispatch(setFilterForMaxCountCards({ max: value[1] }));
  };
  const onChangeMinValue: (value: number) => void = value => {
    setSliderValue([value, sliderValue[1]]);
  };
  const onChangeMaxValue: (value: number) => void = value => {
    setSliderValue([sliderValue[1], value]);
  };

  return (
    <div className={s.wrapper}>
      <InputNumber
        min={1}
        max={100}
        style={{ margin: '0 16px 0 0' }}
        value={typeof sliderValue[0] === 'number' ? sliderValue[0] : 0}
        onChange={onChangeMinValue}
      />
      <Slider
        className={className}
        value={sliderValue}
        onAfterChange={onAfterChange}
        onChange={onChangeSliderTrack}
        range
        defaultValue={[MIN_DEFAULT_RANGE_VALUE, MAX_DEFAULT_RANGE_VALUE]}
      />
      <InputNumber
        min={1}
        max={100}
        style={{ margin: '0 0 0 16px' }}
        value={typeof sliderValue[1] === 'number' ? sliderValue[1] : 0}
        onChange={onChangeMaxValue}
      />
    </div>
  );
};
