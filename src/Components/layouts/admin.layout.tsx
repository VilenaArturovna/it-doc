import styled from 'styled-components';
import { Avatar, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const avatarSrc =
  'https://sun9-7.userapi.com/impg/5z_kdsKBvpRrhoCzbdWNqNoXhXmVu0sRfQxLXw/_4WI7zEYTlg.jpg?size=320x320&quality=96&sign=d6f15ce78af703fef5b8f8a72afb66c1&c_uniq_tag=s93Oy3E0V3nINK4KjOCJVotJtdn8i5AQyCoNz3pte2E&type=album';

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

export const AdminLayout = () => {
  const location = useLocation();
  const locate = location.pathname.slice(7);

  const [selectedItem, setSelectedItem] = useState<MenuKeys | null>(
    items.map((i) => i!.key).includes(locate) ? (locate as MenuKeys) : null,
  );
  const navigate = useNavigate();
  const onClick = (key: MenuKeys) => {
    setSelectedItem(key);
  };

  useEffect(() => {
    selectedItem && navigate(`/admin/${selectedItem}`);
  }, [selectedItem]);

  return (
    <Root>
      <LeftBlock>
        <Logo>STAFF LOGO</Logo>
        <Menu
          mode="inline"
          theme="dark"
          items={items}
          onClick={(info) => {
            onClick(info.key as MenuKeys);
          }}
          selectedKeys={selectedItem ? [selectedItem] : undefined}
        />
      </LeftBlock>
      <RightBlock>
        <Header>
          <Avatar size={64} src={avatarSrc} />
        </Header>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </RightBlock>
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;
const LeftBlock = styled.div`
  height: 100vh;
  background: #001529;
  min-width: 200px;
  max-width: 200px;
`;
const Logo = styled.div`
  height: 10vh;
  background: #2819d8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
`;

const RightBlock = styled.div`
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  height: 100px;
  background: #1e1e1e75;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 20px;
`;

const OutletContainer = styled.div`
  display: block;
  max-width: 100%;
  padding: 20px;
`;
