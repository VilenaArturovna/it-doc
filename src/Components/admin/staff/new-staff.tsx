import { DatePicker, Form, Input, notification, Select } from 'antd';
import { useCreateStaffMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { CreateStaffRequestDto, Role } from '../../../shared/types/api/generated';
import dayjs, { Dayjs } from 'dayjs';
import Title from 'antd/lib/typography/Title';
import { BackButton, SubmitButton } from '../../../ui';
import styled from 'styled-components';
import { roleMapper } from '../../../shared/mappers';

interface FormValues extends Omit<CreateStaffRequestDto, 'birthdate'> {
  birthdate?: Dayjs;
}

export const NewStaff = () => {
  const [form] = Form.useForm<FormValues>();
  const [api, contextHolder] = notification.useNotification();

  const [createStaff, { isLoading, error, isSuccess }] = useCreateStaffMutation();

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    createStaff({ ...values, birthdate: values.birthdate?.toISOString(), phone: `+7${values.phone}` });
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Сотрудник добавлен',
    });
  }, [isSuccess, error]);
  return (
    <Root>
      {contextHolder}
      <Title level={4}>Новый сотрудник</Title>
      <StyledForm layout="vertical" form={form}>
        <Form.Item
          name="lastname"
          label="Фамилия"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="middleName"
          label="Отчество"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input addonBefore="+7" />
        </Form.Item>
        <Form.Item
          name="tgUsername"
          label="Ник телеграм"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input addonBefore="@" />
        </Form.Item>

        <Form.Item
          label="Роль"
          name="role"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Select>
            <Select.Option value={Role.Admin}>{roleMapper(Role.Admin)}</Select.Option>
            <Select.Option value={Role.Engineer}>{roleMapper(Role.Engineer)}</Select.Option>
            <Select.Option value={Role.Manager}>{roleMapper(Role.Manager)}</Select.Option>
            <Select.Option value={Role.Dispatcher}>{roleMapper(Role.Dispatcher)}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Дата рождения" name="birthdate">
          <DatePicker format={'D MMM YYYY'} maxDate={dayjs().subtract(18, 'year')} />
        </Form.Item>

        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              Создать
            </SubmitButton>
          </Form.Item>
          <BackButton />
        </ButtonGroup>
      </StyledForm>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
`;
