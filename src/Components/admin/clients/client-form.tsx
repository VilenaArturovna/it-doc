import Title from 'antd/lib/typography/Title';
import { Form, FormInstance, Input, Select } from 'antd';
import { BackButton, SubmitButton } from '../../../ui';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Beneficiary,
  ClientType,
  CreateClientRequestDto,
  UpdateClientRequestDto,
} from '../../../shared/types/api/generated';

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  formTitle: string;
  onClickSubmit: () => void;
  contextHolder: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  form: FormInstance;
  isCreating: boolean;
  initialValues?: CreateClientRequestDto | UpdateClientRequestDto;
};

export const ClientForm = ({
  isLoading,
  buttonTitle,
  onClickSubmit,
  contextHolder,
  form,
  initialValues,
  formTitle,
  isCreating,
}: Props) => {
  const [required, setRequired] = useState(false);
  const onClickSelect = () => {
    if (form.getFieldsValue().type === ClientType.LegalPerson) {
      setRequired(true);
    } else {
      setRequired(false);
    }
  };
  useEffect(() => {}, [initialValues, required]);
  return (
    <Root>
      {contextHolder}
      <Title level={4}>{formTitle}</Title>
      <Form
        form={form}
        style={{ width: '600px' }}
        initialValues={initialValues}
        size={'small'}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label={'Название/имя'}
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
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Input addonBefore="+7" />
        </Form.Item>
        <Form.Item name={'fullName'} label={'Полное наименование'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'legalAddress'} label={'Юридический адрес'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'actualAddress'} label={'Фактический адрес'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item label="Выгодоприобретатель" name="beneficiary" required={required}>
          <Select>
            <Select.Option value={Beneficiary.Ip}>ИП</Select.Option>
            <Select.Option value={Beneficiary.Ooo}>ООО</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Вид (ЮЛ/ФЛ)" name="type" hidden={!isCreating}>
          <Select onClick={onClickSelect}>
            <Select.Option value={ClientType.LegalPerson}>юридическое лицо</Select.Option>
            <Select.Option value={ClientType.PhysicalPerson}>физическое лицо</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={'INN'} label={'ИНН'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'KPP'} label={'КПП'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'OGRN'} label={'ОГРН'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'BIK'} label={'БИК'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'paymentAccount'} label={'Платежный счет'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'correspondentAccount'} label={'Корреспондентский счет'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'directorName'} label={'Директор'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label={'Адрес электронной почты'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'contactPerson'} label={'Контактное лицо'} required={required}>
          <Input />
        </Form.Item>
        <Form.Item name={'contactPersonPhone'} label={'Телефон контактного лица'} required={required}>
          <Input />
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
  width: 600px;
`;
