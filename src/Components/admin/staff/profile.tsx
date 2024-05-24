import { useGetMe } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { RoutePaths } from '../../../shared/route-paths';
import React, { useEffect } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { BackButton, StyledSpin } from '../../../ui';
import { StaffDescriptions } from './staff-descriptions';
import styled from 'styled-components';

export const Profile = () => {
  const { user, isUserLoading, error } = useGetMe();

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const editHandle = () => navigate(RoutePaths.getEditStaffRoute(user!.id));

  useEffect(() => {
    error && notificationHelper({ api, error });
  }, [api, error]);
  return (
    <div>
      {contextHolder}
      {isUserLoading && <StyledSpin />}
      {user && (
        <>
          <StaffDescriptions user={user} />
          <ButtonGroup>
            <Button onClick={editHandle} type="primary">
              Изменить
            </Button>
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
