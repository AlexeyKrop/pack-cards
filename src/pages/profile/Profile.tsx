import React from 'react';

import { ArrowLeftOutlined, LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink, Navigate } from 'react-router-dom';

import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { logoutTC } from '../../store/reducers/authReducer';
import { updateUserProfileTC } from '../../store/reducers/profileReducer';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import { selectUser } from '../../store/selectors/selectUser';

import { Avatar } from './avatar/Avatar';
import s from './profile.module.css';

const Profile: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const updateUserNameValue: (name: string, avatar?: string) => void = name => {
    dispatch(updateUserProfileTC(name));
  };
  const handleLogout: () => void = () => {
    dispatch(logoutTC());
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <NavLink className={s.link} to={PATH.PACKS}>
        {' '}
        <ArrowLeftOutlined />
        <span className={s.navigateText}>Back to Packs List</span>
      </NavLink>
      <div className={s.wrapperCard}>
        <div className={s.content}>
          <h2 className={s.title}>Personal Information</h2>
          <Avatar mode="profile" width="96px" />
          <EditableSpan callBack={updateUserNameValue} title={user.name} />
          <p>{user.email}</p>
          <Button type="default" icon={<LoginOutlined />} onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
