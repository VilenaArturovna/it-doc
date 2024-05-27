import { useFetchDeadlinesQuery } from '../../../app/api';
import { GetAllDeadlinesDaoModel } from '../../../shared/types/api/generated';
import { Button, notification, Table, TableProps } from 'antd';
import { orderStatusMapper } from '../../../shared/mappers';
import { StyledSpin } from '../../../ui';
import { useEffect, useState } from 'react';
import { notificationHelper } from '../../../shared/helpers';
import { TimeParseService } from '../../../shared/services';
import { UpdateDeadline } from './update-deadline';

interface ColumnsType extends Pick<GetAllDeadlinesDaoModel, 'id'> {
  name: string;
  normal: string;
  urgent: string;
}

export const Deadlines = () => {
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading: fetchLoading, error: fetchError } = useFetchDeadlinesQuery(undefined);

  const [deadline, setDeadline] = useState<GetAllDeadlinesDaoModel | null>(null);
  const onClickUpdate = (id: string) => {
    const currentDeadline = data!.find((d) => d.id === id)!;
    setDeadline(() => currentDeadline);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: TableProps<ColumnsType>['columns'] = [
    {
      title: 'Статус',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Обычный',
      dataIndex: 'normal',
      key: 'normal',
    },
    {
      title: 'Срочный',
      dataIndex: 'urgent',
      key: 'urgent',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Button size="small" onClick={() => onClickUpdate(record.id)}>
          Изменить
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchError && notificationHelper({ api, error: fetchError });
  }, [api, fetchError]);

  return (
    <>
      {contextHolder}
      {fetchLoading && <StyledSpin />}
      {data && (
        <Table
          pagination={false}
          columns={columns}
          dataSource={data.map((item) => ({
            ...item,
            name: orderStatusMapper(item.name),
            urgent: TimeParseService.toHoursAndMinutesString(item.urgent),
            normal: TimeParseService.toHoursAndMinutesString(item.normal),
          }))}
        />
      )}
      {isModalOpen && deadline && (
        <UpdateDeadline setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} deadline={deadline} />
      )}
    </>
  );
};
