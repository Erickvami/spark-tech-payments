import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Payment } from '../../models/payment.model';
import { getAllPayments } from '../../services/payments.service';

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

// export const createPayment = createAsyncThunk<Payment, Payment>(
//     'payments/createPayment',
//     async (payment, { rejectWithValue }) => {
//       try {
//         const newPayment = await addPayment(payment);
//         return null;
//       } catch (error: any) {
//         return rejectWithValue(error.message || 'Failed to create payment');
//       }
//     }
//   );

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
        state.error = action.error.message || 'Failed to fetch weather data';
      })
    //   .addCase(createPayment.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
    //     state.loading = false;
    //     // Asegúrate de que state.data no sea null
    //     if (state.data) {
    //       state.data.push(action.payload);
    //     } else {
    //       state.data = [action.payload];
    //     }
    //   })
    //   .addCase(createPayment.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export const { setItems } = paymentsSlice.actions;

export default paymentsSlice;