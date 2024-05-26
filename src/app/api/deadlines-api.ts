import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  DeadlineResponseDto,
  GetAllDeadlinesDaoModel,
  UpdateDeadlineRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const deadlinesApi = createApi({
  baseQuery,
  reducerPath: 'deadlinesApi',
  tagTypes: ['Deadlines'],
  endpoints: (builder) => ({
    fetchDeadlines: builder.query<GetAllDeadlinesDaoModel[], undefined>({
      query: () => ({
        url: routes.deadline.root,
      }),
      providesTags: () => ['Deadlines'],
    }),
    updateDeadline: builder.mutation<DeadlineResponseDto, { body: UpdateDeadlineRequestDto; id: string }>({
      query: (arg) => ({
        url: routes.deadline.byId(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Deadlines'],
    }),
  }),
});

export const { useFetchDeadlinesQuery, useUpdateDeadlineMutation } = deadlinesApi;
