import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  GetManyTasksDaoModel,
  GetManyTasksRequestDto,
  GetOneTaskDaoModel,
  TaskResponseDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery,
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    fetchTasks: builder.query<GetManyTasksDaoModel, GetManyTasksRequestDto>({
      query: (params: GetManyTasksRequestDto) => ({
        url: routes.task.root,
        params,
      }),
      providesTags: (result) => ['Task'],
    }),
    getOneTask: builder.query<GetOneTaskDaoModel, string>({
      query: (id: string) => ({
        url: routes.task.byId(id),
      }),
    }),
    markTaskAsRead: builder.mutation<TaskResponseDto, string>({
      query: (id: string) => ({
        url: routes.task.markAsRead(id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useFetchTasksQuery, useGetOneTaskQuery, useMarkTaskAsReadMutation } = tasksApi;
