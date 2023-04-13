import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  open: boolean;
  message: string | null;
  status: string | null;
}

const initialState: ErrorState = {
  open: false,
  message: null,
  status: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      const { message, open, status } = action.payload;
      state.message = message;
      state.open = open;
      state.status = status;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
