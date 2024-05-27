import Title from 'antd/lib/typography/Title';
import { Form, FormInstance, Input, InputNumber, Space } from 'antd';
import { BackButton, SubmitButton } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormWorkType } from './types';

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  formTitle: string;
  onClickSubmit: () => void;
  contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  form: FormInstance;
  initialValues?: FormWorkType;
};

export const WorkForm = ({
  isLoading,
  buttonTitle,
  onClickSubmit,
  contextHolder,
  form,
  initialValues,
  formTitle,
}: Props) => {
  useEffect(() => {}, [initialValues]);
  return (
    <Root>
      {contextHolder}
      <Title level={4}>{formTitle}</Title>
      <Form form={form} style={{ width: '400px' }} initialValues={initialValues}>
        <Form.Item
          label={'Вид'}
          name={'name'}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'Время'} required={true}>
          <Form.Item
            name="hours"
            rules={[{ required: true, message: 'Введите часы' }]}
            style={{ display: 'inline-block', width: '20%', marginRight: '8px' }}
          >
            <InputNumber placeholder="Часы" min={0} />
          </Form.Item>
          <Space style={{ height: '32px', marginLeft: '20px' }}>ч</Space>
          <Form.Item
            name="minutes"
            rules={[{ required: true, message: 'Введите минуты' }]}
            style={{ display: 'inline-block', width: '20%', margin: '0 8px' }}
          >
            <InputNumber placeholder="Минуты" min={0} max={59} />
          </Form.Item>
          <Space style={{ height: '32px', marginLeft: '20px' }}>мин</Space>
        </Form.Item>
        <Form.Item
          label={'Оплата'}
          name={'price'}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <InputNumber addonAfter="&#8381;" />
        </Form.Item>
        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              {buttonTitle}
            </SubmitButton>
          </Form.Item>
          <BackButton />
        </ButtonGroup>
      </Form>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
`;
