import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { Avatar } from '../../pages/profile/avatar/Avatar';
import { selectLoggedIn } from '../../store/selectors/selectAuth/selectLoggedIn';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';

import s from './header.module.css';

const Header: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const user = useAppSelector(selectUser);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.incubator}>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          {isLoggedIn && <Avatar mode="header" name={user.name} width="36px" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
