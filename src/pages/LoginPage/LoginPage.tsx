import { TelegramButton } from './TelegramButton';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

export const LoginPage = () => {
  const onSubmit = (user: any) => {
    return <Redirect to="/" />;
  };
  return (
    <Root>
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
