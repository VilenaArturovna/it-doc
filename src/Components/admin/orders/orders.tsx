import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Form, notification, Table, TableColumnsType } from 'antd';
import { useFetchOrdersQuery } from '../../../app/api';
import { DateService } from '../../../shared/services';
import { orderStatusMapper } from '../../../shared/mappers';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { GetManyOrdersRequestDto } from '../../../shared/types/api/generated';
import { notificationHelper } from '../../../shared/helpers';
import { StyledSpin } from '../../../ui';
import { EmptyComponent } from '../empty';
import styled from 'styled-components';

const columns: TableColumnsType = [
  { title: 'Номер', dataIndex: 'number', key: 'number' },
  { title: 'Создана', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Статус', dataIndex: 'status', key: 'status' },
  { title: 'Дедлайн', dataIndex: 'deadline', key: 'deadline' },
  { title: 'Клиент', dataIndex: 'client', key: 'client' },
  { title: 'Ответственный', dataIndex: 'responsibleStaff', key: 'responsibleStaff' },
];
const expandedTableColumns: TableColumnsType = [
  { title: 'Этап', dataIndex: 'number', key: 'number' },
  { title: 'Статус', dataIndex: 'status', key: 'status' },
  { title: 'Дедлайн', dataIndex: 'deadline', key: 'deadline' },
  { title: 'Начат', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Завершен', dataIndex: 'completedAt', key: 'completedAt' },
  { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
];

export const Orders = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm<GetManyOrdersRequestDto>();

  const [page, setPage] = useState(1);
  const [requestBody, setRequestBody] = useState<Omit<GetManyOrdersRequestDto, 'page' | 'limit'>>({
    isActive: false,
  });

  const { data, isLoading, error } = useFetchOrdersQuery({ page, limit: 10, ...requestBody });

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getOrderRoute(id));
    },
    [navigate],
  );
  const onClickSubmit = (isActive: boolean) => {
    setRequestBody({ isActive });
  };

  const expandedRowRender = (orderId: string) => {
    const order = data?.data.find((order) => order.id === orderId)!;
    return (
      <Table
        columns={expandedTableColumns}
        dataSource={order.stages
          .map((stage) => ({
            ...stage,
            key: stage.id,
            deadline: stage.deadline ? DateService.format(stage.deadline) : undefined,
            status: orderStatusMapper(stage.status),
            createdAt: DateService.format(stage.createdAt),
            completedAt: stage.completedAt ? DateService.format(stage.completedAt) : undefined,
          }))
          .sort((a, b) => a.number - b.number)
          .reverse()}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);

  useEffect(() => {}, [requestBody]);

  return (
    <>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data && !data.data.length && !requestBody && (
        <EmptyComponent createNewTitle={'Оформить первую заявку'} link={RoutePaths.newOrder} />
      )}
      {data?.data.length || requestBody ? (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newOrder)}>
            Оформить заявку
          </StyledButton>
          <Form form={form} style={{ marginBottom: '20px' }} layout={'horizontal'} size={'small'}>
            <Form.Item<GetManyOrdersRequestDto> name="isActive" valuePropName="checked">
              <Checkbox onClick={(e) => onClickSubmit((e.target as HTMLInputElement).checked)}>
                Показать только активные
              </Checkbox>
            </Form.Item>
          </Form>
          <Table
            columns={columns}
            expandable={{ expandedRowRender: (record) => expandedRowRender(record.id) }}
            dataSource={data?.data.map((item) => ({
              ...item,
              key: item.id,
              deadline: item.deadline ? DateService.format(item.deadline) : undefined,
              status: orderStatusMapper(item.status),
              createdAt: DateService.format(item.createdAt),
              client: item.client.name,
              responsibleStaff:
                item.responsibleStaff && item.responsibleStaff.firstname
                  ? `${item.responsibleStaff.lastname} ${item.responsibleStaff.firstname}`
                  : undefined,
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
      ) : (
        ''
      )}
    </>
  );
};

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
