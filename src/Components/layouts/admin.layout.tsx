import styled from 'styled-components';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGetMe } from '../../hooks';
import { Role } from '../../shared/types/api/generated';
import { DropdownAvatar } from '../../ui';

type MenuItem = Required<MenuProps>['items'][number];

enum AdminMenuKeys {
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
    label: 'Заявки',
    key: AdminMenuKeys.orders,
  },
  {
    label: 'Задания',
    key: AdminMenuKeys.tasks,
  },
  {
    label: 'Поставщики',
    key: AdminMenuKeys.providers,
  },
  {
    label: 'Вендоры',
    key: AdminMenuKeys.vendors,
  },
  {
    label: 'Клиенты',
    key: AdminMenuKeys.clients,
  },
  {
    label: 'Склад',
    key: AdminMenuKeys.warehouse,
  },
];

const adminItems: MenuItem[] = [
  {
    label: 'Персонал',
    key: AdminMenuKeys.staff,
  },
  {
    label: 'Дедлайны',
    key: AdminMenuKeys.deadlines,
  },
  {
    label: 'Работы',
    key: AdminMenuKeys.works,
  },
];

export const AdminLayout = () => {
  const location = useLocation();
  const locate = location.pathname.slice(7);
  const navigate = useNavigate();
  const { user } = useGetMe();

  const [selectedItem, setSelectedItem] = useState<AdminMenuKeys | null>(null);

  const menuItems = user?.role !== Role.Admin ? items : items.concat(adminItems);

  const onClick = (key: AdminMenuKeys) => {
    setSelectedItem(key);
  };

  useEffect(() => {
    selectedItem && navigate(`/admin/${selectedItem}`);
  }, [selectedItem]);
  useEffect(() => {
    const item = menuItems.map((i) => i!.key).includes(locate) ? (locate as AdminMenuKeys) : null;
    setSelectedItem(item);
  }, [locate, user]);

  return (
    <Root>
      <LeftBlock>
        <Logo>STAFF LOGO</Logo>
        <Menu
          mode="inline"
          theme="dark"
          items={menuItems}
          onClick={(info) => {
            onClick(info.key as AdminMenuKeys);
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
