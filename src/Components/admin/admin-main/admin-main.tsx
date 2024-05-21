import styled from 'styled-components';
import { Avatar, Col, Menu, MenuProps, Row } from 'antd';
import { Orders } from '../orders';
import { useState } from 'react';
import { Tasks } from '../tasks';

type MenuItem = Required<MenuProps>['items'][number];

enum MenuKeys {
  orders = 'orders',
  tasks = 'tasks',
  providers = 'providers',
  vendors = 'vendors',
  clients = 'clients',
  staff = 'staff',
  warehouse = 'warehouse',
  deadlines = 'deadlines',
  works = 'works',
}

const items: MenuItem[] = [
  {
    label: 'Заказы',
    key: MenuKeys.orders,
  },
  {
    label: 'Задания',
    key: MenuKeys.tasks,
  },
  {
    label: 'Поставщики',
    key: MenuKeys.providers,
  },
  {
    label: 'Вендоры',
    key: MenuKeys.vendors,
  },
  {
    label: 'Клиенты',
    key: MenuKeys.clients,
  },
  {
    label: 'Склад',
    key: MenuKeys.warehouse,
  },
  {
    label: 'Персонал',
    key: MenuKeys.staff,
  },
  {
    label: 'Дедлайны',
    key: MenuKeys.deadlines,
  },
  {
    label: 'Работы',
    key: MenuKeys.works,
  },
];

export const AdminMain = () => {
  const [selectedItem, setSelectedItem] = useState<MenuKeys>(MenuKeys.orders);

  const onClick = (key: MenuKeys) => {
    setSelectedItem(key);
  };

  return (
    <Root>
      <Row>
        <Col flex={1}>
          <LeftBlock>
            <Logo>STAFF LOGO</Logo>
            <Menu
              mode="inline"
              theme="dark"
              items={items}
              onClick={(info) => {
                onClick(info.key as MenuKeys);
              }}
            />
          </LeftBlock>
        </Col>
        <Col flex={5}>
          <RightBlock>
            <RepirtArea>
              <Avatar size={64} src="https://joeschmoe.io/api/v1/random" />
            </RepirtArea>
            <WorkingArea>
              {selectedItem === MenuKeys.orders && <Orders />}
              {selectedItem === MenuKeys.tasks && <Tasks />}
            </WorkingArea>
          </RightBlock>
        </Col>
      </Row>
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
`;
const LeftBlock = styled.div`
  height: 100vh;
  background: #001529;
`;
const Logo = styled.div`
  height: 20vh;
  background: #2819d8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
`;

const RightBlock = styled.div`
  height: 100vh;
`;

const RepirtArea = styled.div`
  height: 100px;
  background: #1e1e1e75;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 20px;
`;

const WorkingArea = styled.div`
  height: calc(100% - 100px);
  background-color: antiquewhite;
`;
