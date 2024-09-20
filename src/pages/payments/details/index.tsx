import React, { useState } from 'react';
import './index.scss';
import { Stack, TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Payment } from '../../../models/payment.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { updatePayment } from '../../../redux/slices/payments.slice';

const PaymentPage: React.FC = () => {
    const { payment } = useLoaderData() as { payment: Payment };
    const [formData, setFormData] = useState<Payment>(payment);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(updatePayment(formData)).unwrap();
            navigate('/payments');
        } catch (err: any) {
            setError(err.message || 'Failed to update payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack className="payment-details page" alignItems="center">
            <Typography variant="h4" gutterBottom>
                Edit Payment Details
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit} className="payment-form">
                <Stack spacing={3} width="100%" maxWidth={400}>
                    <TextField
                        label="Reference"
                        name="reference"
                        value={formData.reference}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default PaymentPage;
