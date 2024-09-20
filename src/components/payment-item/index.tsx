import React from 'react';
import { IconButton, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Payment } from '../../models/payment.model';
import { RemoveCircleOutline, WalletOutlined } from '@mui/icons-material';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { removePayment } from '../../redux/slices/payments.slice';

const PaymentItem: React.FC<{ payment: Payment }> = ({ payment }) => {
    const dispatch: AppDispatch = useDispatch();

    const deleteItem = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        if (window.confirm('are you sure you want to delete this payment row?'))
            await dispatch(removePayment(id));
    }

    return (<ListItemButton className='payment-item' href={`/payments/${payment.id}`} key={payment.id} >
        <ListItemIcon><WalletOutlined /></ListItemIcon>
        <ListItemText 
            sx={{display: 'flex', alignItems: 'center', gap: 5}}
            primary={<span>{'reference:' + payment.reference + ` / mount: $${payment.quantity}`}</span>} 
            secondary={<IconButton edge='end' aria-label='delete' onClick={(e) => deleteItem(e, payment.id)}><RemoveCircleOutline /></IconButton>} />
    </ListItemButton>)
}

export default PaymentItem;