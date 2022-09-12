import React from 'react';

import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Navigate } from 'react-router-dom';

import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { updateUserProfileTC } from '../../store/reducers/profileReducer';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import { selectUser } from '../../store/selectors/selectUser';

import { Avatar } from './avatar/Avatar';
import s from './profile.module.css';

const Profile: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const user = useAppSelector(selectUser);

  console.log(user);
  const dispatch = useAppDispatch();
  const changeUserNameValue: (name: string, avatar?: string) => void = name => {
    dispatch(updateUserProfileTC(name));
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2 className={s.title}>Personal Information</h2>
        <Avatar mode="profile" width="96px" />
        <EditableSpan callBack={changeUserNameValue} title={user.name} />
        <p>{user.email}</p>
        <Button type="default" icon={<LoginOutlined />} onClick={() => console.log()}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
