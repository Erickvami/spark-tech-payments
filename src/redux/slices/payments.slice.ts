import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Payment } from '../../models/payment.model';
import { addPayment, deletePayment, getAllPayments, putPayment } from '../../services/payments.service';

interface PaymentsState {
  data: Payment[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  data: null,
  loading: false,
  error: null,
};

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async () => {
    return await getAllPayments();
  }
);

export const createPayment = createAsyncThunk<Payment, Payment>(
    'payments/createPayment',
    async (payment, { rejectWithValue }) => {
      try {
        const newPayment = await addPayment(payment);
        return newPayment;
      } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to create payment');
      }
    }
  );


export const removePayment = createAsyncThunk<void, number>(
  'payments/removePayment',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deletePayment(id);
      await dispatch(getPayments());
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete payment');
    }
  }
);

export const updatePayment = createAsyncThunk<Payment, Payment>(
  'payments/updatePayment',
  async (payment, { rejectWithValue }) => {
    try {
      const updatedPayment = await putPayment(payment);
      return updatedPayment;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update payment');
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Payment[] | null>) {
        state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payments data';
      });
      builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        if (state.data) {
          state.data.push(action.payload);
        } else {
          state.data = [action.payload];
        }
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(removePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete payment';
      });
  },
});

export const { setItems } = paymentsSlice.actions;

export default paymentsSlice;