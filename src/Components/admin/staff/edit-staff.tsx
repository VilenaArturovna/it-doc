import { CreateStaffRequestDto } from '../../../shared/types/api/generated';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Form, FormInstance, Input, notification } from 'antd';
import { useUpdateStaffMutation } from '../../../app/api';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { BackButton, StyledSpin, SubmitButton } from '../../../ui';
import styled from 'styled-components';
import { useGetMe } from '../../../hooks';

interface FormValues extends Omit<CreateStaffRequestDto, 'birthdate' | 'role' | 'tgId'> {
  birthdate?: Dayjs;
}

export const EditStaff = () => {
  const [form] = Form.useForm<FormValues>();
  const [api, contextHolder] = notification.useNotification();

  const [updateStaff, { isLoading, error, isSuccess }] = useUpdateStaffMutation();
  const { user, isUserLoading, error: fetchError } = useGetMe();

  const onClickSubmit = () => {
    const values = form.getFieldsValue();
    updateStaff({
      ...values,
      birthdate: values.birthdate?.toISOString(),
      phone: `+7${values.phone}`,
      avatar: user?.avatar,
    });
  };

  const initialValues: FormValues | undefined = user
    ? {
        firstname: user.firstname,
        lastname: user.lastname,
        middleName: user.middleName,
        phone: user.phone.slice(2),
        birthdate: user.birthdate ? dayjs(user.birthdate) : undefined,
      }
    : undefined;

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
        messageSuccess: 'Данные обновлены',
      });
  }, [api, isSuccess, error, fetchError]);
  return (
    <Root>
      {contextHolder}
      {isUserLoading && <StyledSpin />}
      {initialValues && (
        <StyledForm layout="vertical" form={form as FormInstance<unknown>} initialValues={initialValues}>
          <Form.Item
            name="lastname"
            label="Фамилия"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите значение',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstname"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите значение',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="middleName"
            label="Отчество"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите значение',
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

          <Form.Item label="Дата рождения" name="birthdate">
            <DatePicker format={'D MMM YYYY'} maxDate={dayjs().subtract(18, 'year')} />
          </Form.Item>

          <ButtonGroup>
            <Form.Item>
              <SubmitButton form={form} onClick={onClickSubmit} loading={isLoading}>
                Изменить
              </SubmitButton>
            </Form.Item>
            <BackButton />
          </ButtonGroup>
        </StyledForm>
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
  width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;
`;
