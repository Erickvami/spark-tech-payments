import { getAllPayments } from "../../services/payments.service";

export const paymentsLoader = async () => {
  const payments = await getAllPayments();
  return { payments };
};