import React, { useEffect } from 'react';

import './App.css';
import { HashRouter } from 'react-router-dom';

import Header from './components/header/Header';
import { SnackBar } from './components/snackBar/SnackBar';
import { useAppDispatch } from './hooks/useAppDispatch/useAppDispatch';
import { Pages } from './routing/Pages';
import { appInitializedTC } from './store/reducers/appReducer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appInitializedTC());
  }, [dispatch]);

  return (
    <>
      <SnackBar />
      <HashRouter>
        <Header />
        <div className="container">
          <Pages />
        </div>
      </HashRouter>
    </>
  );
};

export default App;
