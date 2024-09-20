import { Payment } from "../models/payment.model";

// build base api url for this service
const API_BASE_URL = process.env.REACT_APP_API + '/payments';

export const getAllPayments = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    const payments = await response.json();
    console.log(payments)
    return payments;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};


export const getPaymentById = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            window.location.href = '/notfound';
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPaymentByReference = async (reference: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/ref/${reference}`);
        if (!response.ok) {
            window.location.href = '/notfound';
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const addPayment = async (payment: Payment) => {
  console.log(JSON.stringify(payment))
  try {
      const response = await fetch(`${API_BASE_URL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
      });

      return response.json();
      // return await response.json();
  } catch (error: any) {
      console.error('Error on createPayment:', error);
      throw error;
  }
};

export const deletePayment = async (id: number) => {
  try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
      });

      return await response.json()
  } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
  }
};

export const putPayment = async (payment: Payment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${payment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });

    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.text()}`);

    return response.json();
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
};