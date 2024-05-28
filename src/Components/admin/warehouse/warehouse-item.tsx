import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, notification, Popconfirm } from 'antd';
import { useRemoveWarehouseItemMutation, useGetOneWarehouseItemQuery } from '../../../app/api';
import { BackButton, StyledSpin } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RoutePaths } from '../../../shared/route-paths';
import { notificationHelper } from '../../../shared/helpers';
import { GetOneWarehouseItemDaoModel } from '../../../shared/types/api/generated';
import { sectionMapper, unitMapper } from '../../../shared/mappers';
import { DateService } from '../../../shared/services';

import './style.scss';

const getDescriptions = (data: GetOneWarehouseItemDaoModel) => [
  {
    key: '1',
    label: 'Позиция',
    children: data.title,
  },
  {
    key: '2',
    label: 'Раздел',
    children: sectionMapper(data.section),
  },
  {
    key: '3',
    label: 'Номер',
    children: data.partNumber,
  },
  {
    key: '4',
    label: 'Остаток на складе',
    children: data.balance,
  },
  {
    key: '5',
    label: 'Единица измерения',
    children: unitMapper(data.unit),
  },
  {
    key: '6',
    label: 'Совместимые модели',
    children: data.compatibleModels,
  },
  {
    key: '7',
    label: 'Упаковка',
    children: data.packing,
  },
  {
    key: '8',
    label: 'Стоимость',
    children: data.price,
  },
  {
    key: '9',
    label: 'Расход тонера',
    children: data.expense,
  },
  {
    key: '10',
    label: 'Резервное количество',
    children: data.expenseReserve,
  },
  {
    key: '11',
    label: 'Критический запас',
    children: data.criticalMargin,
  },
  {
    key: '12',
    label: 'Следующая поставка',
    children: data.nextDeliveryDate ? DateService.format(data.nextDeliveryDate) : undefined,
  },
  {
    key: '13',
    label: 'Вендор',
    children: data.vendor.title,
  },
  {
    key: '14',
    label: 'Поставщик',
    children: data.provider.title,
  },
  {
    key: '15',
    label: 'В архиве',
    children: data.isArchived ? 'Да' : '',
  },
];

export const WarehouseItem = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneWarehouseItemQuery(id);
  const [deleteWarehouseItem, { isSuccess, error: deleteError, isLoading: isLoadingDelete }] =
    useRemoveWarehouseItemMutation();

  const descriptionsItems: DescriptionsProps['items'] = data ? getDescriptions(data) : [];

  const editHandle = () => navigate(RoutePaths.getEditWarehouseItemRoute(id));
  const removeHandle = () => {
    deleteWarehouseItem(id);
  };

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
    (deleteError || isSuccess) &&
      fetchError &&
      notificationHelper({ api, error: deleteError, isSuccess, messageSuccess: 'Позиция удалена' });
  }, [api, fetchError, deleteError, isSuccess]);

  return (
    <div>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      {data && (
        <>
          <StyledDescription items={descriptionsItems} column={1} bordered={true} size={'small'} />
          <ButtonGroup>
            {!data.isArchived ? (
              <div>
                {
                  <StyledButton onClick={editHandle} type="primary">
                    Изменить
                  </StyledButton>
                }

                {
                  <Popconfirm
                    title="Отправка позиции в архив"
                    description="Вы уверены, что хотите архивировать позицию?"
                    onConfirm={removeHandle}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <StyledButton danger loading={isLoadingDelete}>
                      В архив
                    </StyledButton>
                  </Popconfirm>
                }
              </div>
            ) : (
              ''
            )}
            <BackButton />
          </ButtonGroup>
        </>
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
