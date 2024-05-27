import Title from 'antd/lib/typography/Title';
import { Form, FormInstance, Input } from 'antd';
import { BackButton, SubmitButton } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FormVendorType } from './types';

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  formTitle: string;
  onClickSubmit: () => void;
  contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  form: FormInstance;
  initialValues?: FormVendorType;
};

export const VendorForm = ({
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
          label={'Название'}
          name={'title'}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Описание'}
          name={'description'}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите описание',
            },
          ]}
        >
          <Input.TextArea autoSize />
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
