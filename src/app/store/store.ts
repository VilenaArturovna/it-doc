import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  clientsApi,
  deadlinesApi,
  ordersApi,
  providersApi,
  staffApi,
  tasksApi,
  vendorsApi,
  worksApi,
} from '../api';

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [deadlinesApi.reducerPath]: deadlinesApi.reducer,
  [providersApi.reducerPath]: providersApi.reducer,
  [vendorsApi.reducerPath]: vendorsApi.reducer,
  [worksApi.reducerPath]: worksApi.reducer,
});

const middlewares = [
  tasksApi.middleware,
  ordersApi.middleware,
  clientsApi.middleware,
  staffApi.middleware,
  deadlinesApi.middleware,
  providersApi.middleware,
  vendorsApi.middleware,
  worksApi.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});
