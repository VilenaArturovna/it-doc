import dayjs from 'dayjs';
import { Button, DatePicker, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { SubmitButton } from '../../../ui';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFetchStaffQuery } from '../../../app/api';
import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { TaskFormValues } from './types';

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  formTitle: string;
  onClickSubmit: () => void;
  contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  form: FormInstance;
  initialValues?: TaskFormValues;
  taskId?: string;
};

export const TaskForm = ({
  isLoading,
  buttonTitle,
  onClickSubmit,
  contextHolder,
  form,
  initialValues,
  formTitle,
}: Props) => {
  const navigate = useNavigate();
  const { data, isLoading: loadingStaff } = useFetchStaffQuery({ page: 1, limit: 100 });

  useEffect(() => {}, [initialValues]);

  return (
    <Root>
      {contextHolder}
      <Title level={4}>{formTitle}</Title>
      <StyledForm layout="vertical" form={form} initialValues={initialValues}>
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
          <InputNumber addonAfter="&#8381;" defaultValue={initialValues ? initialValues.price : 1000} />
        </Form.Item>
        <Form.Item label="Дедлайн" name="deadline">
          <DatePicker format={'D MMM YYYY HH:mm'} minDate={dayjs()} showTime={{ format: 'HH:mm' }} />
        </Form.Item>
        <Form.Item label="Ответственный" name="responsibleStaffId">
          <Select loading={loadingStaff}>
            {data?.data.map((item) => (
              <Select.Option value={item.id}>{`${item.firstname} ${item.lastname}`}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              {buttonTitle}
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
