import React from 'react';
import styled from 'styled-components';

export const Nav = () => {
    return (
        <Root>
            <Container>
                <Menu>
                    <MenuItem href="">Главная</MenuItem>
                    <MenuItem href="">Наши предложения</MenuItem>
                    <MenuItem href="">Акции</MenuItem>
                    <MenuItem href="">Партнерам</MenuItem>
                    <MenuItem href="">О нас</MenuItem>
                </Menu>
                <Buttons>
                    <SignInButton>
                        <MenuItem role={'button'} href="" >Войти</MenuItem>
                    </SignInButton>
                    <OrderButton>
                        <MenuItem role={'button'} href="">Проверить <br/>статус заказа</MenuItem>
                    </OrderButton>
                </Buttons>
            </Container>
        </Root>
    )
}

const Root = styled.nav`
    height: 70px;
    background-color: ${({ theme: { colors } }) => colors.textSecondColor};
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
  ${({ theme: { container } }) => container}
`;
const Menu = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
`
const MenuItem = styled.a`
    color: ${({ theme: { colors } }) => colors.textColor};
    text-decoration: none;
    font-weight: 600;
    font-size: 1.25em;
`
const Buttons = styled.div`
    height: 100%;
    display: flex;
`
const Button = styled.div`
    height: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    align-items: center;
`
const SignInButton = styled(Button)`
    background-color: ${({ theme: { colors } }) => colors.btnSecondColor};
`
const OrderButton = styled(Button)`
    background-color: ${({ theme: { colors } }) => colors.btnColor};
    text-align: center;
`
