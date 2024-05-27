import React, { useCallback, useEffect, useState } from 'react';
import { useFetchVendorsQuery } from '../../../app/api';
import { StyledSpin, SubmitButton } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Table } from 'antd';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { useForm } from 'antd/es/form/Form';
import { GetManyWorksRequestDto } from '../../../shared/types/api/generated';

export const Vendors = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm<GetManyWorksRequestDto>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useFetchVendorsQuery({ limit: 10, page, search });

  const columns = [{ title: 'Название', dataIndex: 'title', key: 'title' }];

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getVendorRoute(id));
    },
    [navigate],
  );
  const onClickSearch = () => {
    const value = form.getFieldsValue().search;
    setSearch(Boolean(value) ? value : undefined);
    setPage(1);
  };

  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);

  return (
    <div>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data && !search && !data.data.length && (
        <EmptyComponent createNewTitle={'Добавить вендора'} link={RoutePaths.newVendor} />
      )}
      {data?.data.length || search ? (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.newVendor)}>
            Добавить вендора
          </StyledButton>
          <Form form={form} style={{ marginBottom: '20px' }} layout={'inline'}>
            <Form.Item name={'search'}>
              <Input placeholder={'Поиск по наименованию'} style={{ width: '300px' }} />
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form} onClick={onClickSearch} loading={isLoading}>
                Поиск
              </SubmitButton>
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
