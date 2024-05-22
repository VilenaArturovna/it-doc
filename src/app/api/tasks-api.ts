import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  AddCommentToTaskRequestDto,
  CreateTaskRequestDto,
  GetManyTasksDaoModel,
  GetManyTasksRequestDto,
  GetOneTaskDaoModel,
  TaskResponseDto,
  UpdateTaskRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery,
  tagTypes: ['Task', 'Tasks'],
  endpoints: (builder) => ({
    fetchTasks: builder.query<GetManyTasksDaoModel, GetManyTasksRequestDto>({
      query: (params: GetManyTasksRequestDto) => ({
        url: routes.task.root,
        params,
      }),
      providesTags: () => ['Tasks'],
    }),
    getOneTask: builder.query<GetOneTaskDaoModel, string>({
      query: (id: string) => ({
        url: routes.task.byId(id),
      }),
      providesTags: () => ['Task'],
    }),
    markTaskAsRead: builder.mutation<TaskResponseDto, string>({
      query: (id: string) => ({
        url: routes.task.markAsRead(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation<TaskResponseDto, string>({
      query: (id: string) => ({
        url: routes.task.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<TaskResponseDto, { id: string; body: UpdateTaskRequestDto }>({
      query: (arg) => ({
        url: routes.task.byId(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Task'],
    }),
    createTask: builder.mutation<TaskResponseDto, CreateTaskRequestDto>({
      query: (body: CreateTaskRequestDto) => ({
        url: routes.task.root,
        method: HTTPMethods.post,
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    completeTask: builder.mutation<TaskResponseDto, string>({
      query: (id: string) => ({
        url: routes.task.complete(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Task'],
    }),
    takeToWorkTask: builder.mutation<TaskResponseDto, string>({
      query: (id: string) => ({
        url: routes.task.takeToWork(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Task'],
    }),
    addCommentToTask: builder.mutation<TaskResponseDto, { id: string; body: AddCommentToTaskRequestDto }>({
      query: (arg) => ({
        url: routes.task.addComment(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useGetOneTaskQuery,
  useMarkTaskAsReadMutation,
  useAddCommentToTaskMutation,
  useCompleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
  useTakeToWorkTaskMutation,
} = tasksApi;
