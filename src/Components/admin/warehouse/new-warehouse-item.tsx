import { Form, notification } from 'antd';
import { useCreateWarehouseItemMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { WarehouseItemForm } from './warehouse-item-form';
import { CreateWarehouseItemFormType } from './types';

export const NewWarehouseItem = () => {
  const [form] = Form.useForm<CreateWarehouseItemFormType>();
  const [api, contextHolder] = notification.useNotification();

  const [createWarehouseItem, { isLoading, isSuccess, error }] = useCreateWarehouseItemMutation();

  const onClickSubmit = () => {
    const values: CreateWarehouseItemFormType = form.getFieldsValue();
    createWarehouseItem({
      ...values,
      price: values.price.toString(),
      nextDeliveryDate: values.nextDeliveryDate?.toISOString(),
    });
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Позиция успешно создана',
    });
  }, [api, isSuccess, error]);

  return (
    <>
      {contextHolder}
      <WarehouseItemForm
        isLoading={isLoading}
        buttonTitle={'Создать'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Новая позиция на складе'}
        isCreating={true}
      />
    </>
  );
};
