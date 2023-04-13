import { isRejected } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import { setError } from './errorSlice';

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejected(action)) {
      const { error, status } = action.payload;

      api.dispatch(
        setError({
          open: true,
          message: error,
          status: status,
        }),
      );
    }

    return next(action);
  };

export default rtkQueryErrorLogger;
