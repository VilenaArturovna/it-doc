import { Form, InputNumber, Modal, notification, Space } from 'antd';
import { GetAllDeadlinesDaoModel } from '../../../shared/types/api/generated';
import { DeadlineParseService } from '../../../shared/services';
import { useUpdateDeadlineMutation } from '../../../app/api';
import { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';

type FormValues = {
  normalHours: number;
  normalMinutes: number;
  urgentHours: number;
  urgentMinutes: number;
};

type Props = {
  isModalOpen: boolean;
  deadline: GetAllDeadlinesDaoModel;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const UpdateDeadline = ({ deadline, isModalOpen, setIsModalOpen }: Props) => {
  const [updateDeadline, { isSuccess, error: updateError }] = useUpdateDeadlineMutation();

  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<FormValues>();

  const { hours: normalHours, minutes: normalMinutes } = DeadlineParseService.toHoursAndMinutes(
    deadline.normal,
  );
  const { hours: urgentHours, minutes: urgentMinutes } = DeadlineParseService.toHoursAndMinutes(
    deadline.urgent,
  );

  const initialValues = {
    normalHours,
    normalMinutes,
    urgentHours,
    urgentMinutes,
  };

  const handleOk = () => {
    const values = form.getFieldsValue();
    const normal = +DeadlineParseService.toMinutes({
      hours: values.normalHours,
      minutes: values.normalMinutes,
    });
    const urgent = +DeadlineParseService.toMinutes({
      hours: values.urgentHours,
      minutes: values.urgentMinutes,
    });

    updateDeadline({ id: deadline.id, body: { urgent, normal } });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (isSuccess !== undefined || updateError) && notificationHelper({ api, error: updateError, isSuccess });
  }, [api, updateError, isSuccess]);

  return (
    <div>
      {contextHolder}
      <Modal title="Изменение дедлайна" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form initialValues={initialValues} form={form}>
          <Form.Item label={'Обычный'} required={true}>
            <Form.Item
              name="normalHours"
              rules={[{ required: true, message: 'Введите часы' }]}
              style={{ display: 'inline-block', width: '20%', marginRight: '8px' }}
            >
              <InputNumber placeholder="Часы" min={0} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '10px' }}>ч</Space>
            <Form.Item
              name="normalMinutes"
              rules={[{ required: true, message: 'Введите минуты' }]}
              style={{ display: 'inline-block', width: '20%', margin: '0 8px' }}
            >
              <InputNumber placeholder="Минуты" min={0} max={59} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '10px' }}>мин</Space>
          </Form.Item>
          <Form.Item label={'Срочный'} required={true}>
            <Form.Item
              name="urgentHours"
              rules={[{ required: true, message: 'Введите часы' }]}
              style={{ display: 'inline-block', width: '20%', marginRight: '8px' }}
            >
              <InputNumber placeholder="Часы" min={0} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '10px' }}>ч</Space>
            <Form.Item
              name="urgentMinutes"
              rules={[{ required: true, message: 'Введите минуты' }]}
              style={{ display: 'inline-block', width: '20%', margin: '0 8px' }}
            >
              <InputNumber placeholder="Минуты" min={0} max={59} />
            </Form.Item>
            <Space style={{ height: '32px', marginLeft: '10px' }}>мин</Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
