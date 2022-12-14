import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { CustomSpin } from '../components/customSpin/CustomSpin';
import { useAppSelector } from '../hooks/useAppSelector/useAppSelector';
import { CheckEmail } from '../pages/auth/checkEmail/CheckEmail';
import { CreatePassword } from '../pages/auth/createPassword/CreatePassword';
import { ForgotPassword } from '../pages/auth/forgotPassword/ForgotPassword';
import { Login } from '../pages/auth/login/Login';
import { SignUp } from '../pages/auth/signUp/SignUp';
import { Cards } from '../pages/cards/Cards';
import { Learn } from '../pages/learn/Learn';
import { Packs } from '../pages/packs/Packs';
import Profile from '../pages/profile/Profile';
import { selectAppStatus } from '../store/selectors/selectApp/selectAppStatus';

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  CREATE_PASSWORD: '/create-password/:token',
  CHECK_EMAIL: '/check-email',
  PACKS: '/packs',
  CARDS: '/cards',
  LEARN: '/learn/',
};

const ROUTES = [
  { path: PATH.PROFILE, element: <Profile /> },
  { path: '/', element: <Profile /> },
  { path: PATH.LOGIN, element: <Login /> },
  { path: PATH.SIGNUP, element: <SignUp /> },
  { path: PATH.RESET_PASSWORD, element: <ForgotPassword /> },
  { path: PATH.CHECK_EMAIL, element: <CheckEmail /> },
  { path: PATH.CREATE_PASSWORD, element: <CreatePassword /> },
  { path: PATH.PACKS, element: <Packs /> },
  { path: PATH.CARDS, element: <Cards /> },
  { path: `${PATH.LEARN}:id`, element: <Learn /> },
];

export const Pages: React.FC = () => {
  const status = useAppSelector(selectAppStatus);

  return (
    <>
      {status === 'loading' && <CustomSpin />}
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};
