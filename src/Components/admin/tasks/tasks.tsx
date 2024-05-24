import { Button, Table, type TableColumnsType, Tag } from 'antd';
import React, { useCallback, useState } from 'react';
import { GetManyTasksItem, TaskStatus } from '../../../shared/types/api/generated';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DateService } from '../../../shared/services';
import { StyledSpin } from '../../../ui';
import { EmptyComponent } from '../empty';
import { RoutePaths } from '../../../shared/route-paths';
import { useFetchTasksQuery } from '../../../app/api';

enum LegendColors {
  registered = '#cbe8ab',
  in_work = '#fff',
  completed = '#b6ceed',
  not_read = '#f1c7c7',
}

const setBackgroundColor = (isRead: boolean, status: TaskStatus) => {
  return !isRead
    ? LegendColors.not_read
    : status === TaskStatus.Registered
      ? LegendColors.registered
      : status === TaskStatus.InWork
        ? LegendColors.in_work
        : LegendColors.completed;
};

type TaskTableType = GetManyTasksItem;

export const Tasks = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchTasksQuery({ limit: 10, page });

  const columns: TableColumnsType<TaskTableType> = [
    { title: 'Тема', dataIndex: 'theme', key: 'theme' },
    { title: 'Номер', dataIndex: 'number', key: 'number' },
    { title: 'Дедлайн', dataIndex: 'deadline', key: 'deadline' },
  ];

  const navigate = useNavigate();

  const onClick = useCallback(
    (id: string) => {
      navigate(RoutePaths.getTaskRoute(id));
    },
    [navigate],
  );

  return (
    <Root>
      {isLoading && <StyledSpin />}
      {data && !data.data.length && (
        <EmptyComponent createNewTitle={'Добавить задание'} link={RoutePaths.taskNew} />
      )}
      {data?.data.length && (
        <>
          <StyledButton type={'primary'} onClick={() => navigate(RoutePaths.taskNew)}>
            Создать новое задание
          </StyledButton>
          <Table
            columns={columns}
            dataSource={
              data
                ? data.data.map((task: TaskTableType) => ({
                    ...task,
                    key: task.id,
                    deadline: task.deadline ? DateService.format(task.deadline) : undefined,
                  }))
                : []
            }
            size="small"
            onRow={(record) => ({
              style: {
                background: setBackgroundColor(record.isRead, record.status),
              },
              onClick: () => {
                onClick(record.id);
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
          <TagsGroup>
            <StyledTag color={LegendColors.registered}>Новое</StyledTag>
            <StyledTag color={LegendColors.in_work}>В работе</StyledTag>
            <StyledTag color={LegendColors.completed}>Завершено</StyledTag>
            <StyledTag color={LegendColors.not_read}>Не прочитано</StyledTag>
          </TagsGroup>
        </>
      )}
    </Root>
  );
};

const Root = styled.div``;

const TagsGroup = styled.div`
  margin-top: 20px;
`;

const StyledTag = styled(Tag).attrs((props) => ({
  className: props.className,
}))`
  margin-right: 10px;

  &.ant-tag-has-color {
    color: #000;
    border: 1px solid gray;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
