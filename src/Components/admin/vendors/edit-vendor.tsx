import { Form, notification } from 'antd';
import { useGetOneVendorQuery, useUpdateVendorMutation } from '../../../app/api';
import { FormVendorType } from './types';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { VendorForm } from './vendor-form';
import { useParams } from 'react-router-dom';
import { StyledSpin } from '../../../ui';

export const EditVendor = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [updateVendor, { isLoading, isSuccess, error }] = useUpdateVendorMutation();
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneVendorQuery(id);

  const onClickSubmit = () => {
    const values: FormVendorType = form.getFieldsValue();
    updateVendor({ id, body: values });
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
        messageSuccess: 'Вендор успешно изменен',
      });
  }, [api, isSuccess, error, fetchError]);
  useEffect(() => {}, [data]);

  return (
    <>
      {isLoadingFetch && <StyledSpin />}
      {contextHolder}
      <VendorForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Изменение вендора'}
        initialValues={
          data
            ? {
                title: data.title,
                description: data.description,
              }
            : undefined
        }
      />
    </>
  );
};
