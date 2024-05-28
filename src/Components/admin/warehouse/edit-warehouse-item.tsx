import { Form, notification } from 'antd';
import { useGetOneWarehouseItemQuery, useUpdateWarehouseItemMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { WarehouseItemForm } from './warehouse-item-form';
import { useParams } from 'react-router-dom';
import { StyledSpin } from '../../../ui';
import { CreateWarehouseItemFormType } from './types';
import dayjs from 'dayjs';

export const EditWarehouseItem = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm<CreateWarehouseItemFormType>();
  const [api, contextHolder] = notification.useNotification();

  const [updateWarehouseItem, { isLoading, isSuccess, error }] = useUpdateWarehouseItemMutation();
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneWarehouseItemQuery(id);

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    updateWarehouseItem({
      id,
      body: {
        ...values,
        price: values.price.toString(),
        nextDeliveryDate: values.nextDeliveryDate?.toISOString(),
      },
    });
  };

  useEffect(() => {
    fetchError &&
      notificationHelper({
        api,
        error: fetchError,
      });
    (isSuccess || error) &&
      notificationHelper({
        api,
        isSuccess,
        error,
        messageSuccess: 'Позиция успешно изменена',
      });
  }, [api, isSuccess, error, fetchError]);
  useEffect(() => {}, [data]);
  return (
    <>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      <WarehouseItemForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Изменение позиции склада'}
        isCreating={false}
        initialValues={
          data
            ? {
                ...data,
                price: +data.price,
                nextDeliveryDate: data.nextDeliveryDate ? dayjs(data.nextDeliveryDate) : undefined,
                vendorId: data.vendor.id,
                providerId: data.provider.id,
              }
            : undefined
        }
      />
    </>
  );
};
