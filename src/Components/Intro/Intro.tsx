import React from 'react';
import logotype from './../../Common/Images/horizontal_on_transparent_2000x899px_by_logaster.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt, faEnvelopeOpen, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import Particles from 'react-particles-js';
import styled from 'styled-components';

export const Intro = () => {
  return (<Root>
      <Logotype>
        <StyledParticles
          params={{
            'particles': {
              'number': {
                'value': 260
              }, 'size': {
                'value': 3
              }
            }, 'interactivity': {
              'events': {
                'onhover': {
                  'enable': true, 'mode': 'repulse'
                }
              }
            }
          }}/>
        <Logo src={logotype} alt=""/>
        <Button color={'secondary'}>Статус заказа</Button>
        <Button color={'secondary'}>Перейти в каталог услуг</Button>
        <Line/>
        <IconsBlock>
          <Icon icon={faEnvelopeOpen}/>
          <Icon icon={faMobileAlt}/>
          <Icon icon={faCloudDownloadAlt}/>
        </IconsBlock>
      </Logotype>
    </Root>);
};

const Root = styled.section`
  height: 75vh;
  background: linear-gradient(75deg, cornflowerblue, darkcyan);
`;
const Logotype = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
`;
const StyledParticles = styled(Particles)`
  position: absolute;
  height: 75vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.4;
  z-index: 0;
`;
const Logo = styled.img`
  width: 600px;
  padding: 50px 0;
  z-index: 1;
`;
const Button = styled.button`
  margin: 10px;
`;
const Line = styled.hr`
  width: 70%;
  height: 1px;
  margin: 20px 10px;
  background-color: white;
  border: none;
`;
const IconsBlock = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  z-index: 2;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${({ theme: { colors } }) => colors.bgMainColor};
`;
