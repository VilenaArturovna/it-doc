import { Form, notification } from 'antd';
import { useCreateClientMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { ClientForm } from './client-form';
import { CreateClientRequestDto } from '../../../shared/types/api/generated';

export const NewClient = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [createClient, { isLoading, isSuccess, error }] = useCreateClientMutation();

  const onClickSubmit = () => {
    const values: CreateClientRequestDto = form.getFieldsValue();
    createClient({ ...values, phone: `+7${values.phone}` });
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Клиент успешно создан',
    });
  }, [api, isSuccess, error]);

  return (
    <ClientForm
      isLoading={isLoading}
      buttonTitle={'Создать'}
      contextHolder={contextHolder}
      onClickSubmit={onClickSubmit}
      form={form}
      formTitle={'Новый клиент'}
      isCreating={true}
    />
  );
};
