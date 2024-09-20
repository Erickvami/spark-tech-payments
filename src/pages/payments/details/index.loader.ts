import { getPaymentById } from "../../../services/payments.service";
import { LoaderFunction } from 'react-router-dom';

export const paymentLoader: LoaderFunction = async ({ params }) => {
    const id = Number(params.id);
    const payment = await getPaymentById(id);
    return { payment };
};