import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Login } from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import { SignUp } from '../pages/signUp/SignUp';

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password/:token',
  PACKS: '/packs',
  CARDS: '/cards',
  LEARN: '/learn/:packId/:packName',
};

const ROUTES = [
  { path: PATH.PROFILE, element: <Profile /> },
  { path: '/', element: <Profile /> },
  { path: PATH.LOGIN, element: <Login /> },
  { path: PATH.SIGNUP, element: <SignUp /> },
];

export const Pages: React.FC = () => {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
