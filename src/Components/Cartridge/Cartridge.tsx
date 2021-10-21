import cartridge from './../../Assets/Images/kartridj_gg_2.png';
import styled from 'styled-components';

export const Cartridge = () => {
  return (<Root>
      <Container>
        <Image src={cartridge} alt=""/>
        <Title>Профессиональный подход к обслуживанию картриджей</Title>
        <ul>
          <ListItem>Использование только высококачественных материалов</ListItem>
          <ListItem>Замена ресурсных запчастей</ListItem>
          <ListItem>Несколько вариантов предоставления услуг, каждый подберёт для себя максимально удобные и
            выгодные варианты сотрудничества
          </ListItem>
        </ul>
      </Container>
    </Root>);
};

const Root = styled.div`
  height: auto;
  background-color: ${({ theme: { colors } }) => colors.bgSecondColor};
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
`;
const Image = styled.img`
  position: absolute;
  left: 50%;
  height: 50%;
  opacity: 0.3;
`;
const Title = styled.h2`
  font-family: "Rubik", sans-serif;
  font-size: 2.7rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
const ListItem = styled.li`
  font-family: "Rubik", sans-serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme: { colors } }) => colors.textColor};
`;
