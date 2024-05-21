import { useFetchTasksQuery } from '../../../app/api/tasks-api';
import { Spin, Table, type TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { GetManyTasksItem } from '../../../shared/types/api/generated';
import styled from 'styled-components';
import { Task } from './task';

type TaskTableType = GetManyTasksItem;

export const Tasks = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchTasksQuery({ limit: 10, page });

  const columns: TableColumnsType<TaskTableType> = [
    { title: 'Тема', dataIndex: 'theme', key: 'theme' },
    { title: 'Номер', dataIndex: 'number', key: 'number' },
    { title: 'Дедлайн', dataIndex: 'deadline', key: 'deadline' },
  ];

  const [showTask, setShowTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const onClickTask = (id: string) => {
    setTaskId(id);
    setShowTask(true);
  };

  const onClose = () => {
    setShowTask(false);
    setTaskId(null);
  };

  return (
    <Root>
      {isLoading && <StyledSpin size={'large'} />}
      {data?.data.length && (
        <Table
          columns={columns}
          dataSource={data ? data.data.map((task: TaskTableType) => ({ ...task, key: task.id })) : []}
          size="small"
          onRow={(record) => ({
            style: {
              background: !record.isRead ? '#df8555' : 'default',
            },
            onClick: () => {
              onClickTask(record.id);
            },
          })}
          pagination={{
            total: data?.total || 0,
            pageSize: data?.limit || 1,
            current: data?.page || 1,
            onChange: (page) => {
              setPage(page);
            },
          }}
        />
      )}
      {showTask && taskId && <Task id={taskId} onClose={onClose} open={showTask} />}
    </Root>
  );
};

const Root = styled.div`
  display: block;
  max-width: 100%;
  padding: 20px;
`;

const StyledSpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
