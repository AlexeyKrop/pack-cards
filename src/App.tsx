import React from 'react';

import './App.css';
import { HashRouter } from 'react-router-dom';

import Header from './components/header/Header';
import { Pages } from './routing/Pages';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Pages />
    </HashRouter>
  );
};

export default App;
