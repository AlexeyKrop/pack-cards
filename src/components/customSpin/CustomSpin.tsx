import React from 'react';

import { Spin } from 'antd';

import s from './customSpin.module.css';

export const CustomSpin: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Spin size="large" />
    </div>
  );
};
