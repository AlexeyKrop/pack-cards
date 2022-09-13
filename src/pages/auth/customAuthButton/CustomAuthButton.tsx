import React from 'react';

import s from './customAutnButton.module.css';

type CustomAuthButtonType = {
  name: string;
};

export const CustomAuthButton: React.FC<CustomAuthButtonType> = ({ name }) => {
  return <input className={s.inputBtn} type="submit" value={name} />;
};
