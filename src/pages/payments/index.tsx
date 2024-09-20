import React from 'react';
import './index.scss'
import { Stack } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { Payment } from '../../models/payment.model';
import PaymentList from '../../components/payment-list';

const PaymentsPage: React.FC = () => {
    const { payments } = useLoaderData() as { payments: Payment[] };

    return (<Stack className='payments page' alignItems={'center'}>
        <PaymentList payments={payments} />
    </Stack>)
}

export default PaymentsPage;