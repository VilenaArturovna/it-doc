import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (<Root>
      <Container>
        <Menu>
          <MenuItem to={'/'}>Главная</MenuItem>
          <MenuItem to={'/plug'}>Наши предложения</MenuItem>
          <MenuItem to={'/plug'}>Акции</MenuItem>
          <MenuItem to={'/plug'}>Партнерам</MenuItem>
          <MenuItem to={'/plug'}>О нас</MenuItem>
        </Menu>
        <Buttons>
          <SignInButton>
            <MenuItem role={'button'} to={'/plug'}>Войти</MenuItem>
          </SignInButton>
          <OrderButton>
            <MenuItem role={'button'} to={'/plug'}>Проверить <br/>статус заказа</MenuItem>
          </OrderButton>
        </Buttons>
      </Container>
    </Root>);
};

const Root = styled.nav`
  height: 70px;
  background-color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  display: flex;
  justify-content: space-between;
`;
const Menu = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;
const MenuItem = styled(Link)`
  color: ${({ theme: { colors } }) => colors.textColor};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25em;
`;
const Buttons = styled.div`
  height: 100%;
  display: flex;
`;
const Button = styled.div`
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
`;
const SignInButton = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.btnSecondColor};
`;
const OrderButton = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.btnColor};
  text-align: center;
`;
