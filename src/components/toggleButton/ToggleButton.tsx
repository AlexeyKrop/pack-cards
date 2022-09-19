import React, { MouseEvent } from 'react';

import { Radio } from 'antd';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { setMyCardsPack } from '../../store/reducers/packsParamsReducer';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';

export const ToggleButton: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userID = user._id;

  const onClickHandle: (e: MouseEvent<HTMLElement>) => void = e => {
    const btnId = e.currentTarget.id;

    if (btnId === 'myPack') {
      dispatch(setMyCardsPack({ id: userID }));
    }
    if (btnId === 'allPack') {
      dispatch(setMyCardsPack({ id: '' }));
    }
  };

  return (
    <Radio.Group defaultValue="all" buttonStyle="solid" size="large">
      <Radio.Button
        id="myPack"
        onClick={onClickHandle}
        value="my"
        style={{ margin: '0 40px 0 0' }}
      >
        My
      </Radio.Button>
      <Radio.Button id="allPack" value="all" onClick={onClickHandle}>
        All
      </Radio.Button>
    </Radio.Group>
  );
};
