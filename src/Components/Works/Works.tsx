import React from 'react';
import styled from 'styled-components';

export const Works = () => {
  return (
    <Root>
      <Container>
        <Title>Также мы выполним для Вас</Title>
        <Content>
          <ContentBlock>
            <h3>
              Ремонт <OrangeText>печатной техники</OrangeText>
            </h3>
            <p>
              Ремонты любой сложности от технического обслуживания до сложных ремонтов электронных компонентов
              к Вашим услугам
            </p>
            <ul>
              <li>Команда высококвалифицированных инженеров с большим опытом работы</li>
              <li>
                Профессиональные инструменты и приборы, позволяющие быстро найти поломку и качественно ее
                устранить
              </li>
              <li>Самые популярные и ходовые запчасти в наличии на складе</li>
              <li>Собственный автопарк позволяет нам быстро добраться к Вам</li>
            </ul>
          </ContentBlock>
          <ContentBlock>
            <h3>
              Ремонт <OrangeText>любой офисной техники</OrangeText>
            </h3>
            <p>
              Ремонты офисной, компьютерной техники от замены клавиатуры на Вашем ноутбуке до замены микрочипа
              сервера
            </p>
          </ContentBlock>
        </Content>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  height: auto;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
`;
const Title = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  color: black;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
const ContentBlock = styled.div`
  padding: 25px;
`;
const OrangeText = styled.span`
  color: orange;
`;
