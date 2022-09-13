import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CustomAuthButton } from '../customAuthButton/CustomAuthButton';

import s from './createNewPassword.module.css';

type IFormInput = {
  password: string;
};
const schema = yup
  .object({
    password: yup.string().required(),
  })
  .required();

export const CreatePassword: React.FC = () => {
  // const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={s.title}>Create new password</h2>
          <div className={s.input}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password
                  status={errors.password && 'error'}
                  placeholder="password"
                  {...field}
                />
              )}
            />
            <p className={s.error}>{errors.password?.message}</p>
          </div>
          <p className={s.text}>
            Create new password and we will send you further instructions to email
          </p>
          <CustomAuthButton name="Create new password" />
        </form>
      </div>
    </div>
  );
};
