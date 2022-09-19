import React, { useEffect } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Navigate, NavLink } from 'react-router-dom';

import { InputDebounce } from '../../components/inputDebounce/InputDebounce';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { setCardsCardTC } from '../../store/reducers/cardsReducer';
import { selectCardsStatus } from '../../store/selectors/selectCards/selectCardsStatus';
import { selectCardsPack_id } from '../../store/selectors/selectCards/selectParamsCards';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import { restoreState } from '../../utils/localStorage';

import s from './cards.module.css';
import { CardsTable } from './cardsTable/CardsTable';

export const Cards: React.FC = () => {
  const page = useAppSelector(state => state.cardsParams.page);
  const cardsPack_id = useAppSelector(selectCardsPack_id);
  const status = useAppSelector(selectCardsStatus);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const getCardIdFromLocalStorage: () => string = () => {
    return restoreState<string>('cardsId', '');
  };

  useEffect(() => {
    const cardsPackID = getCardIdFromLocalStorage();

    dispatch(setCardsCardTC(cardsPackID));
  }, [dispatch, page, cardsPack_id]);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <NavLink className={s.link} to={PATH.PACKS}>
        <ArrowLeftOutlined style={{ marginRight: 8 }} />
        <span>Back to Packs List</span>
      </NavLink>
      <div className={s.top}>
        <h2 className={s.title}>Friend’s Packs</h2>
        <Button type="primary">Learn to pack</Button>
      </div>
      <div className={s.filterBlock}>
        <div className={s.inputDebounceWrapper}>
          <h3>Search</h3>
          <InputDebounce
            disabled={status === 'loading'}
            placeholder="Provide your text"
          />
        </div>
      </div>
      <CardsTable />
    </div>
  );
};
