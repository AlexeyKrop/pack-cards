import React from 'react';

import { Navigate } from 'react-router-dom';

import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';

import { Avatar } from './avatar/Avatar';

const Profile: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const changeUserNameValue: (name: string, avatar?: string) => void = (name, avatar) => {
    console.log(name, avatar);
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div>
      <h2>Personal Information</h2>
      <Avatar mode="profile" width="96px" />
      <EditableSpan callBack={changeUserNameValue} title="props.user.name" />
    </div>
  );
};

export default Profile;
