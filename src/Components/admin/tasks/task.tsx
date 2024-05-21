import React, { useEffect } from 'react';
import { Descriptions, DescriptionsProps, Drawer, Spin } from 'antd';
import { useGetOneTaskQuery, useMarkTaskAsReadMutation } from '../../../app/api/tasks-api';

type PropsType = {
  id: string;
  onClose: () => void;
  open: boolean;
};

export const Task = ({ id, onClose, open }: PropsType) => {
  const { data, isLoading, error } = useGetOneTaskQuery(id);
  const title = `Задание ${data ? data.number : ''}`;

  const [markAsRead] = useMarkTaskAsReadMutation();

  useEffect(() => {
    if (data) {
      markAsRead(data.id);
    }
  }, [data, id, markAsRead]);

  const items: DescriptionsProps['items'] = data
    ? [
        {
          key: '1',
          label: 'Тема',
          children: data.theme,
        },
        {
          key: '2',
          label: 'Создана',
          children: data.createdAt,
        },
        {
          key: '7',
          label: 'Updated',
          children: data.createdAt,
        },
        {
          key: '3',
          label: 'Описание',
          children: data.deadline,
        },
        {
          key: '4',
          label: 'Дедлайн',
          children: data.deadline,
        },
        {
          key: '5',
          label: 'Стоимость',
          children: data.price ?? '-',
        },
        {
          key: '6',
          label: 'Status',
          children: data.status,
        },
      ]
    : [];

  return (
    <div>
      <Drawer title={title} onClose={onClose} open={open} size={'large'}>
        {isLoading && <Spin />}
        {data && <Descriptions items={items} column={1} />}
        {error && (
          // @ts-ignore
          <p>{error.data.message}</p>
        )}
      </Drawer>
    </div>
  );
};
