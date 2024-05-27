import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  CreateVendorRequestDto,
  GetManyVendorsDaoModel,
  GetManyVendorsRequestDto,
  GetOneVendorDaoModel,
  VendorResponseDto,
  UpdateVendorRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const vendorsApi = createApi({
  baseQuery,
  reducerPath: 'vendorsApi',
  tagTypes: ['Vendors', 'Vendor'],
  endpoints: (builder) => ({
    fetchVendors: builder.query<GetManyVendorsDaoModel, GetManyVendorsRequestDto>({
      query: (params: GetManyVendorsRequestDto) => ({
        url: routes.vendor.root,
        params,
      }),
      providesTags: () => ['Vendors'],
    }),
    getOneVendor: builder.query<GetOneVendorDaoModel, string>({
      query: (id: string) => ({
        url: routes.vendor.byId(id),
      }),
      providesTags: () => ['Vendor'],
    }),
    createVendor: builder.mutation<VendorResponseDto, CreateVendorRequestDto>({
      query: (params: CreateVendorRequestDto) => ({
        url: routes.vendor.root,
        body: params,
        method: HTTPMethods.post,
      }),
      invalidatesTags: () => ['Vendors'],
    }),
    updateVendor: builder.mutation<VendorResponseDto, { id: string; body: UpdateVendorRequestDto }>({
      query: (arg) => ({
        url: routes.vendor.byId(arg.id),
        body: arg.body,
        method: HTTPMethods.patch,
      }),
      invalidatesTags: () => ['Vendors', 'Vendor'],
    }),
    deleteVendor: builder.mutation<void, string>({
      query: (id: string) => ({
        url: routes.vendor.byId(id),
        method: HTTPMethods.delete,
      }),
      invalidatesTags: () => ['Vendors'],
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useFetchVendorsQuery,
  useGetOneVendorQuery,
  useUpdateVendorMutation,
} = vendorsApi;
