import { Button, Form, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

interface SubmitButtonProps {
  form: FormInstance;
  onClick: () => void;
  loading: boolean;
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
  onClick,
  loading,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={onClick} loading={loading}>
      {children}
    </Button>
  );
};
