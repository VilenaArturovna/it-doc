import styled from 'styled-components';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGetMe } from '../../hooks';
import { Role } from '../../shared/types/api/generated';
import { DropdownAvatar } from '../../ui';

type MenuItem = Required<MenuProps>['items'][number];

enum MenuKeys {
  orders = 'orders',
  tasks = 'tasks',
  providers = 'providers',
  vendors = 'vendors',
  clients = 'clients',
  staff = 'staff',
  warehouse = 'warehouse-items',
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
];

const adminItems: MenuItem[] = [
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
    items
      .concat(adminItems)
      .map((i) => i!.key)
      .includes(locate)
      ? (locate as MenuKeys)
      : null,
  );

  const navigate = useNavigate();
  const onClick = (key: MenuKeys) => {
    setSelectedItem(key);
  };

  const { user } = useGetMe();

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
          items={user?.role !== Role.Admin ? items : items.concat(adminItems)}
          onClick={(info) => {
            onClick(info.key as MenuKeys);
          }}
          selectedKeys={selectedItem ? [selectedItem] : undefined}
        />
      </LeftBlock>
      <RightBlock>
        <Header>
          <DropdownAvatar src={user?.avatar ?? undefined} />
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
  height: calc(100vh - 100px - 40px);
  overflow: scroll;
`;
