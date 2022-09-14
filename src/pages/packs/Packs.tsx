import React, { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setCardsPackTC } from '../../store/reducers/packsReducer';

import { PacksTable } from './packsTable/PacksTable';

export const Packs: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCardsPackTC());
  }, [dispatch]);

  return <PacksTable />;
};
