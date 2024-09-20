// build base api url for this service
const API_BASE_URL = process.env.REACT_APP_API + '/payments';

export const getAllPayments = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
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
