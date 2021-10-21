import styled from 'styled-components';
import logo from '../../Assets/Images/IT Doc Team.png';

export function Plug() {
  return (<Root>
      <Container>
        <Logo src={logo} alt="logo"/>
        <Text>Сайт находится на стадии разработки. Вся информация о деятельности и работе компании представлена на
          главной странице</Text>
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
  max-height: 45vh;
`;
const Text = styled.div`
  width: 600px;
  font-family: "Rubik", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
