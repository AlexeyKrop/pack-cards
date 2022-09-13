import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { PATH } from '../../../routing/Pages';

import s from './forgotPassword.module.css';

type IFormInput = {
  email: string;
};
const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

export const ForgotPassword: React.FC = () => {
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
          <h2 className={s.title}>Forgot your password?</h2>
          <div className={s.input}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input status={errors.email && 'error'} placeholder="email" {...field} />
              )}
            />
            <p className={s.error}>{errors.email?.message}</p>
          </div>
          <p className={s.helperText}>
            Enter your email address and we will send you further instructions{' '}
          </p>
          <input className={s.inputBtn} type="submit" value="Send Instructions" />
          <p className={s.text}>Did you remember your password?</p>
          <NavLink to={PATH.LOGIN} className={s.link}>
            Try logging in
          </NavLink>
        </form>
      </div>
    </div>
  );
};
