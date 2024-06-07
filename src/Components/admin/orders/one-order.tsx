import { GetOneOrderDaoModel, OrderStatus, Role } from '../../../shared/types/api/generated';
import { orderPriorityMapper, orderStatusMapper } from '../../../shared/mappers';
import { DateService } from '../../../shared/services';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Descriptions,
  DescriptionsProps,
  notification,
  Popconfirm,
  Table,
  TableColumnsType,
} from 'antd';
import {
  useCompleteOrderMutation,
  useGetOneOrderQuery,
  useOrderReadyMutation,
  usePutOrderInQueueForDiagnosticMutation,
  useStartDiagnosticForOrderMutation,
  useTakeToWorkOrderMutation,
  useUpdateOrderMutation,
} from '../../../app/api';
import React, { useEffect, useState } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { BackButton, StyledSpin } from '../../../ui';
import styled from 'styled-components';
import { useGetMe } from '../../../hooks';
import { RoutePaths } from '../../../shared/route-paths';
import { ApproveOrderModal } from './approve-order-modal';
import dayjs from 'dayjs';

const getDescriptions = (data: GetOneOrderDaoModel) => [
  {
    key: '1',
    label: 'Номер',
    children: data.number,
  },
  {
    key: '2',
    label: 'Статус',
    children: orderStatusMapper(data.status),
  },
  {
    key: '3',
    label: 'Дедлайн',
    children: DateService.format(data.deadline),
  },
  {
    key: '4',
    label: 'Наименование оборудования',
    children: data.equipment,
  },
  {
    key: '5',
    label: 'Состояние оборудования',
    children: data.equipmentCondition,
  },
  {
    key: '6',
    label: 'Серийный номер оборудования',
    children: data.serialNumberEquipment,
  },
  {
    key: '7',
    label: 'Выгодоприобретатель',
    children: data.beneficiary === 'IP' ? 'ИП' : 'ООО',
  },
  {
    key: '8',
    label: 'Неисправность со слов заказчика',
    children: data.malfunction,
  },
  {
    key: '9',
    label: 'Приоритет',
    children: orderPriorityMapper(data.priority),
  },
  {
    key: '10',
    label: 'Ответственный',
    children: data.responsibleStaff?.id
      ? `${data.responsibleStaff?.lastname} ${data.responsibleStaff?.firstname}`
      : undefined,
  },
  {
    key: '11',
    label: 'Стоимость',
    children: data.price + '\u20bd',
  },
  {
    key: '12',
    label: 'Оплачено',
    children: data.isPaid ? 'Да' : undefined,
  },
  {
    key: '13',
    label: 'Отказ в ремонте',
    children: data.refusalToRepair ? 'Да' : undefined,
  },
  {
    key: '14',
    label: 'Клиент',
    children: data.client.name,
  },
];

const stages: TableColumnsType = [
  { title: 'Этап', dataIndex: 'number', key: 'number' },
  { title: 'Статус', dataIndex: 'status', key: 'status' },
  { title: 'Дедлайн', dataIndex: 'deadline', key: 'deadline' },
  { title: 'Начат', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Завершен', dataIndex: 'completedAt', key: 'completedAt' },
  { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
];

const repairParts: TableColumnsType = [
  { title: 'Наименование', dataIndex: 'title', key: 'title' },
  { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Общая стоимость', dataIndex: 'cost', key: 'cost' },
];

const works: TableColumnsType = [
  { title: 'Наименование', dataIndex: 'name', key: 'name' },
  { title: 'Общая стоимость', dataIndex: 'price', key: 'price' },
];

export const OneOrder = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneOrderQuery(id);
  const { user } = useGetMe();
  const isAdmin = user && user.role === Role.Admin;
  const descriptionsItems: DescriptionsProps['items'] = data ? getDescriptions(data) : [];

  const editHandle = () => navigate(RoutePaths.getEditOrderRoute(id));
  const refusalToRepair = () => orderReady({ id, body: { refusalToRepair: true } });

  const [putInQueueForDiagnostic] = usePutOrderInQueueForDiagnosticMutation();
  const [startDiagnostic] = useStartDiagnosticForOrderMutation();
  const [takeToWork] = useTakeToWorkOrderMutation();
  const [orderReady] = useOrderReadyMutation();
  const [complete] = useCompleteOrderMutation();
  const [updateOrder, { isLoading: isLoadingUpdate, error: updateError }] = useUpdateOrderMutation();

  const renderButton = () => {
    if (!data) return;
    let title: string | undefined = undefined;
    let onClick = () => {};
    let disabled = false;
    switch (data.status) {
      case OrderStatus.Registered:
        title = 'Поставить в очередь на диагностику';
        onClick = () => putInQueueForDiagnostic(id);
        break;
      case OrderStatus.InDiagnosticsQueue:
        title = 'Начать диагностику';
        onClick = () => startDiagnostic(id);
        break;
      case OrderStatus.Diagnostic:
        title = 'Завершить диагностику';
        onClick = () => navigate(RoutePaths.getOrderDiagnosedRoute(id));
        break;
      case OrderStatus.Approved:
        title = 'Взять в работу';
        onClick = () => takeToWork(id);
        break;
      case OrderStatus.ApprovedAndSparePartIsOrdered:
        title = 'Взять в работу';
        onClick = () => takeToWork(id);
        disabled = data.deadline > dayjs().toISOString();
        break;
      case OrderStatus.InProgress:
        title = 'Готов к выдаче';
        onClick = () => orderReady({ id, body: {} });
        break;
      case OrderStatus.Ready:
        title = 'Завершить';
        onClick = () => complete(id);
        break;
    }
    if (title && onClick) {
      return (
        <StyledButton onClick={onClick} type="primary" disabled={disabled}>
          {title}
        </StyledButton>
      );
    }
  };

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
    updateError && notificationHelper({ api, error: updateError });
  }, [api, fetchError, updateError]);

  return (
    <div>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      {data && (
        <>
          <StyledDescription items={descriptionsItems} column={2} bordered={true} size={'small'} />
          <Table
            columns={stages}
            dataSource={data?.stages
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
          {data?.repairParts ? (
            <Table
              columns={repairParts}
              dataSource={data?.repairParts.map((part) => ({
                ...part,
                key: part.id,
              }))}
              pagination={false}
            />
          ) : (
            ''
          )}
          {data?.works ? (
            <Table
              columns={works}
              dataSource={data?.works.map((part) => ({
                ...part,
                key: part.id,
              }))}
              pagination={false}
            />
          ) : (
            ''
          )}
          <ButtonGroup>
            <div>
              {isAdmin && data.status !== OrderStatus.Completed ? (
                <StyledButton onClick={editHandle} type="primary">
                  Изменить
                </StyledButton>
              ) : (
                ''
              )}
              {isAdmin && !data.isPaid ? (
                <StyledButton
                  onClick={() => updateOrder({ id, body: { isPaid: true } })}
                  type="primary"
                  loading={isLoadingUpdate}
                >
                  Пометить оплаченным
                </StyledButton>
              ) : (
                ''
              )}
              {renderButton()}
              {isAdmin && data.status === OrderStatus.Diagnosed ? (
                <StyledButton onClick={() => setIsModalOpen(true)} type="primary">
                  Подтвердить
                </StyledButton>
              ) : (
                ''
              )}
              {data.status !== OrderStatus.Completed ? (
                <Popconfirm
                  title="Отказ от ремонта"
                  description="Вы уверены, что хотите пометить заявку готовой?"
                  onConfirm={refusalToRepair}
                  okText="Да"
                  cancelText="Нет"
                >
                  <StyledButton danger>Отказ от ремонта</StyledButton>
                </Popconfirm>
              ) : (
                ''
              )}
            </div>
            <BackButton />
          </ButtonGroup>
        </>
      )}
      {isModalOpen && (
        <ApproveOrderModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} orderId={id} />
      )}
    </div>
  );
};

const StyledDescription = styled(Descriptions)`
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;
