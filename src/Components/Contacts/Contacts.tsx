import React from 'react';
import { YaMap } from '../Footer/components/YaMap';
import { FormContacts } from './FormContacts';
import bg from '../../Assets/Images/tild3366-6633-4839-a638-633363316466__1.jpg';
import styled from 'styled-components';

export const Contacts = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`
  };
  return (<Root style={bgStyle}>
      <Container>
        <YaMap/>
        <FormContacts/>
      </Container>
    </Root>);
};

const Root = styled.section`
  background-attachment: fixed;
  background-size: cover;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  display: flex;
  justify-content: space-around;
`;
