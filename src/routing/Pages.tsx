import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { CheckEmail } from '../pages/auth/checkEmail/CheckEmail';
import { ForgotPassword } from '../pages/auth/forgotPassword/ForgotPassword';
import { Login } from '../pages/auth/login/Login';
import { SignUp } from '../pages/auth/signUp/SignUp';
import Profile from '../pages/profile/Profile';

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  CHECK_EMAIL: '/check-email',
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
  { path: PATH.RESET_PASSWORD, element: <ForgotPassword /> },
  { path: PATH.CHECK_EMAIL, element: <CheckEmail /> },
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
