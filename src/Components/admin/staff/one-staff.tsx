import { useNavigate, useParams } from 'react-router-dom';
import { Button, notification, Popconfirm } from 'antd';
import { useGetOneStaffQuery, useRemoveStaffMutation } from '../../../app/api';
import { BackButton, StyledSpin } from '../../../ui';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import styled from 'styled-components';
import { StaffDescriptions } from './staff-descriptions';

export const OneStaff = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data: staff, isLoading: fetchLoading, error: fetchError } = useGetOneStaffQuery(id);
  const [removeStaff, { error: removeError }] = useRemoveStaffMutation();

  const removeHandle = () => {
    removeStaff(id);
    navigate(-1);
  };

  useEffect(() => {
    removeError && notificationHelper({ api, error: removeError });
    fetchError && notificationHelper({ api, error: fetchError });
  }, [api, fetchError, removeError]);

  return (
    <div>
      {contextHolder}
      {fetchLoading && <StyledSpin />}
      {staff && (
        <>
          <StaffDescriptions user={staff} />
          <ButtonGroup>
            <Popconfirm
              title="Удаление сотрудника"
              description="Вы уверены, что хотите удалить сотрудника?"
              onConfirm={removeHandle}
              okText="Да"
              cancelText="Нет"
            >
              <StyledButton danger>Удалить</StyledButton>
            </Popconfirm>
            <BackButton />
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

const ButtonGroup = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;
