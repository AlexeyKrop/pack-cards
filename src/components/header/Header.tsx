import React from 'react';

import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import avatar from '../../assets/profile/avatar.png';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
// import { Avatar } from '../../pages/profile/avatar/Avatar';
import { PATH } from '../../routing/Pages';
import { logoutTC } from '../../store/reducers/authReducer';
import { selectLoggedIn } from '../../store/selectors/selectAuth/selectLoggedIn';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';

import s from './header.module.css';

const Header: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleLogout: () => void = () => {
    dispatch(logoutTC());
  };
  const menu = (
    <Menu
      items={[
        {
          icon: <UserOutlined />,
          label: <NavLink to={PATH.PROFILE}>Profile</NavLink>,
          key: '1',
        },
        {
          icon: <LoginOutlined />,
          label: (
            <NavLink to={PATH.LOGIN} onClick={handleLogout}>
              Log out
            </NavLink>
          ),
          key: '2',
        },
      ]}
    />
  );

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.incubator}>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          {isLoggedIn && (
            <Dropdown.Button
              className={s.btnBlock}
              placement="bottomLeft"
              type="text"
              size="large"
              icon={<Avatar size={42} src={avatar} />}
              overlay={menu}
            >
              {user.name}
            </Dropdown.Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
