import { useParams } from 'react-router-dom';
import { Checkbox, Form, Input, InputNumber, notification, Select, Space } from 'antd';
import { useFetchStaffQuery, useGetOneOrderQuery, useUpdateOrderMutation } from '../../../app/api';
import {
  Beneficiary,
  CreateOrderRequestDto,
  UpdateOrderRequestDto,
} from '../../../shared/types/api/generated';
import { BackButton, StyledSpin, SubmitButton } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TimeParseService } from '../../../shared/services';
import { notificationHelper } from '../../../shared/helpers';

type FormValues = Omit<UpdateOrderRequestDto, 'deadline' | 'price'> & {
  hours?: number;
  minutes?: number;
  price?: number;
};

export const EditOrder = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const [form] = Form.useForm<FormValues>();
  const [api, contextHolder] = notification.useNotification();

  const { data: staff, isLoading: loadingStaff } = useFetchStaffQuery({
    page: 1,
    limit: 100,
    isActive: true,
  });
  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneOrderQuery(id);
  const [updateOrder, { isLoading: isLoadingUpdate, error: updateError, isSuccess }] =
    useUpdateOrderMutation();

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    const deadline =
      values.hours && values.minutes
        ? +TimeParseService.toMinutes({
            hours: +values.hours,
            minutes: +values.minutes,
          })
        : undefined;
    updateOrder({
      id,
      body: {
        ...values,
        deadline,
        price: values.price?.toString(),
      },
    });
  };

  const deadlineMinutes =
    (data?.deadline ? new Date(data.deadline).getTime() - new Date().getTime() : 0) / 1000 / 60;

  const initialValues: FormValues = data
    ? {
        ...data,
        hours: TimeParseService.toHoursAndMinutes(deadlineMinutes).hours,
        minutes: TimeParseService.toHoursAndMinutes(deadlineMinutes).minutes,
        price: +data.price,
      }
    : {};

  useEffect(() => {
    fetchError &&
      notificationHelper({
        api,
        error: fetchError,
      });
    (isSuccess || updateError) &&
      notificationHelper({
        api,
        isSuccess,
        error: updateError,
        messageSuccess: 'Заявка успешно изменена',
      });
  }, [api, isSuccess, updateError, fetchError]);

  return (
    <Root>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      {data ? (
        <StyledForm form={form} initialValues={initialValues}>
          <Form.Item<FormValues> name="price" label="Стоимость">
            <Input addonAfter="&#8381;" />
          </Form.Item>
          <Form.Item<FormValues> name="comment" label="Комментарий">
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="Выгодоприобретатель" name="beneficiary">
            <Select>
              <Select.Option value={Beneficiary.Ip}>ИП</Select.Option>
              <Select.Option value={Beneficiary.Ooo}>ООО</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<CreateOrderRequestDto> label="Ответственный" name="responsibleStaffId">
            <Select loading={loadingStaff}>
              {staff?.data.map((item) => (
                <Select.Option value={item.id}>{`${item.firstname} ${item.lastname}`}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label={'Дедлайн'}>
            <Form.Item
              name="hours"
              rules={[{ required: Boolean(form.getFieldsValue().minutes), message: 'Введите часы' }]}
              style={{ display: 'inline-block', width: '20%', marginRight: '8px' }}
            >
              <InputNumber placeholder="Часы" min={0} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '20px' }}>ч</Space>
            <Form.Item
              name="minutes"
              rules={[{ required: Boolean(form.getFieldsValue().hours), message: 'Введите минуты' }]}
              style={{ display: 'inline-block', width: '20%', margin: '0 8px' }}
            >
              <InputNumber placeholder="Минуты" min={0} max={59} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '20px' }}>мин</Space>
          </Form.Item>
          <Form.Item<FormValues> name="isPaid" valuePropName="checked">
            <Checkbox defaultChecked={false}>Оплачено</Checkbox>
          </Form.Item>
          <ButtonGroup>
            <Form.Item>
              <SubmitButton form={form} onClick={onClickSubmit} loading={isLoadingUpdate}>
                Изменить
              </SubmitButton>
            </Form.Item>
            <BackButton />
          </ButtonGroup>
        </StyledForm>
      ) : (
        ''
      )}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledForm = styled(Form)`
  width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 600px;
`;
