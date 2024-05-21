import logo from './../../Assets/Images/IT Doc Team.png';
import styled from 'styled-components';

export const Main = () => {
  return (
    <section>
      <Container>
        <Logo src={logo} alt="logo" />
        <div>
          <Title>5 причин, почему следует выбрать нас</Title>
          <ul>
            <ListItem>
              <BoldText>It Doc</BoldText> – это команда высококвалифицированных специалистов
            </ListItem>
            <ListItem>
              Мы предлагаем ПОЛНЫЙ спектр услуг от заправки картриджа, до сложных электронных ремонтов{' '}
              <b>ЛЮБОЙ</b> офисной техники
            </ListItem>
            <ListItem>
              Наличие профессионального оборудования, для ремонта и обслуживания офисной техники, а так же{' '}
              <b>огромный опыт</b>
            </ListItem>
            <ListItem>
              Вы сможете снять вопрос содержания и ремонта офисной техники, имея{' '}
              <BoldText>ОДНОГО ПАРТНЁРА</BoldText> в лице <BoldText>It Doc</BoldText>
            </ListItem>
            <ListItem>
              <b>Прозрачное</b> и понятное ценообразование
            </ListItem>
          </ul>
        </div>
      </Container>
    </section>
  );
};

const Container = styled.div`
  ${({ theme: { container } }) => container}
  flex-wrap: nowrap;
  height: auto;
  padding-bottom: 10px;
`;
const Logo = styled.img`
  max-height: 45vh;
`;
const Title = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
const ListItem = styled.li`
  font-size: 1.3em;
`;
const BoldText = styled.span`
  font-weight: 700;
  color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
