import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { loginTC } from '../../store/reducers/authReducer';
import { selectLoggedIn } from '../../store/selectors/selectLoggedIn';
import s from '../signUp/signUp.module.css';

type IFormInput = {
  email: string;
  password: string;
  checkbox: boolean;
};
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const Login: React.FC = () => {
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(loginTC(data));
  };

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign in</h2>
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
          <div className={s.checkbox}>
            <input type="checkbox" {...register('checkbox')} />
            <span>Remember me</span>
          </div>
          <input className={s.inputBtn} type="submit" value="Sign In" />
          <p className={s.text}>You don&apos;t have an account?</p>
          <div className={s.link}>Sing Up</div>
        </form>
      </div>
    </div>
  );
};
