import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { selectUser } from '../../store/selectors/selectProfile/selectUser';
import { DeletePackModal } from '../modals/packModal/DeletePackModal';
import { EditPackModal } from '../modals/packModal/EditPackModal';

import s from './actions.module.css';

type ActionsType = {
  user_id: string;
  id: string;
};
export const Actions: React.FC<ActionsType> = ({ user_id, id }) => {
  const user = useAppSelector(selectUser);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const userID = user._id;
  const openEditPackModal: () => void = () => {
    setOpenEditModal(true);
  };
  const openDeletePackModal: () => void = () => {
    setOpenDeleteModal(true);
  };

  return (
    <div className={s.wrapper}>
      <EditPackModal
        id={id}
        title="Edit Pack"
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
      <DeletePackModal
        id={id}
        title="Delete Pack"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
      <Button type="text" icon={<ReadOutlined className={s.icon} />} size="middle" />
      {userID === user_id && (
        <>
          <Button
            onClick={openEditPackModal}
            type="text"
            icon={<EditOutlined className={s.icon} />}
            size="middle"
          />
          <Button
            onClick={openDeletePackModal}
            type="text"
            icon={<DeleteOutlined className={s.icon} />}
            size="middle"
          />
        </>
      )}
    </div>
  );
};
