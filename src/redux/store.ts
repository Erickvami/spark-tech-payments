import { configureStore } from '@reduxjs/toolkit';
import paymentsSlice from './slices/payments.slice';

export const store = configureStore({
  reducer: {
    payments: paymentsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;