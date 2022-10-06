import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';
import s from '../actions/actions.module.css';
import { EditCardModal } from '../modals/cardModal/EditCardModal';

type ActionsType = {
  user_id: string;
  id: string;
};
export const ActionsCards: React.FC<ActionsType> = ({ user_id, id }) => {
  const user = useAppSelector(selectUser);
  const userID = user._id;
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  // const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const openEditCardModal: () => void = () => {
    setOpenEditModal(true);
  };
  const openDeleteCardModal: () => void = () => {};

  return (
    <div>
      <EditCardModal
        id={id}
        title="Edit Pack"
        open={openEditModal}
        setOpen={setOpenEditModal}
      />{' '}
      {userID === user_id && (
        <>
          <Button
            onClick={openEditCardModal}
            type="text"
            icon={<EditOutlined className={s.icon} />}
            size="middle"
          />
          <Button
            onClick={openDeleteCardModal}
            type="text"
            icon={<DeleteOutlined className={s.icon} />}
            size="middle"
          />
        </>
      )}
    </div>
  );
};
