import React, { useEffect, useState } from 'react';
import { Button, Descriptions, DescriptionsProps, Input, Modal, notification, Popconfirm, Table } from 'antd';
import {
  useAddCommentToTaskMutation,
  useCompleteTaskMutation,
  useGetOneTaskQuery,
  useMarkTaskAsReadMutation,
  useRemoveTaskMutation,
  useTakeToWorkTaskMutation,
} from '../../../app/api';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { taskStatusMapper } from '../../../shared/mappers';
import { DateService } from '../../../shared/services';
import { TaskStatus } from '../../../shared/types/api/generated';
import { RoutePaths } from '../../../shared/route-paths';
import { useGetMe } from '../../../hooks';
import { notificationHelper } from '../../../shared/helpers';
import { BackButton, StyledSpin } from '../../../ui';

export const Task = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('id is required');

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading, error } = useGetOneTaskQuery(id);
  const [markAsRead] = useMarkTaskAsReadMutation();
  const [complete] = useCompleteTaskMutation();
  const [takeToWork] = useTakeToWorkTaskMutation();
  const [addComment] = useAddCommentToTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState<string | null>(null);

  const handleOk = () => {
    setIsModalOpen(false);
    comment?.trim() && addComment({ id, body: { comment } });
    setComment(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setComment(null);
  };

  const title = `Задание ${data ? data.number : ''}`;
  const author = data?.participants.find((p) => p.isAuthor);

  const takeToWorkHandle = () => {
    takeToWork(id);
  };
  const editHandle = () => navigate(RoutePaths.getEditTaskRoute(id));
  const completeHandle = () => {
    complete(id);
  };
  const addCommentHandle = () => {
    setIsModalOpen(true);
  };
  const removeHandle = () => {
    removeTask(id);
    navigate(-1);
  };

  const descriptionsItems: DescriptionsProps['items'] = data
    ? [
        {
          key: '1',
          label: 'Тема',
          children: data.theme,
        },
        {
          key: '2',
          label: 'Создано',
          children: DateService.format(data.createdAt),
        },
        {
          key: '7',
          label: 'Обновлено',
          children: DateService.format(data.updatedAt),
        },
        {
          key: '3',
          label: 'Описание',
          children: data.description,
        },
        {
          key: '4',
          label: 'Дедлайн',
          children: data.deadline ? DateService.format(data.deadline) : '-',
        },
        {
          key: '5',
          label: 'Стоимость',
          children: data.price ? data.price + '\u20bd' : '-',
        },
        {
          key: '6',
          label: 'Статус',
          children: taskStatusMapper(data.status),
        },
        {
          key: '8',
          label: 'Выдал',
          children: author ? `${author!.staff.lastname} ${author!.staff.firstname}` : 'Неизвестно',
        },
      ]
    : [];

  const tableColumns = [
    { key: 'name', dataIndex: 'name', title: 'Имя' },
    { key: 'isResponsible', dataIndex: 'isResponsible', title: 'Ответственный' },
    { key: 'comment', dataIndex: 'comment', title: 'Комментарий' },
  ];

  const { user } = useGetMe();
  const isAuthor = data?.participants.find((p) => p.staff.id === user?.id)?.isAuthor;
  const isResponsible = Boolean(data?.participants.find((p) => p.staff.id === user?.id)?.isResponsible);
  const hasResponsible = Boolean(data?.participants.filter((p) => p.isResponsible).length);

  useEffect(() => {
    if (data && user) {
      const isRead = data.participants.find((p) => p.staff.id === user.id)?.isRead;
      !isRead && markAsRead(data.id);
    }
  }, [data, id, markAsRead, user]);
  useEffect(() => {
    notificationHelper({ api, error });
  }, [api, error]);

  return (
    <div>
      {contextHolder}
      {isLoading && <StyledSpin />}
      {data && (
        <>
          <StyledDescription
            items={descriptionsItems}
            column={1}
            bordered={true}
            title={title}
            size={'small'}
          />
          {data.participants && (
            <Table
              columns={tableColumns}
              dataSource={data.participants.map((p) => ({
                key: p.staff.id,
                name: p.staff.lastname + ' ' + p.staff.firstname,
                isResponsible: p.isResponsible ? 'Да' : undefined,
                comment: p.comment,
              }))}
              size={'small'}
              pagination={false}
            />
          )}
          <ButtonGroup>
            <div>
              {((hasResponsible && isResponsible) || !hasResponsible) &&
                data.status === TaskStatus.Registered && (
                  <StyledButton onClick={takeToWorkHandle} type="primary">
                    Взять в работу
                  </StyledButton>
                )}
              {isResponsible && data.status === TaskStatus.InWork && (
                <StyledButton onClick={completeHandle} type="primary">
                  Завершить
                </StyledButton>
              )}
              {isAuthor && data.status !== TaskStatus.Completed && (
                <StyledButton onClick={editHandle} type="primary">
                  Изменить
                </StyledButton>
              )}
              {data.status !== TaskStatus.Completed && (
                <StyledButton onClick={addCommentHandle} type="primary">
                  Оставить комментарий
                </StyledButton>
              )}
              {isAuthor && data.status !== TaskStatus.Completed && (
                <Popconfirm
                  title="Удаление задания"
                  description="Вы уверены, что хотите удалить задание?"
                  onConfirm={removeHandle}
                  okText="Да"
                  cancelText="Нет"
                >
                  <StyledButton danger>Удалить</StyledButton>
                </Popconfirm>
              )}
            </div>
            <BackButton />
          </ButtonGroup>
        </>
      )}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder={'Комментарий'} onChange={(e) => setComment(e.target.value)} />
      </Modal>
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
