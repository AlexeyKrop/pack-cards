import React from 'react';

import './App.css';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signUp/SignUp';

const App: React.FC = () => {
  return (
    <>
      {' '}
      <SignUp />
      <Login />
    </>
  );
};

export default App;
