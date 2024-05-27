import React, { useCallback, useEffect, useState } from 'react';
import { useFetchWorksQuery } from '../../../app/api';
import { StyledSpin, SubmitButton } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { TimeParseService } from '../../../shared/services';
import { useForm } from 'antd/es/form/Form';

export const AdminWorks = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useFetchWorksQuery({
    limit: 10,
    page,
    search,
  });

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
  const onClickSubmit = () => {
    const value = form.getFieldsValue().search;
    setSearch(Boolean(value) ? value : undefined);
    setPage(1);
  };

  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);
  useEffect(() => {}, [search]);

  return (
    <div>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data && !search && !data.data.length && (
        <EmptyComponent createNewTitle={'Добавить вид работ'} link={RoutePaths.newWork} />
      )}
      {(data?.data.length || search) && (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newWork)}>
            Добавить вид работ
          </StyledButton>
          <Form form={form} style={{ marginBottom: '20px' }} layout={'inline'}>
            <Form.Item name={'search'}>
              <Input placeholder={'Введите вид работ'} style={{ width: '300px' }} />
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
                Поиск
              </SubmitButton>
            </Form.Item>
          </Form>
          <Table
            columns={columns}
            dataSource={data?.data.map((item) => ({
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
