import React from 'react';

import { Radio } from 'antd';

export const ToggleButton: React.FC = () => {
  const onClickHandle: () => void = () => {
    console.log('hello');
  };

  return (
    <Radio.Group defaultValue="a" buttonStyle="solid" style={{ marginTop: 16 }}>
      <Radio.Button onClick={onClickHandle} value="b">
        My
      </Radio.Button>
      <Radio.Button value="a" onClick={onClickHandle}>
        All
      </Radio.Button>
    </Radio.Group>
  );
};
