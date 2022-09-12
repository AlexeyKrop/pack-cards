import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import s from './signUp.module.css';

type IFormInput = {
  email: string;
  password: string;
  confirm_password: string;
};
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .label('confirm password')
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export const SignUp: React.FC = () => {
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
          <h2>Sing Up</h2>
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
          <div className={s.input}>
            <Controller
              name="confirm_password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password
                  status={errors.confirm_password && 'error'}
                  placeholder="confirm password"
                  {...field}
                />
              )}
            />
            <p className={s.error}>{errors.confirm_password?.message}</p>
          </div>
          <input className={s.inputBtn} type="submit" value="Sign Up" />
          <p className={s.text}> Already have an account?</p>
          <div className={s.link}>Sing In</div>
        </form>
      </div>
    </div>
  );
};
