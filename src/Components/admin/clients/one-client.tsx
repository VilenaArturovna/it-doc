import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, DescriptionsProps, notification, Popconfirm } from 'antd';
import { useRemoveClientMutation, useGetOneClientQuery } from '../../../app/api';
import { BackButton, StyledSpin } from '../../../ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RoutePaths } from '../../../shared/route-paths';
import { notificationHelper } from '../../../shared/helpers';
import { GetOneClientDaoModel } from '../../../shared/types/api/generated';

const getDescriptions = (data: GetOneClientDaoModel) => [
  {
    key: '1',
    label: 'Название/имя',
    children: data.name,
  },
  {
    key: '2',
    label: 'Полное наименование',
    children: data.fullName,
  },
  {
    key: '3',
    label: 'Телефон',
    children: data.phone,
  },
  {
    key: '4',
    label: 'Вид',
    children: data.type === 'LEGAL_PERSON' ? 'Юридическое лицо' : 'Физическое лицо',
  },
  {
    key: '5',
    label: 'Юридический адрес',
    children: data.legalAddress,
  },
  {
    key: '6',
    label: 'Фактический адрес',
    children: data.actualAddress,
  },
  {
    key: '7',
    label: 'Выгодоприобретатель',
    children: data.beneficiary === 'IP' ? 'ИП' : 'ООО',
  },
  {
    key: '8',
    label: 'ИНН',
    children: data.INN,
  },
  {
    key: '9',
    label: 'КПП',
    children: data.KPP,
  },
  {
    key: '10',
    label: 'ОГРН',
    children: data.OGRN,
  },
  {
    key: '11',
    label: 'БИК',
    children: data.BIK,
  },
  {
    key: '12',
    label: 'Платежный счет',
    children: data.paymentAccount,
  },
  {
    key: '13',
    label: 'Корреспондентский счет',
    children: data.correspondentAccount,
  },
  {
    key: '14',
    label: 'Директор',
    children: data.directorName,
  },
  {
    key: '15',
    label: 'Адрес электронной почты',
    children: data.email,
  },
  {
    key: '16',
    label: 'Контактное лицо',
    children: data.contactPerson
      ? `${data.contactPerson}${data.contactPersonPhone ? ', тел.: ' + data.contactPersonPhone : ''}`
      : '',
  },
];

export const OneClient = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading: isLoadingFetch, error: fetchError } = useGetOneClientQuery(id);
  const [deleteClient, { isSuccess, error: deleteError, isLoading: isLoadingDelete }] =
    useRemoveClientMutation();

  const descriptionsItems: DescriptionsProps['items'] = data ? getDescriptions(data) : [];

  const editHandle = () => navigate(RoutePaths.getEditClientRoute(id));
  const removeHandle = () => {
    deleteClient(id);
  };

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
    (deleteError || isSuccess) &&
      fetchError &&
      notificationHelper({ api, error: deleteError, isSuccess, messageSuccess: 'Клиент удален' });
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
                  title="Удаление клиента"
                  description="Вы уверены, что хотите удалить клиента?"
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
