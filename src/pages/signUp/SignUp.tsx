import React from 'react';

import { Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type IFormInput = {
  email: string;
  password: string;
  iceCreamType: { label: string; value: string };
};

export const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

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
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => <Input.Password {...field} placeholder="input password" />}
      />
      <input type="submit" />
    </form>
  );
};
