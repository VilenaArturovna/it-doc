import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, notification, Popconfirm } from 'antd';
import { useDeleteVendorMutation, useGetOneVendorQuery } from '../../../app/api';
import { BackButton, StyledSpin } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RoutePaths } from '../../../shared/route-paths';
import { notificationHelper } from '../../../shared/helpers';

export const OneVendor = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneVendorQuery(id);
  const [deleteVendor, { isSuccess, error: deleteError, isLoading: isLoadingDelete }] =
    useDeleteVendorMutation();

  const descriptionsItems: DescriptionsProps['items'] = data
    ? [
        {
          key: '1',
          label: 'Название',
          children: data.title,
        },
        {
          key: '2',
          label: 'Описание',
          children: data.description,
        },
      ]
    : [];

  const editHandle = () => navigate(RoutePaths.getEditVendorRoute(id));
  const removeHandle = () => {
    deleteVendor(id);
  };

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
    (deleteError || isSuccess) &&
      fetchError &&
      notificationHelper({ api, error: deleteError, isSuccess, messageSuccess: 'Вендор удален' });
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
                  title="Удаление вендора"
                  description="Вы уверены, что хотите удалить вендора?"
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
