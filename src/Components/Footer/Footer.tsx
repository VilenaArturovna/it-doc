import React from 'react';
import { YaMap } from './components/YaMap';
import styled from 'styled-components';

export function Footer() {
  return (<Root>
    <Container>
      <div>
        <YaMap/>
      </div>
      <Contacts id={'contacts'}>
        <ContactsText>г. Омск</ContactsText>
        <ContactsText>ул. Голика, 2</ContactsText>
        <ContactsText>Телефон: <ContactsRef href={'tel:+7381237-85-03'}>+7 (3812)
          37-85-03</ContactsRef></ContactsText>
        <ContactsText><ContactsRef href="mailto:info@itdoc55.ru">info@itdoc55.ru</ContactsRef></ContactsText>
        <ContactsText>Понедельник – Пятница 08:00–18:00,<br/> без перерыва на обед, <br/>Суббота, Воскресенье -
          выходной</ContactsText>
      </Contacts>
    </Container>
  </Root>);
}

const Root = styled.div`
  background-color: ${({ theme: { colors } }) => colors.bgSecondColor};
  min-height: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
`;
const Contacts = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContactsText = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.8;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const ContactsRef = styled.a`
  color: ${({ theme: { colors } }) => colors.textColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
