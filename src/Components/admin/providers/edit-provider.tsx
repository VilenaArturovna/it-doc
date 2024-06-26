import { Form, notification } from 'antd';
import { useGetOneProviderQuery, useUpdateProviderMutation } from '../../../app/api';
import { FormProviderType } from './types';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { ProviderForm } from './provider-form';
import { useParams } from 'react-router-dom';
import { StyledSpin } from '../../../ui';

export const EditProvider = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [updateProvider, { isLoading, isSuccess, error }] = useUpdateProviderMutation();
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneProviderQuery(id);

  const onClickSubmit = () => {
    const values: FormProviderType = form.getFieldsValue();
    updateProvider({ id, body: values });
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
        messageSuccess: 'Поставщик успешно изменен',
      });
  }, [api, isSuccess, error, fetchError]);
  useEffect(() => {}, [data]);

  return (
    <>
      {isLoadingFetch && <StyledSpin />}
      {contextHolder}
      <ProviderForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Изменение поставщика'}
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
