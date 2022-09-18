import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Navigate, NavLink } from 'react-router-dom';

import { InputDebounce } from '../../components/inputDebounce/InputDebounce';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';

import s from './cards.module.css';
import { CardsTable } from './cardsTable/CardsTable';

export const Cards: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);

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
          <InputDebounce placeholder="Provide your text" />
        </div>
      </div>
      <CardsTable />
    </div>
  );
};
