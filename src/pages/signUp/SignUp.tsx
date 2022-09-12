import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'antd';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

type IFormInput = {
  email: string;
  password: string;
};
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => <Input placeholder="email" {...field} />}
      />
      <p>{errors.email?.message}</p>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Input.Password placeholder="input password" {...field} />}
      />
      <p>{errors.password?.message}</p>
      <input type="submit" />
    </form>
  );
};
