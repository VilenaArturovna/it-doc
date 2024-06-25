import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../store/base-query';
import {
  CreateOrderRequestDto,
  GetInfoAboutOrderForClientDaoModel,
  GetInfoAboutOrderForClientRequestDto,
  GetManyOrdersDaoModel,
  GetManyOrdersRequestDto,
  GetOneOrderDaoModel,
  OrderHasBeenApprovedRequestDto,
  OrderHasBeenDiagnosedRequestDto,
  OrderReadyRequestDto,
  OrderResponseDto,
  UpdateOrderRequestDto,
} from '../../shared/types/api/generated';
import { routes } from '../../shared/routes';
import { HTTPMethods } from '../../shared/types';

export const ordersApi = createApi({
  baseQuery,
  reducerPath: 'ordersApi',
  tagTypes: ['Orders', 'Order'],
  endpoints: (builder) => ({
    fetchOrders: builder.query<GetManyOrdersDaoModel, GetManyOrdersRequestDto>({
      query: (params: GetManyOrdersRequestDto) => ({
        url: routes.order.root,
        params,
      }),
      providesTags: ['Orders'],
    }),
    getOneOrder: builder.query<GetOneOrderDaoModel, string>({
      query: (id: string) => ({
        url: routes.order.byId(id),
      }),
      providesTags: ['Order'],
    }),
    getInfoAboutOrder: builder.query<
      GetInfoAboutOrderForClientDaoModel,
      GetInfoAboutOrderForClientRequestDto
    >({
      query: (params) => ({
        url: routes.order.infoForClient,
        params,
      }),
    }),
    createOrder: builder.mutation<OrderResponseDto, CreateOrderRequestDto>({
      query: (body) => ({
        url: routes.order.root,
        method: HTTPMethods.post,
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    completeOrder: builder.mutation<OrderResponseDto, string>({
      query: (id) => ({
        url: routes.order.complete(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    orderReady: builder.mutation<OrderResponseDto, { body: OrderReadyRequestDto; id: string }>({
      query: (arg) => ({
        url: routes.order.ready(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    approvedOrder: builder.mutation<OrderResponseDto, { id: string; body: OrderHasBeenApprovedRequestDto }>({
      query: (arg) => ({
        url: routes.order.approved(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    updateOrder: builder.mutation<OrderResponseDto, { body: UpdateOrderRequestDto; id: string }>({
      query: (arg) => ({
        url: routes.order.byId(arg.id),
        method: HTTPMethods.patch,
        body: arg.body,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    takeToWorkOrder: builder.mutation<OrderResponseDto, string>({
      query: (id) => ({
        url: routes.order.takeToWork(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    diagnosedOrder: builder.mutation<OrderResponseDto, { id: string; body: OrderHasBeenDiagnosedRequestDto }>(
      {
        query: (arg) => ({
          url: routes.order.diagnosed(arg.id),
          method: HTTPMethods.patch,
          body: arg.body,
        }),
        invalidatesTags: ['Orders', 'Order'],
      },
    ),
    startDiagnosticForOrder: builder.mutation<OrderResponseDto, string>({
      query: (id) => ({
        url: routes.order.startDiagnostic(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    putOrderInQueueForDiagnostic: builder.mutation<OrderResponseDto, string>({
      query: (id: string) => ({
        url: routes.order.putInQueueForDiagnostics(id),
        method: HTTPMethods.patch,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    getCertificateOfTechnicalCondition: builder.query<Blob, string>({
      query: (id: string) => ({
        url: routes.order.certificateOfTechnicalCondition(id),
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useApprovedOrderMutation,
  useCompleteOrderMutation,
  useCreateOrderMutation,
  useDiagnosedOrderMutation,
  useFetchOrdersQuery,
  useGetOneOrderQuery,
  useOrderReadyMutation,
  useUpdateOrderMutation,
  useTakeToWorkOrderMutation,
  usePutOrderInQueueForDiagnosticMutation,
  useStartDiagnosticForOrderMutation,
  useLazyGetCertificateOfTechnicalConditionQuery,
  useLazyGetInfoAboutOrderQuery,
} = ordersApi;
