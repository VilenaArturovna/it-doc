import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  CreateProviderRequestDto,
  GetManyProvidersDaoModel,
  GetManyProvidersRequestDto,
  GetOneProviderDaoModel,
  ProviderResponseDto,
  UpdateProviderRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const providersApi = createApi({
  baseQuery,
  reducerPath: 'providersApi',
  tagTypes: ['Providers', 'Provider'],
  endpoints: (builder) => ({
    fetchProviders: builder.query<GetManyProvidersDaoModel, GetManyProvidersRequestDto>({
      query: (params: GetManyProvidersRequestDto) => ({
        url: routes.provider.root,
        params,
      }),
      providesTags: () => ['Providers'],
    }),
    getOneProvider: builder.query<GetOneProviderDaoModel, string>({
      query: (id: string) => ({
        url: routes.provider.byId(id),
      }),
      providesTags: () => ['Provider'],
    }),
    createProvider: builder.mutation<ProviderResponseDto, CreateProviderRequestDto>({
      query: (params: CreateProviderRequestDto) => ({
        url: routes.provider.root,
        body: params,
        method: HTTPMethods.post,
      }),
      invalidatesTags: () => ['Providers'],
    }),
    updateProvider: builder.mutation<ProviderResponseDto, { id: string; body: UpdateProviderRequestDto }>({
      query: (arg) => ({
        url: routes.provider.byId(arg.id),
        body: arg.body,
        method: HTTPMethods.patch,
      }),
      invalidatesTags: () => ['Providers', 'Provider'],
    }),
    deleteProvider: builder.mutation<void, string>({
      query: (id: string) => ({
        url: routes.provider.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: () => ['Providers'],
    }),
  }),
});

export const {
  useCreateProviderMutation,
  useDeleteProviderMutation,
  useFetchProvidersQuery,
  useGetOneProviderQuery,
  useUpdateProviderMutation,
} = providersApi;
