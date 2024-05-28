import { useGetOneTaskQuery, useUpdateTaskMutation } from '../../../app/api';
import { Form, notification } from 'antd';
import { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { TaskForm } from './task-form';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { TaskFormValues } from './types';
import { StyledSpin } from '../../../ui';

export const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [updateTask, { isLoading, isSuccess, error }] = useUpdateTaskMutation();
  const { data: task, isLoading: fetchLoading, error: fetchError } = useGetOneTaskQuery(id);

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onClickSubmit = () => {
    const values: TaskFormValues = form.getFieldsValue();
    updateTask({
      id,
      body: { ...values, deadline: values.deadline?.toISOString(), price: values.price?.toString() },
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
        messageSuccess: 'Задание успешно изменено',
      });
  }, [api, isSuccess, error, fetchError]);
  useEffect(() => {}, [task]);

  return (
    <>
      {contextHolder}
      {fetchLoading && <StyledSpin />}
      <TaskForm
        isLoading={isLoading}
        buttonTitle={'Изменить'}
        formTitle={`Редактирование задания ${task?.number}`}
        onClickSubmit={onClickSubmit}
        form={form}
        initialValues={
          task
            ? {
                theme: task.theme,
                description: task.description,
                responsibleStaffId: task.participants.find((p) => p.isResponsible)?.staff.id,
                price: task.price ? Number(task.price) : undefined,
                deadline: task.deadline ? dayjs(task.deadline) : undefined,
              }
            : undefined
        }
      />
    </>
  );
};
