import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, notification, Popconfirm } from 'antd';
import { useDeleteWorkMutation, useGetOneWorkQuery } from '../../../app/api';
import { BackButton, StyledSpin } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RoutePaths } from '../../../shared/route-paths';
import { notificationHelper } from '../../../shared/helpers';
import { TimeParseService } from '../../../shared/services';

export const OneWork = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneWorkQuery(id);
  const [deleteWork, { isSuccess, error: deleteError, isLoading: isLoadingDelete }] = useDeleteWorkMutation();

  const descriptionsItems: DescriptionsProps['items'] = data
    ? [
        {
          key: '1',
          label: 'Вид',
          children: data.name,
        },
        {
          key: '2',
          label: 'Время',
          children: TimeParseService.toHoursAndMinutesString(data.time),
        },
        {
          key: '1',
          label: 'Стоимость',
          children: data.price + '₽',
        },
      ]
    : [];

  const editHandle = () => navigate(RoutePaths.getEditWorkRoute(id));
  const removeHandle = () => {
    deleteWork(id);
  };

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
    (deleteError || isSuccess) &&
      fetchError &&
      notificationHelper({ api, error: deleteError, isSuccess, messageSuccess: 'Вид работ удален' });
    isSuccess && navigate(-1);
  }, [api, fetchError, deleteError, isSuccess]);

  return (
    <div>
      {contextHolder}
      {isLoadingFetch && <StyledSpin />}
      {data && (
        <>
          <StyledDescription items={descriptionsItems} column={1} bordered={true} size={'small'} />
          <ButtonGroup>
            <div>
              {
                <StyledButton onClick={editHandle} type="primary">
                  Изменить
                </StyledButton>
              }

              {
                <Popconfirm
                  title="Удаление вида работ"
                  description="Вы уверены, что хотите удалить вид работ?"
                  onConfirm={removeHandle}
                  okText="Да"
                  cancelText="Нет"
                >
                  <StyledButton danger loading={isLoadingDelete}>
                    Удалить
                  </StyledButton>
                </Popconfirm>
              }
            </div>
            <BackButton />
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

const StyledDescription = styled(Descriptions)`
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;
