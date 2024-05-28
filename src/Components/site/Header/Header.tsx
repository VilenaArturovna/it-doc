import React from 'react';
import logo from '../../../Assets/Images/horizontal_on_transparent_2000x899px_by_logaster.png';
import logoRicoh from '../../../Assets/Images/Ricoh_partner.png';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Root>
      <Container>
        <Logo src={logo} alt="" />
        <Logo src={logoRicoh} alt="" />
        <Ref href="#contacts">Контакты</Ref>
        <Contacts>
          <TelephoneNumber href={'tel:+7381237-85-03'}>+7 (3812) 37-85-03</TelephoneNumber>
        </Contacts>
        <Contacts>
          Пн-Пт
          <br />
          8:00-18:00
        </Contacts>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.textColor};
  z-index: 20;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  justify-content: space-between;
`;
const Logo = styled.img`
  height: 60px;
`;
const Ref = styled.a`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.textSecondColor};
  font-weight: 500;
`;
const Contacts = styled.span`
  text-align: center;
  font-weight: bold;
`;
const TelephoneNumber = styled.a`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.textThirdColor};
  font-weight: bold;
`;
