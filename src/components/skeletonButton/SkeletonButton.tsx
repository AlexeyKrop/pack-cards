import React from 'react';

import { Skeleton } from 'antd';

export type SkeletonButtonType = {
  size?: 'large' | 'small' | 'default' | undefined;
  active?: boolean;
  buttonShape?: 'circle' | 'round' | 'square' | 'default';
  width?: number | string;
};
export const SkeletonButton: React.FC<SkeletonButtonType> = ({
  active,
  size,
  buttonShape,
  width,
}) => {
  return (
    <div>
      <Skeleton.Button
        style={{ width }}
        active={active}
        size={size}
        shape={buttonShape}
        block={false}
      />
    </div>
  );
};
