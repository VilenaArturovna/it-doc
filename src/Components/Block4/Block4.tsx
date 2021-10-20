import styled from "styled-components";

export const Block4 = () => {
    return (
        <Root >
            <Container >

            </Container>
        </Root>
    )
}

const Root = styled.div`
  height: 50vh;
  background-color: #22272b;
`
const Container = styled.div`
  ${({ theme: { container } }) => container}
`;
