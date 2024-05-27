import React, { useCallback, useEffect, useState } from 'react';
import { useFetchWorksQuery } from '../../../app/api';
import { StyledSpin } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, notification, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { TimeParseService } from '../../../shared/services';

export const AdminWorks = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetchWorksQuery({ limit: 10, page });

  const columns = [
    { title: 'Вид', dataIndex: 'name', key: 'name' },
    { title: 'Время', dataIndex: 'time', key: 'time' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price' },
  ];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getWorkRoute(id));
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
        <EmptyComponent createNewTitle={'Добавить вид работ'} link={RoutePaths.newWork} />
      )}
      {data?.data.length && (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newWork)}>
            Добавить вид работ
          </StyledButton>
          <Table
            columns={columns}
            dataSource={data.data.map((item) => ({
              ...item,
              key: item.id,
              time: TimeParseService.toHoursAndMinutesString(item.time),
              price: item.price + '₽',
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
