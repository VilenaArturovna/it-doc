import React from 'react';
import styled from 'styled-components';

export const YaMap = () => {
  return (
    <Root>
      <Ref href="https://yandex.ru/maps/org/ayti_dok/160729735289/?utm_medium=mapframe&utm_source=maps">
        АйТи ДОК
      </Ref>
      <Description href="https://yandex.ru/maps/66/omsk/category/computer_repairs_and_services/184105768/?utm_medium=mapframe&utm_source=maps">
        Компьютерный ремонт и услуги в Омске
      </Description>
      <Description1 href="https://yandex.ru/maps/66/omsk/category/office_equipment_service_and_repair/184105560/?utm_medium=mapframe&utm_source=maps">
        Ремонт оргтехники в Омске
      </Description1>
      <Frame
        src="https://yandex.ru/map-widget/v1/-/CCUq6ECg2D"
        height="400"
        frameBorder="1"
        allowFullScreen={true}
      />
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  overflow: hidden;
  width: 700px;
`;
const Ref = styled.a`
  color: #eee;
  font-size: 12px;
  position: absolute;
  top: 0;
`;
const Description = styled(Ref)`
  top: 14px;
`;
const Description1 = styled(Ref)`
  top: 28px;
`;
const Frame = styled.iframe`
  position: relative;
  width: 100%;
`;
