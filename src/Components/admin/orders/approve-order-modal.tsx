import { useApprovedOrderMutation } from '../../../app/api';
import { DatePicker, Form, Modal, notification, Space } from 'antd';
import { OrderStatus } from '../../../shared/types/api/generated';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';

type FormValues = {
  deadline: Dayjs;
};

type Props = {
  isModalOpen: boolean;
  orderId: string;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const ApproveOrderModal = ({ orderId, setIsModalOpen, isModalOpen }: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<FormValues>();

  const [approve, { isSuccess, error }] = useApprovedOrderMutation();

  const handleOk = () => {
    const values = form.getFieldsValue();

    approve({
      id: orderId,
      body: {
        deadlineDate: values.deadline?.toISOString(),
        status: values.deadline ? OrderStatus.ApprovedAndSparePartIsOrdered : OrderStatus.Approved,
      },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (isSuccess !== undefined || error) && notificationHelper({ api, error, isSuccess });
  }, [api, error, isSuccess]);

  return (
    <div>
      {contextHolder}
      <Modal title="Подтверждение заявки" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form}>
          <Space style={{ marginBottom: '20px' }}>
            Проставьте дату поставки ЗИП при необходимости. При отсутствии даты поставки заявка будет
            подтверждена автоматически
          </Space>
          <Form.Item<FormValues> name="deadline">
            <DatePicker format={'D MMM YYYY HH:mm'} minDate={dayjs()} showTime={{ format: 'HH:mm' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
