import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  WarehouseItemResponseDto,
  CreateWarehouseItemRequestDto,
  GetManyWarehouseItemsDaoModel,
  GetManyWarehouseItemsRequestDto,
  GetOneWarehouseItemDaoModel,
  UpdateWarehouseItemRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const warehouseApi = createApi({
  baseQuery,
  reducerPath: 'warehousesApi',
  tagTypes: ['WarehouseItems', 'WarehouseItem'],
  endpoints: (builder) => ({
    fetchWarehouseItems: builder.query<GetManyWarehouseItemsDaoModel, GetManyWarehouseItemsRequestDto>({
      query: (params: GetManyWarehouseItemsRequestDto) => ({
        url: routes.warehouseItem.root,
        params,
      }),
      providesTags: () => ['WarehouseItems'],
    }),
    getOneWarehouseItem: builder.query<GetOneWarehouseItemDaoModel, string>({
      query: (id: string) => ({
        url: routes.warehouseItem.byId(id),
      }),
      providesTags: () => ['WarehouseItem'],
    }),
    createWarehouseItem: builder.mutation<WarehouseItemResponseDto, CreateWarehouseItemRequestDto>({
      query: (body: CreateWarehouseItemRequestDto) => ({
        url: routes.warehouseItem.root,
        method: HTTPMethods.post,
        body,
      }),
      invalidatesTags: ['WarehouseItems'],
    }),
    removeWarehouseItem: builder.mutation<WarehouseItemResponseDto, string>({
      query: (id: string) => ({
        url: routes.warehouseItem.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: ['WarehouseItems', 'WarehouseItem'],
    }),
    updateWarehouseItem: builder.mutation<
      WarehouseItemResponseDto,
      { body: UpdateWarehouseItemRequestDto; id: string }
    >({
      query: (arg) => ({
        url: routes.warehouseItem.byId(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['WarehouseItems', 'WarehouseItem'],
    }),
  }),
});

export const {
  useCreateWarehouseItemMutation,
  useFetchWarehouseItemsQuery,
  useGetOneWarehouseItemQuery,
  useRemoveWarehouseItemMutation,
  useUpdateWarehouseItemMutation,
} = warehouseApi;
