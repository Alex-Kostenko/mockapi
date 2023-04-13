import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  open: boolean;
  message: string | null;
}

const initialState: ErrorState = {
  open: false,
  message: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      state = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
