// src/pages/AddPaymentPage/index.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './index.scss';
import { TextField, Stack, Button, Typography, Alert } from '@mui/material';
import { Payment } from '../../../models/payment.model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
// import { createPayment } from '../../../redux/slices/payments.slice';
import { useNavigate } from 'react-router-dom';

const AddPaymentPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Estado local para el formulario
    const [payment, setPayment] = useState<Payment>(new Payment());

    // Estado para manejar errores de validación
    const [errors, setErrors] = useState<Partial<Payment>>({});

    // Estado para manejar la retroalimentación al usuario
    const [success, setSuccess] = useState<string | null>(null);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // Obtener el estado de la creación del pago desde Redux
    const { loading, error } = useSelector((state: RootState) => state.payments);

    // Manejar cambios en los campos de entrada
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPayment((prev) => ({
            ...prev,
            [name]: name === 'quality' ? Number(value) : value,
        }));

        // Limpiar errores al modificar el campo
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Payment> = {};

        if (!payment.reference.trim()) {
            newErrors.reference = 'required.';
        }

        // if (payment.quantity <= 0) {
        //     newErrors.quantity = 'La cantidad debe ser mayor que $0.';
        // }

        if (!payment.sender?.trim()) {
            newErrors.sender = 'required';
        }

        if (!payment.receiver?.trim()) {
            newErrors.receiver = 'required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            // await dispatch(createPayment(payment)).unwrap();
            setSuccess('Pago creado exitosamente.');
            setSubmissionError(null);
            navigate('/payments');
        } catch (err: any) {
            setSubmissionError(err.message || 'Error al crear el pago.');
            setSuccess(null);
        }
    };

    return (
        <Stack className='add-payment-page' alignItems='center' spacing={2} component='form' onSubmit={handleSubmit}>
            <Typography variant='h4' component='h1'>
                Crear Nuevo Pago
            </Typography>

            {success && <Alert severity='success'>{success}</Alert>}
            {submissionError && <Alert severity='error'>{submissionError}</Alert>}
            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
                label='Referencia'
                name='reference'
                value={payment.reference}
                onChange={handleChange}
                error={!!errors.reference}
                helperText={errors.reference}
                required
                fullWidth
            />

            <TextField
                label='Cantidad ($)'
                name='quality'
                type='number'
                value={payment.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                required
                fullWidth
                inputProps={{ min: 0, step: '0.01' }}
            />

            <TextField
                label='De'
                name='sender'
                value={payment.sender}
                onChange={handleChange}
                error={!!errors.sender}
                helperText={errors.sender}
                required
                fullWidth
            />

            <TextField
                label='A'
                name='receiver'
                value={payment.receiver}
                onChange={handleChange}
                error={!!errors.receiver}
                helperText={errors.receiver}
                required
                fullWidth
            />

            <Button type='submit' variant='contained' color='primary' disabled={loading}>
                {loading ? 'creating...' : 'Create'}
            </Button>
        </Stack>
    );
};

export default AddPaymentPage;
