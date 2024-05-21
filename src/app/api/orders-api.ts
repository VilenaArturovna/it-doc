import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import { GetManyOrdersDaoModel, GetManyOrdersRequestDto } from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';

export const ordersApi = createApi({
  baseQuery,
  reducerPath: 'ordersApi',
  endpoints: (builder) => ({
    fetchOrders: builder.query<GetManyOrdersDaoModel, GetManyOrdersRequestDto>({
      query: (params: GetManyOrdersRequestDto) => ({
        url: routes.order.root,
        params,
      }),
    }),
  }),
});
