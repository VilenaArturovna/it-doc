import styled from 'styled-components';
import logo from '../../Assets/Images/IT Doc Team.png';
import React from 'react';

export function Plug() {
  return (<Root>
      <Container>
        <Logo src={logo} alt="logo"/>
        <Description>
          <Text>Сайт находится на стадии разработки. Если у Вас остались вопросы, позвоните нам по номеру телефона <Ref
          href={'tel:+7381237-85-03'}>37-85-03</Ref></Text>
          <Text>Наши специалисты ответят на интересующие Вас вопросы. Наша консультация БЕСПЛАТНА</Text>
        </Description>
      </Container>
    </Root>);
}

const Root = styled.section`
  height: 400px;
  background-color: white;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  flex-wrap: nowrap;
`;
const Logo = styled.img`
  height: 370px;
`;
const Text = styled.div`
  width: 600px;
  font-family: "Rubik", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
const Ref = styled.a`
  color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
const Description = styled.div`
flex-direction: column;
  text-align: justify;
`
