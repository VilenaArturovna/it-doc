import React, { useCallback, useEffect, useState } from 'react';
import { useFetchClientsQuery } from '../../../app/api';
import { StyledSpin, SubmitButton } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Select, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import {
  Beneficiary,
  ClientType,
  GetManyClientsRequestDto,
  GetManyClientsSorting,
  OrderType,
} from '../../../shared/types/api/generated';

export const Clients = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm<GetManyClientsRequestDto>();

  const [page, setPage] = useState(1);
  const [requestBody, setRequestBody] = useState<GetManyClientsRequestDto | undefined>(undefined);
  const { data, isLoading, error } = useFetchClientsQuery({ ...requestBody, limit: 10, page });

  const columns = [{ title: 'Название/имя', dataIndex: 'name', key: 'name' }];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getClientRoute(id));
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
        <EmptyComponent createNewTitle={'Добавить клиента'} link={RoutePaths.newClient} />
      )}

      {data?.data.length || requestBody ? (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newClient)}>
            Добавить клиента
          </StyledButton>
          <Form form={form} style={{ marginBottom: '20px' }} layout={'horizontal'} size={'small'}>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Form.Item name={'search'} style={{ display: 'inline-block', marginRight: '8px' }}>
                <Input placeholder={'Поиск по названию, ИНН, директору'} style={{ width: '300px' }} />
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
              <Form.Item
                label="Сортировать"
                name="sort"
                style={{ display: 'inline-block', width: '30%', marginRight: '8px' }}
              >
                <Select>
                  <Select.Option value={GetManyClientsSorting.Name}>имени</Select.Option>
                  <Select.Option value={GetManyClientsSorting.FullName}>полному имени</Select.Option>
                  <Select.Option value={GetManyClientsSorting.Inn}>ИНН</Select.Option>
                  <Select.Option value={GetManyClientsSorting.Type}>виду (ЮЛ/ФЛ)</Select.Option>
                  <Select.Option value={GetManyClientsSorting.Beneficiary}>выгодоприобретателю</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Тип сортировки"
                name="order"
                style={{ display: 'inline-block', width: '30%', marginRight: '8px' }}
              >
                <Select>
                  <Select.Option value={OrderType.Asc}>по возрастанию</Select.Option>
                  <Select.Option value={OrderType.Desc}>по убыванию</Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Form.Item
                label="Выгодоприобретатель"
                name="beneficiary"
                style={{ display: 'inline-block', width: '30%', marginRight: '8px' }}
              >
                <Select>
                  <Select.Option value={Beneficiary.Ip}>ИП</Select.Option>
                  <Select.Option value={Beneficiary.Ooo}>ООО</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Вид (ЮЛ/ФЛ)"
                name="type"
                style={{ display: 'inline-block', width: '30%', marginRight: '8px' }}
              >
                <Select>
                  <Select.Option value={ClientType.LegalPerson}>юридическое лицо</Select.Option>
                  <Select.Option value={ClientType.PhysicalPerson}>физическое лицо</Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>
          </Form>
          <Table
            columns={columns}
            dataSource={data?.data.map((item) => ({
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
      ) : (
        ''
      )}
    </div>
  );
};

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
