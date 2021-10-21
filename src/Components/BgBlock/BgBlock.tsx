import bg from './../../Common/Images/tild3366-6633-4839-a638-633363316466__1.jpg';
import styled from 'styled-components';

export const BgBlock = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`
  };
  return (<Root style={bgStyle}>
      <Container>

      </Container>
    </Root>);
};

const Root = styled.div`
  height: 80vh;
  background-attachment: fixed;
  background-size: cover;
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
`;
