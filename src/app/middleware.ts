import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { setError } from './errorSlice';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { dispatch } = api;
      dispatch(setError({ open: true, message: action.error.data.message }));
    }

    return next(action);
  };
