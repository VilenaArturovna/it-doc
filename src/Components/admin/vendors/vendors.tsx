import React, { useCallback, useEffect, useState } from 'react';
import { useFetchVendorsQuery } from '../../../app/api';
import { StyledSpin } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, notification, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';

export const Vendors = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetchVendorsQuery({ limit: 10, page });

  const columns = [{ title: 'Название', dataIndex: 'title', key: 'title' }];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getVendorRoute(id));
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
      {data && !data.data.length && (
        <EmptyComponent createNewTitle={'Добавить вендора'} link={RoutePaths.newVendor} />
      )}
      {data?.data.length && (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newVendor)}>
            Добавить вендора
          </StyledButton>
          <Table
            columns={columns}
            dataSource={data.data.map((item) => ({
              ...item,
              key: item.id,
            }))}
            size="small"
            onRow={(record) => ({
              onClick: () => {
                onClick(record.id);
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
