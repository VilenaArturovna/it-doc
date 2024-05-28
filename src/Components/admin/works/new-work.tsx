import { Form, notification } from 'antd';
import { useCreateWorkMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { WorkForm } from './work-form';
import { FormWorkType } from './types';
import { TimeParseService } from '../../../shared/services';

export const NewWork = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [createWork, { isLoading, isSuccess, error }] = useCreateWorkMutation();

  const onClickSubmit = () => {
    const values: FormWorkType = form.getFieldsValue();
    const time = +TimeParseService.toMinutes({
      hours: +values.hours,
      minutes: +values.minutes,
    });
    createWork({ ...values, time, price: values.price.toString() });
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Вид работ успешно создан',
    });
  }, [api, isSuccess, error]);

  return (
    <>
      {contextHolder}
      <WorkForm
        isLoading={isLoading}
        buttonTitle={'Создать'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Новый вид работ'}
      />
    </>
  );
};
