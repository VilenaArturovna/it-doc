import { Form, notification } from 'antd';
import { useCreateProviderMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { ProviderForm } from './provider-form';
import { FormProviderType } from './types';

export const NewProvider = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [createProvider, { isLoading, isSuccess, error }] = useCreateProviderMutation();

  const onClickSubmit = () => {
    const values: FormProviderType = form.getFieldsValue();
    createProvider(values);
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Поставщик успешно создан',
    });
  }, [api, isSuccess, error]);

  return (
    <>
      {contextHolder}
      <ProviderForm
        isLoading={isLoading}
        buttonTitle={'Создать'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Новый поставщик'}
      />
    </>
  );
};
