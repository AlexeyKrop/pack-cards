import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../../routing/Pages';
import { forgotPasswordTC } from '../../../store/reducers/forgotPasswordReducer';
import { selectIsSendEmail } from '../../../store/selectors/selectAuth/selectIsSendEmail';
import { CustomAuthButton } from '../customAuthButton/CustomAuthButton';

import s from './forgotPassword.module.css';

type IFormInput = {
  email: string;
};
const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();
const RESPONSE_MESSAGE_FOR_EMAIL = `<div>Перейдите по ссылке, чтобы восстановить пароль:<a href='http://localhost:3000/#/create-password/$token$'>link</a></div>`;

export const ForgotPassword: React.FC = () => {
  const isSendEmail = useAppSelector(selectIsSendEmail);
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(forgotPasswordTC(data.email, RESPONSE_MESSAGE_FOR_EMAIL));
  };

  if (isSendEmail) {
    return <Navigate to={PATH.CHECK_EMAIL} />;
  }

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
          <CustomAuthButton name="Send Instructions" />
          <p className={s.text}>Did you remember your password?</p>
          <NavLink to={PATH.LOGIN} className={s.link}>
            Try logging in
          </NavLink>
        </form>
      </div>
    </div>
  );
};
