import React, { useState } from 'react';

import { InputNumber, Slider } from 'antd';

import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import {
  selectSetFilterForMaxCountCards,
  selectSetFilterForMinCountCards,
} from '../../store/selectors/selectParamsPacks';

export const DoubleRangeSlider: React.FC = () => {
  const min = useAppSelector(selectSetFilterForMinCountCards);
  const max = useAppSelector(selectSetFilterForMaxCountCards);
  const [sliderValue, setSliderValue] = useState<[number, number]>([min, max]);

  const onChangeSliderTrack: (value: [number, number]) => void = value => {
    setSliderValue(value);
  };
  const onAfterChange: () => void = () => {
    // console.log(sliderValue);
  };
  const onChangeMinValue: (value: number) => void = value => {
    setSliderValue([value, sliderValue[1]]);
  };
  const onChangeMaxValue: (value: number) => void = value => {
    setSliderValue([sliderValue[1], value]);
  };

  return (
    <>
      <InputNumber
        min={0}
        max={sliderValue[1]}
        style={{ margin: '0 16px' }}
        value={typeof sliderValue[0] === 'number' ? sliderValue[0] : 0}
        onChange={onChangeMinValue}
      />
      <Slider
        value={sliderValue}
        onAfterChange={onAfterChange}
        onChange={onChangeSliderTrack}
        range={{
          draggableTrack: true,
        }}
        defaultValue={[min, max]}
      />
      <InputNumber
        min={sliderValue[0]}
        max={100}
        style={{ margin: '0 16px' }}
        value={typeof sliderValue[1] === 'number' ? sliderValue[1] : 0}
        onChange={onChangeMaxValue}
      />
    </>
  );
};
