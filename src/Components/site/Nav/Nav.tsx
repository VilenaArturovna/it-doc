import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Modal, notification } from 'antd';
import { GetInfoAboutOrderForClientRequestDto } from '../../../shared/types/api/generated';
import { useLazyGetInfoAboutOrderQuery } from '../../../app/api';
import { notificationHelper } from '../../../shared/helpers';
import { orderStatusMapper } from '../../../shared/mappers';
import { SubmitButton } from '../../../ui';

export const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<GetInfoAboutOrderForClientRequestDto>();

  const [getInfo, { data, error, isSuccess, isLoading }] = useLazyGetInfoAboutOrderQuery();

  const handleOk = () => {
    const values = form.getFieldsValue();
    getInfo(values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    notificationHelper({
      api,
      error,
      messageSuccess: data
        ? `Заявка ${data.number} находится в статусе "${orderStatusMapper(data.status)}"`
        : undefined,
      isSuccess,
      form,
    });
  }, [api, error, data, isSuccess]);
  return (
    <Root>
      {contextHolder}
      <Container>
        <Menu>
          <MenuItem to={'/'}>Главная</MenuItem>
          <MenuItem to={'/plug'}>Наши предложения</MenuItem>
          <MenuItem to={'/plug'}>Акции</MenuItem>
          <MenuItem to={'/plug'}>Партнерам</MenuItem>
          <MenuItem to={'/plug'}>О нас</MenuItem>
        </Menu>
        <Buttons>
          <SignInButton>
            <MenuItem role={'button'} to={'/login'}>
              Войти
            </MenuItem>
          </SignInButton>
          <OrderButton>
            <MenuItemButton onClick={() => setIsModalOpen(true)}>
              Проверить <br />
              статус заказа
            </MenuItemButton>
          </OrderButton>
        </Buttons>
      </Container>
      {isModalOpen && (
        <Modal
          title="Проверка статуса заявки"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <SubmitButton loading={isLoading} onClick={handleOk} form={form}>
              Отправить
            </SubmitButton>,
          ]}
        >
          <Form form={form}>
            <Form.Item<GetInfoAboutOrderForClientRequestDto>
              label="Номер заказа"
              name="number"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите значение',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<GetInfoAboutOrderForClientRequestDto>
              label="Проверочный код"
              name="checkCode"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите значение',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Root>
  );
};

const Root = styled.nav`
  height: 70px;
  background-color: ${({ theme: { colors } }) => colors.textSecondColor};
`;
const Container = styled.div`
  ${({ theme: { container } }) => container}
  display: flex;
  justify-content: space-between;
`;
const Menu = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;
const MenuItem = styled(Link)`
  color: ${({ theme: { colors } }) => colors.textColor};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25em;
`;
const MenuItemButton = styled.div`
  color: ${({ theme: { colors } }) => colors.textColor};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.25em;
  cursor: pointer;
`;
const Buttons = styled.div`
  height: 100%;
  display: flex;
`;
const StyledButton = styled.div`
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
`;
const SignInButton = styled(StyledButton)`
  background-color: ${({ theme: { colors } }) => colors.btnSecondColor};
`;
const OrderButton = styled(StyledButton)`
  background-color: ${({ theme: { colors } }) => colors.btnColor};
  text-align: center;
`;
