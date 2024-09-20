import React from 'react';
import { IconButton, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Payment } from '../../models/payment.model';
import { RemoveCircleOutline, WalletOutlined } from '@mui/icons-material';

const PaymentItem: React.FC<{ payment: Payment }> = ({ payment }) => {

    return (<ListItemButton className='payment-item' href={`/payments/${payment.id}`}>
        <ListItemIcon><WalletOutlined /></ListItemIcon>
        <ListItemText 
            primary={'reference:' + payment.reference + `$${payment.quantity}`} 
            secondary={<IconButton edge='end' aria-label='delete'><RemoveCircleOutline /></IconButton>} />
    </ListItemButton>)
}

export default PaymentItem;