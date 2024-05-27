import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  CreateWorkRequestDto,
  GetManyWorksDaoModel,
  GetManyWorksRequestDto,
  GetOneWorkDaoModel,
  WorkResponseDto,
  UpdateWorkRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const worksApi = createApi({
  baseQuery,
  reducerPath: 'worksApi',
  tagTypes: ['Works', 'Work'],
  endpoints: (builder) => ({
    fetchWorks: builder.query<GetManyWorksDaoModel, GetManyWorksRequestDto>({
      query: (params: GetManyWorksRequestDto) => ({
        url: routes.work.root,
        params,
      }),
      providesTags: () => ['Works'],
    }),
    getOneWork: builder.query<GetOneWorkDaoModel, string>({
      query: (id: string) => ({
        url: routes.work.byId(id),
      }),
      providesTags: () => ['Work'],
    }),
    createWork: builder.mutation<WorkResponseDto, CreateWorkRequestDto>({
      query: (params: CreateWorkRequestDto) => ({
        url: routes.work.root,
        body: params,
        method: HTTPMethods.post,
      }),
      invalidatesTags: () => ['Works'],
    }),
    updateWork: builder.mutation<WorkResponseDto, { id: string; body: UpdateWorkRequestDto }>({
      query: (arg) => ({
        url: routes.work.byId(arg.id),
        body: arg.body,
        method: HTTPMethods.patch,
      }),
      invalidatesTags: () => ['Works', 'Work'],
    }),
    deleteWork: builder.mutation<void, string>({
      query: (id: string) => ({
        url: routes.work.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: () => ['Works'],
    }),
  }),
});

export const {
  useCreateWorkMutation,
  useDeleteWorkMutation,
  useFetchWorksQuery,
  useGetOneWorkQuery,
  useUpdateWorkMutation,
} = worksApi;
