import React, { useCallback, useEffect, useState } from 'react';
import { useFetchWarehouseItemsQuery } from '../../../app/api';
import { StyledSpin, SubmitButton } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { GetManyWarehouseItemsRequestDto } from '../../../shared/types/api/generated';
import { sectionMapper, unitMapper } from '../../../shared/mappers';

export const WarehouseItems = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm<GetManyWarehouseItemsRequestDto>();

  const [page, setPage] = useState(1);
  const [requestBody, setRequestBody] = useState<GetManyWarehouseItemsRequestDto | undefined>(undefined);
  const { data, isLoading, error } = useFetchWarehouseItemsQuery({ ...requestBody, limit: 10, page });

  const columns = [
    { title: 'Раздел', dataIndex: 'section', key: 'section' },
    { title: 'Позиция', dataIndex: 'title', key: 'title' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price' },
    { title: 'Количество', dataIndex: 'balance', key: 'balance' },
    { title: 'Единица измерения', dataIndex: 'unit', key: 'unit' },
    { title: 'Номер', dataIndex: 'partNumber', key: 'partNumber' },
  ];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getWarehouseItemRoute(id));
    },
    [navigate],
  );
  const onClickSearch = () => {
    const values = form.getFieldsValue();
    setRequestBody({ ...values, search: Boolean(values.search) ? values.search : undefined });
    setPage(1);
  };
  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);

  return (
    <div>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data && !data.data.length && !requestBody && (
        <EmptyComponent createNewTitle={'Добавить позицию на склад'} link={RoutePaths.newWarehouseItem} />
      )}

      {data?.data.length || requestBody ? (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newWarehouseItem)}>
            Добавить позицию на склад
          </StyledButton>
          <Form form={form} style={{ marginBottom: '20px' }} layout={'horizontal'} size={'small'}>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Form.Item<GetManyWarehouseItemsRequestDto>
                name={'search'}
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <Input
                  placeholder={'Поиск по всем позиции, номеру, совместимым моделям'}
                  style={{ width: '300px' }}
                />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginLeft: '20px' }}>
                <SubmitButton form={form} onClick={onClickSearch} loading={isLoading}>
                  Поиск
                </SubmitButton>
                <Button htmlType="reset" style={{ marginLeft: '8px' }}>
                  Сброс
                </Button>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Form.Item<GetManyWarehouseItemsRequestDto>
                name="isExactMatch"
                valuePropName="checked"
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <Checkbox>Точное совпадение</Checkbox>
              </Form.Item>
              <Form.Item<GetManyWarehouseItemsRequestDto>
                name="isArchived"
                valuePropName="checked"
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <Checkbox>Искать архивные</Checkbox>
              </Form.Item>
            </Form.Item>
          </Form>
          <Table
            columns={columns}
            dataSource={data?.data.map((item) => ({
              ...item,
              key: item.id,
              unit: unitMapper(item.unit),
              section: sectionMapper(item.section),
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
    </div>
  );
};

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
