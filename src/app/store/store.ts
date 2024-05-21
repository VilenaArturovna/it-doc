import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { clientsApi, ordersApi, tasksApi } from '../api';

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
});

const middlewares = [tasksApi.middleware, ordersApi.middleware, clientsApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});
