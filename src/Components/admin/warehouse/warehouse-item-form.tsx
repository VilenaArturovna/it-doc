import Title from 'antd/lib/typography/Title';
import { DatePicker, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { BackButton, SubmitButton } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CreateWarehouseItemRequestDto, Section, Unit } from '../../../shared/types/api/generated';
import { useFetchProvidersQuery, useFetchVendorsQuery } from '../../../app/api';
import { UpdateWarehouseItemFormType } from './types';

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  formTitle: string;
  onClickSubmit: () => void;
  form: FormInstance;
  isCreating: boolean;
  initialValues?: UpdateWarehouseItemFormType;
};

export const WarehouseItemForm = ({
  isLoading,
  buttonTitle,
  onClickSubmit,
  form,
  initialValues,
  formTitle,
  isCreating,
}: Props) => {
  const { data: vendors, isLoading: loadingVendors } = useFetchVendorsQuery({ page: 1, limit: 100 });
  const { data: providers, isLoading: loadingProviders } = useFetchProvidersQuery({ page: 1, limit: 100 });

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {}, [initialValues]);
  return (
    <Root>
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
          label={'Позиция'}
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
        <Form.Item<CreateWarehouseItemRequestDto> name="partNumber" label="Номер">
          <Input />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="compatibleModels" label="Совместимые модели">
          <Input />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="packing" label="Упаковка">
          <Input />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="price" label="Стоимость" required>
          <InputNumber addonAfter="&#8381;" />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="balance" label="Остаток на складе" required>
          <InputNumber />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto>
          label="Единица измерения"
          name="unit"
          hidden={!isCreating}
          required
        >
          <Select>
            <Select.Option value={Unit.Kg}>кг</Select.Option>
            <Select.Option value={Unit.Piece}>шт</Select.Option>
            <Select.Option value={Unit.Set}>Комплект</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> label="Раздел" name="section" hidden={!isCreating} required>
          <Select>
            <Select.Option value={Section.Material}>Материал</Select.Option>
            <Select.Option value={Section.Product}>Продукт</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="expense" label="Расход тонера">
          <InputNumber />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="expenseReserve" label="Резервное количество">
          <InputNumber />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="criticalMargin" label="Критический запас" required>
          <InputNumber />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> name="nextDeliveryDate" label="Следующая поставка">
          <DatePicker />
        </Form.Item>

        <Form.Item<CreateWarehouseItemRequestDto> label="Вендор" name="vendorId" required>
          <Select
            loading={loadingVendors}
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
            options={vendors?.data.map((item) => ({ label: item.title, value: item.id }))}
          />
        </Form.Item>
        <Form.Item<CreateWarehouseItemRequestDto> label="Поставщик" name="providerId" required>
          <Select
            loading={loadingProviders}
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
            options={providers?.data.map((item) => ({ label: item.title, value: item.id }))}
          />
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
