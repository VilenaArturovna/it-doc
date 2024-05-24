import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import { GetManyStaffDaoModel, GetManyStaffRequestDto } from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';

export const staffApi = createApi({
  baseQuery,
  reducerPath: 'staffApi',
  tagTypes: ['Staff'],
  endpoints: (builder) => ({
    fetchStaff: builder.query<GetManyStaffDaoModel, GetManyStaffRequestDto>({
      query: (params: GetManyStaffRequestDto) => ({
        url: routes.staff.root,
        params,
      }),
      providesTags: () => ['Staff'],
    }),
  }),
});

export const { useFetchStaffQuery } = staffApi;
