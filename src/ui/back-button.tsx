import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => navigate(-1);
  return (
    <Button onClick={onClick} type="primary">
      Назад
    </Button>
  );
};
