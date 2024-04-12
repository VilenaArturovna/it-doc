import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBuilding, faBusinessTime, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export const FormContacts = () => {
  return (<Root>
      <h2>Контактная информация</h2>
      <Container>
        <ContactItem>
          <IconBlock>
            <Icon icon={faBuilding} />
          </IconBlock>
          <Text>ул. Голика, 2</Text>
        </ContactItem>
        <ContactItem>
          <IconBlock>
            <Icon icon={faMobileAlt}/>
          </IconBlock>
          <Text>Телефон: <Ref href={'tel:+7381237-85-03'}>+7 (3812) 37-85-03</Ref></Text>
        </ContactItem>
        <ContactItem>
          <IconBlock>
            <Icon icon={faAt}/>
          </IconBlock>
          <Text><Ref href="mailto:info@itdoc55.ru">info@itdoc55.ru</Ref></Text>
        </ContactItem>
        <ContactItem>
          <IconBlock>
            <Icon icon={faBusinessTime}/>
          </IconBlock>
          <Text>пн - пт 08:00–17:00, без перерыва <br/>на обед, сб, вс - выходной</Text>
        </ContactItem>

      </Container>
    </Root>);
};

const Root = styled.div`
  min-width: 500px;
  height: 400px;
  background-color: ${({ theme: { colors } }) => colors.bgMainColor};
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;
const ContactItem = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: ${({ theme: { colors } }) => colors.bgFormColor};
  display: flex;
  align-items: center;
`;
const IconBlock = styled.div`
  width: 50px;
  height: 100%;
  background-color: ${({ theme: { colors } }) => colors.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const Text = styled.span`
  padding: 0 10px;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const Ref = styled.a`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
