import { Button, DatePicker, Form, Input, InputNumber, notification, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from '../../../app/api';
import { SubmitButton } from '../../../ui';
import { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';

type FormValues = {
  theme: string;
  description: string;
  deadline?: Dayjs;
  price?: number;
  responsibleStaffId?: string;
};

export const NewTask = () => {
  const navigate = useNavigate();

  const [createTask, { isLoading, isSuccess, error }] = useCreateTaskMutation();

  const [form] = Form.useForm<FormValues>();

  const [api, contextHolder] = notification.useNotification();

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
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
    <Root>
      {contextHolder}
      <Title level={4}>Новое задание</Title>
      <StyledForm layout="vertical" form={form}>
        <Form.Item
          name="theme"
          label="Тема"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите тему задания',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Пожалуйста, добавьте описание' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="price" label={'Оплата'}>
          <InputNumber addonAfter="&#8381;" defaultValue={1000} />
        </Form.Item>
        <Form.Item label="Дедлайн" name="deadline">
          <DatePicker format={'D MMM YYYY HH:mm'} minDate={dayjs()} showTime={{ format: 'HH:mm' }} />
        </Form.Item>
        <Form.Item label="Ответственный" name="responsibleStaffId">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              Submit
            </SubmitButton>
          </Form.Item>
          <Button type="primary" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </ButtonGroup>
      </StyledForm>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
`;
