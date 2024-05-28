import { Form, notification } from 'antd';
import { useCreateVendorMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { VendorForm } from './vendor-form';
import { FormVendorType } from './types';

export const NewVendor = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [createVendor, { isLoading, isSuccess, error }] = useCreateVendorMutation();

  const onClickSubmit = () => {
    const values: FormVendorType = form.getFieldsValue();
    createVendor(values);
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Вендор успешно создан',
    });
  }, [api, isSuccess, error]);

  return (
    <>
      {contextHolder}
      <VendorForm
        isLoading={isLoading}
        buttonTitle={'Создать'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Новый вендор'}
      />
    </>
  );
};
