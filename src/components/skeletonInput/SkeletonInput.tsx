import React from 'react';

import { Skeleton } from 'antd';

type SkeletonInputType = {
  size?: 'large' | 'small' | 'default' | undefined;
  active?: boolean;
  width?: number | string;
};
const SkeletonInput: React.FC<SkeletonInputType> = ({ size, active, width }) => {
  return <Skeleton.Input style={{ width }} active={active} size={size} />;
};

export default SkeletonInput;
