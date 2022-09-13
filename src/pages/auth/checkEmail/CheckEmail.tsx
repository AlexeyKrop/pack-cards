import React from 'react';

import { NavLink } from 'react-router-dom';

import emailLogo from '../../../assets/emailIcon.png';
import { PATH } from '../../../routing/Pages';

import s from './checkEmail.module.css';

export const CheckEmail: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2 className={s.title}>Check Email</h2>
        <div className={s.icon}>
          <img src={emailLogo} alt="logo" />
        </div>

        <p className={s.helperText}>
          We’ve sent an Email with instructions to example@mail.com
        </p>
        <NavLink to={PATH.LOGIN} className={s.link}>
          Back To Login
        </NavLink>
      </div>
    </div>
  );
};
