import { Checkbox, Form, Input, notification, Select } from 'antd';
import { useCreateOrderMutation, useFetchClientsQuery, useFetchStaffQuery } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import Title from 'antd/lib/typography/Title';
import { CreateOrderRequestDto, Priority } from '../../../shared/types/api/generated';
import { orderPriorityMapper } from '../../../shared/mappers';
import { BackButton, SubmitButton } from '../../../ui';
import styled from 'styled-components';

export const NewOrder = () => {
  const [form] = Form.useForm<CreateOrderRequestDto>();
  const [api, contextHolder] = notification.useNotification();

  const { data: staff, isLoading: loadingStaff } = useFetchStaffQuery({
    page: 1,
    limit: 100,
    isActive: true,
  });
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();
  const { data: clients, isLoading: loadingClients } = useFetchClientsQuery({ page: 1, limit: 1000 });
  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    createOrder({ ...values, isRemoteOrder: values.isRemoteOrder ?? false });
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Заявка оформлена',
    });
  }, [api, isSuccess, error]);
  return (
    <Root>
      {contextHolder}
      <Title level={4}>Новая заявка</Title>
      <Form
        form={form}
        size={'small'}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        style={{ width: '600px' }}
      >
        <Form.Item<CreateOrderRequestDto>
          name="priority"
          label="Приоритет"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Select>
            <Select.Option value={Priority.Normal}>{orderPriorityMapper(Priority.Normal)}</Select.Option>
            <Select.Option value={Priority.Urgent}>{orderPriorityMapper(Priority.Urgent)}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<CreateOrderRequestDto>
          name="clientId"
          label="Клиент"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Select
            loading={loadingClients}
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
            options={clients?.data.map((item) => ({ label: item.name, value: item.id }))}
          />
        </Form.Item>
        <Form.Item<CreateOrderRequestDto>
          name="equipment"
          label="Наименование оборудования"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<CreateOrderRequestDto>
          name="equipmentCondition"
          label="Состояние оборудования"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item<CreateOrderRequestDto>
          name="malfunction"
          label="Неисправность со слов заказчика"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item<CreateOrderRequestDto> name="serialNumberEquipment" label="Серийный номер оборудования">
          <Input />
        </Form.Item>
        <Form.Item<CreateOrderRequestDto> label="Ответственный" name="responsibleStaffId">
          <Select loading={loadingStaff}>
            {staff?.data.map((item) => (
              <Select.Option value={item.id}>{`${item.firstname} ${item.lastname}`}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<CreateOrderRequestDto>
          name="isRemoteOrder"
          valuePropName="checked"
          style={{ paddingLeft: '200px' }}
        >
          <Checkbox defaultChecked={false}>Удаленная заявка</Checkbox>
        </Form.Item>
        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              Оформить
            </SubmitButton>
          </Form.Item>
          <BackButton />
        </ButtonGroup>
      </Form>
    </Root>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 600px;
`;

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
