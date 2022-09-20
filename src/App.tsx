import React, { useEffect } from 'react';

import './App.css';
import { HashRouter } from 'react-router-dom';

import { CustomSpin } from './components/customSpin/CustomSpin';
import Header from './components/header/Header';
import { SnackBar } from './components/snackBar/SnackBar';
import { useAppDispatch } from './hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector/useAppSelector';
import { Pages } from './routing/Pages';
import { appInitializedTC } from './store/reducers/appReducer';
import { selectAppInitialized } from './store/selectors/selectApp/selectAppInitialized';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAppInitialized);

  useEffect(() => {
    dispatch(appInitializedTC());
  }, [dispatch]);
  if (!initialized) {
    return <CustomSpin />;
  }

  return (
    <>
      <SnackBar />
      <HashRouter>
        <Header />
        <div className="container">
          <div className="main">
            <Pages />
          </div>
        </div>
      </HashRouter>
    </>
  );
};

export default App;
