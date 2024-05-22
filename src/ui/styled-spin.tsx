import styled from 'styled-components';
import { Spin } from 'antd';
import React from 'react';

export const StyledSpin = () => {
  return <Root size={'large'} />;
};

const Root = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;
