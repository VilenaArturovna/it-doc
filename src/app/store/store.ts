import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { clientsApi, deadlinesApi, ordersApi, providersApi, staffApi, tasksApi } from '../api';

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [deadlinesApi.reducerPath]: deadlinesApi.reducer,
  [providersApi.reducerPath]: providersApi.reducer,
});

const middlewares = [
  tasksApi.middleware,
  ordersApi.middleware,
  clientsApi.middleware,
  staffApi.middleware,
  deadlinesApi.middleware,
  providersApi.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});
