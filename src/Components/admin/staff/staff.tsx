import { useNavigate } from 'react-router-dom';
import { useFetchStaffQuery } from '../../../app/api';
import { StyledSpin } from '../../../ui';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, notification, Table } from 'antd';
import { RoutePaths } from '../../../shared/route-paths';
import styled from 'styled-components';
import { roleMapper } from '../../../shared/mappers';
import { notificationHelper } from '../../../shared/helpers';

export const Staff = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetchStaffQuery({ page, limit: 10 });

  const columns = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Роль', dataIndex: 'role', key: 'role' },
    { title: 'Удален', dataIndex: 'isRemoved', key: 'isRemoved' },
  ];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getOneStaffRoute(id));
    },
    [navigate],
  );
  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);

  return (
    <div>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data?.data.length && (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newStaff)}>
            Добавить сотрудника
          </StyledButton>
          <Table
            columns={columns}
            dataSource={data.data.map((staff) => ({
              id: staff.id,
              key: staff.id,
              name: `${staff.lastname} ${staff.firstname} ${staff.middleName} `,
              role: roleMapper(staff.role),
              isRemoved: staff.isRemoved ? 'Да' : undefined,
            }))}
            size="small"
            onRow={(record) => ({
              onClick: () => {
                onClick(record.id);
              },
              style: {
                background: record.isRemoved ? '#f3cece' : '#fff',
              },
            })}
            pagination={{
              total: data?.total || 0,
              pageSize: data?.limit || 1,
              current: data?.page || 1,
              onChange: (page) => {
                setPage(page);
              },
            }}
          />
        </>
      )}
    </div>
  );
};

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
