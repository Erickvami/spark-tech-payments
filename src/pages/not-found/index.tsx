import { Card, CardActionArea, CardContent, CardHeader, Stack } from '@mui/material';
import React from 'react';
import './index.scss';
import { Home } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {

    return (<Stack className='not-found page' justifyContent={'center'} alignItems={'center'}>
        <Card>
            <CardHeader 
                title={'Payments not found'}
            />
            <CardContent>
                Payment(s) not available
            </CardContent>
            <CardActionArea>
               <a href='/' style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}><Home /> Go Home</a>
            </CardActionArea>
        </Card>
    </Stack>)
}

export default NotFoundPage;