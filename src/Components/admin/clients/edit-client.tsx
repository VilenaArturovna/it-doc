import { Form, notification } from 'antd';
import { useGetOneClientQuery, useUpdateClientMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { ClientForm } from './client-form';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledSpin } from '../../../ui';
import { UpdateClientRequestDto } from '../../../shared/types/api/generated';

export const EditClient = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm<UpdateClientRequestDto>();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [updateClient, { isLoading, isSuccess, error }] = useUpdateClientMutation();
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneClientQuery(id);

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    updateClient({ id, body: { ...values, phone: `+7${values.phone}` } });
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
        messageSuccess: 'Клиент успешно изменен',
      });
    isSuccess && navigate(-1);
  }, [api, isSuccess, error, fetchError]);
  useEffect(() => {}, [data]);

  return (
    <>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      <ClientForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Изменение клиента'}
        isCreating={false}
        initialValues={
          data
            ? {
                ...data,
                phone: data.phone.slice(2),
              }
            : undefined
        }
      />
    </>
  );
};
