import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  ClientResponseDto,
  CreateClientRequestDto,
  GetManyClientsDaoModel,
  GetManyClientsRequestDto,
  GetOneClientDaoModel,
  UpdateClientRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const clientsApi = createApi({
  baseQuery,
  reducerPath: 'clientsApi',
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    fetchClients: builder.query<GetManyClientsDaoModel, GetManyClientsRequestDto>({
      query: (params: GetManyClientsRequestDto) => ({
        url: routes.client.root,
        params,
      }),
      providesTags: () => ['Client'],
    }),
    getOneClient: builder.query<GetOneClientDaoModel, string>({
      query: (id: string) => ({
        url: routes.client.byId(id),
      }),
    }),
    createClient: builder.mutation<ClientResponseDto, CreateClientRequestDto>({
      query: (body: CreateClientRequestDto) => ({
        url: routes.client.root,
        method: HTTPMethods.post,
        body,
      }),
      invalidatesTags: ['Client'],
    }),
    removeClient: builder.mutation<ClientResponseDto, string>({
      query: (id: string) => ({
        url: routes.client.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: ['Client'],
    }),
    updateClient: builder.mutation<ClientResponseDto, { body: UpdateClientRequestDto; id: string }>({
      query: (arg) => ({
        url: routes.client.byId(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});
