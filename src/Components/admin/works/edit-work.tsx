import { Form, notification } from 'antd';
import { useGetOneWorkQuery, useUpdateWorkMutation } from '../../../app/api';
import { FormWorkType } from './types';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { WorkForm } from './work-form';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledSpin } from '../../../ui';
import { TimeParseService } from '../../../shared/services';

export const EditWork = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [updateWork, { isLoading, isSuccess, error }] = useUpdateWorkMutation();
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneWorkQuery(id);

  const onClickSubmit = () => {
    const values: FormWorkType = form.getFieldsValue();
    const time = +TimeParseService.toMinutes({
      hours: +values.hours,
      minutes: +values.minutes,
    });
    updateWork({ id, body: { ...values, time, price: values.price.toString() } });
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
        messageSuccess: 'Вид работ успешно изменен',
      });
    isSuccess && navigate(-1);
  }, [api, isSuccess, error]);
  useEffect(() => {}, [data]);

  return (
    <>
      {isLoadingFetch && <StyledSpin />}
      <WorkForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        contextHolder={contextHolder}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Изменение вида работ'}
        initialValues={
          data
            ? {
                ...data,
                hours: TimeParseService.toHoursAndMinutes(data.time).hours,
                minutes: TimeParseService.toHoursAndMinutes(data.time).minutes,
                price: +data.price,
              }
            : undefined
        }
      />
    </>
  );
};
