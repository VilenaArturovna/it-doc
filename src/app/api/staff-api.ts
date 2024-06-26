import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  CreateStaffRequestDto,
  GetManyStaffDaoModel,
  GetManyStaffItem,
  GetManyStaffRequestDto,
  LoginViaTgRequestDto,
  LoginViaTgResponseDto,
  StaffGetMeDaoModel,
  StaffResponseDto,
  UpdateStaffRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const staffApi = createApi({
  baseQuery,
  reducerPath: 'staffApi',
  tagTypes: ['Staff', 'OneStaff', 'GetMe'],
  endpoints: (builder) => ({
    fetchStaff: builder.query<GetManyStaffDaoModel, GetManyStaffRequestDto>({
      query: (params: GetManyStaffRequestDto) => ({
        url: routes.staff.root,
        params,
      }),
      providesTags: () => ['Staff'],
    }),
    getOneStaff: builder.query<GetManyStaffItem, string>({
      query: (id: string) => ({
        url: routes.staff.byId(id),
      }),
      providesTags: () => ['OneStaff'],
    }),
    createStaff: builder.mutation<StaffResponseDto, CreateStaffRequestDto>({
      query: (params: CreateStaffRequestDto) => ({
        url: routes.staff.root,
        body: params,
        method: HTTPMethods.post,
      }),
      invalidatesTags: ['Staff'],
    }),
    updateStaff: builder.mutation<StaffResponseDto, UpdateStaffRequestDto>({
      query: (body) => ({
        url: routes.staff.root,
        body,
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Staff', 'OneStaff', 'GetMe'],
    }),
    removeStaff: builder.mutation<StaffResponseDto, string>({
      query: (id: string) => ({
        url: routes.staff.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: ['Staff'],
    }),
    getMe: builder.query<StaffGetMeDaoModel, undefined>({
      query: () => ({
        url: routes.staff.getMe,
      }),
      providesTags: () => ['GetMe'],
    }),
    login: builder.mutation<LoginViaTgResponseDto, LoginViaTgRequestDto>({
      query: (params: LoginViaTgRequestDto) => ({
        url: routes.staff.auth.login,
        method: HTTPMethods.patch,
        body: params,
      }),
    }),
  }),
});

export const {
  useFetchStaffQuery,
  useCreateStaffMutation,
  useGetMeQuery,
  useGetOneStaffQuery,
  useLoginMutation,
  useRemoveStaffMutation,
  useUpdateStaffMutation,
} = staffApi;
