import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Skeleton, Stack } from '@mui/material';
import { Payment } from '../../models/payment.model';
import { AppDispatch, RootState } from '../../redux/store';
import { getPayments } from '../../redux/slices/payments.slice';
import PaymentItem from '../payment-item';

const PaymentList: React.FC<{payments?: Payment[] | undefined}> = ({ payments }) => {
    const dispatch: AppDispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.payments);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!data?.length)
            dispatch(getPayments());
    }, [dispatch, data]);

    const paymentsToDisplay = useMemo(() => {
        if (!isLoaded.current) {
            isLoaded.current = true;
            return payments || [];
        }
        return data || [];
    }, [payments, data]);

    const paymentItems = useMemo(() => paymentsToDisplay?.map((payment) => <PaymentItem key={payment.id} payment={payment} />), [paymentsToDisplay]);

    if (loading)
        return <Stack direction={'column'} gap={1}>
        <Skeleton variant="rectangular" width={300} height={60} />
        <Skeleton variant="rectangular" width={300} height={60} />
        <Skeleton variant="rectangular" width={300} height={60} />
        </Stack>
    
    if (error)
        window.location.href = '/notfound';

    return (<div className='payment-list'>
        <div>
            <Button variant='contained' href='payments/add'>Add</Button>
        </div>
        <List sx={{ width: '100%', maxWidth: '80vw', bgcolor: 'Background' }} component={'nav'}>
            {paymentItems}
        </List>
    </div>)
}

export default PaymentList;