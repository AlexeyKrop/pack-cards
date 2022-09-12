import React, { useEffect } from 'react';

import './App.css';
import { HashRouter } from 'react-router-dom';

import Header from './components/header/Header';
import { useAppDispatch } from './hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector/useAppSelector';
import { Pages } from './routing/Pages';
import { appInitializedTC } from './store/reducers/appReducer';

const App: React.FC = () => {
  const initialized = useAppSelector(state => state.app.initialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appInitializedTC());
  }, [dispatch, initialized]);

  return (
    <HashRouter>
      <Header />
      <Pages />
    </HashRouter>
  );
};

export default App;
