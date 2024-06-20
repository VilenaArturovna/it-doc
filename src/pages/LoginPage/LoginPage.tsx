import { TelegramButton } from './TelegramButton';
import styled from 'styled-components';
import { useLoginActions } from '../../hooks/use-login-actions';
import { useGetMe } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../shared/route-paths';
import { useEffect } from 'react';
import { notificationHelper } from '../../shared/helpers';
import { notification } from 'antd';

export const LoginPage = () => {
  const { user } = useGetMe();
  const navigate = useNavigate();
  if (user) navigate(RoutePaths.orders);
  const { onSubmit, error } = useLoginActions();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    error && notificationHelper({ api, error });
  }, [api, error]);
  return (
    <Root>
      {contextHolder}
      <TelegramButton onSubmit={onSubmit} />
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
`;
