import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import errorReducer from './errorSlice';
import rtkQueryErrorLogger from './middleware';
import { api } from './service';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    error: errorReducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
