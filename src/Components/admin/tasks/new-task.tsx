import { Form, notification } from 'antd';
import { useCreateTaskMutation } from '../../../app/api';
import { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { TaskForm } from './task-form';
import { TaskFormValues } from './types';

export const NewTask = () => {
  const [createTask, { isLoading, isSuccess, error }] = useCreateTaskMutation();

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onClickSubmit = () => {
    const values: TaskFormValues = form.getFieldsValue();
    createTask({ ...values, deadline: values.deadline?.toISOString(), price: values.price?.toString() });
  };

  useEffect(() => {
    notificationHelper({
      api,
      form,
      isSuccess,
      error,
      messageSuccess: 'Задание успешно создано',
    });
  }, [isSuccess, error]);

  return (
    <>
      {contextHolder}
      <TaskForm
        isLoading={isLoading}
        buttonTitle={'Создать'}
        onClickSubmit={onClickSubmit}
        form={form}
        formTitle={'Новое задание'}
      />
    </>
  );
};
