import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ordersApi, tasksApi } from '../api';

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

const middlewares = [tasksApi.middleware, ordersApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

export type RootReducerType = typeof rootReducer;
export type RootStateType = ReturnType<typeof rootReducer>;

type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
