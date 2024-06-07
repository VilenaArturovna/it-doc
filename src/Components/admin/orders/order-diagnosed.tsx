import { useDiagnosedOrderMutation, useFetchWarehouseItemsQuery, useFetchWorksQuery } from '../../../app/api';
import { Button, Card, Form, Input, InputNumber, notification, Select } from 'antd';
import { OrderHasBeenDiagnosedRequestDto } from '../../../shared/types/api/generated';
import { BackButton, SubmitButton } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { notificationHelper } from '../../../shared/helpers';
import { CloseOutlined } from '@ant-design/icons';

export const OrderDiagnosed = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm<OrderHasBeenDiagnosedRequestDto>();
  const [api, contextHolder] = notification.useNotification();

  const [diagnosed, { isLoading, error, isSuccess }] = useDiagnosedOrderMutation();
  const { data: works, isLoading: isLoadingWorks } = useFetchWorksQuery({ limit: 1000, page: 1 });
  const { data: warehouseItems, isLoading: isLoadingWarehouseItems } = useFetchWarehouseItemsQuery({
    limit: 1000,
    page: 1,
  });
  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    diagnosed({
      id,
      body: values,
    });
  };
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    notificationHelper({
      api,
      isSuccess,
      error,
      messageSuccess: 'Заявка продиагностирована',
    });
  }, [api, isSuccess, error]);
  return (
    <div>
      {contextHolder}
      <StyledForm form={form}>
        <Form.Item<OrderHasBeenDiagnosedRequestDto> name="equipmentCondition" label="Состояние оборудование">
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item<OrderHasBeenDiagnosedRequestDto>
          name="worksIds"
          label="Работы"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите значение',
            },
          ]}
        >
          <Select
            mode="multiple"
            loading={isLoadingWorks}
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
            options={works?.data.map((item) => ({ label: item.name, value: item.id }))}
          />
        </Form.Item>
        <Form.List name="repairParts">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`ЗИП ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Наименование" name={[field.name, 'warehouseItemId']}>
                    <Select
                      loading={isLoadingWarehouseItems}
                      showSearch
                      filterOption={filterOption}
                      optionFilterProp="children"
                      options={warehouseItems?.data.map((item) => ({ label: item.title, value: item.id }))}
                    />
                  </Form.Item>
                  <Form.Item label="Количество" name={[field.name, 'quantity']}>
                    <InputNumber />
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Добавить ЗИП
              </Button>
            </div>
          )}
        </Form.List>

        <ButtonGroup>
          <Form.Item>
            <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
              Изменить
            </SubmitButton>
          </Form.Item>
          <BackButton />
        </ButtonGroup>
      </StyledForm>
    </div>
  );
};

const StyledForm = styled(Form)`
  width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 600px;
`;
