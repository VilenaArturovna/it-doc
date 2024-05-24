import { NotificationInstance } from 'antd/lib/notification/interface';
import { FormInstance } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type Props = {
  api: NotificationInstance;
  messageSuccess?: string;
  descriptionSuccess?: string;
  isSuccess?: boolean;
  error?: any;
  form?: FormInstance;
};

export const notificationHelper = (props: Props) => {
  const openNotification = (type: NotificationType, message: string, description?: string) => {
    props.api[type]({
      message,
      description,
    });
  };

  if (props.isSuccess && props.messageSuccess) {
    props.form && props.form.resetFields();
    openNotification('success', props.messageSuccess);
  }
  if (props.error) {
    openNotification('error', 'Произошла ошибка', props.error.data.message);
  }
};
