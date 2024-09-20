import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/not-found';
import PaymentsPage from './pages/payments';
import { paymentsLoader } from './pages/payments/index.loader';
import AddPaymentPage from './pages/payments/add';
import PaymentPage from './pages/payments/details';
import { paymentLoader } from './pages/payments/details/index.loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/payments" />,
  },
  {
    path: 'payments',
    element: <PaymentsPage />,
    loader: paymentsLoader,
  },
  {
    path: 'payments/add',
    element: <AddPaymentPage />,
  },
  {
    path: 'payments/:id',
    element: <PaymentPage />,
    loader: paymentLoader,
  },
  {
    path: '/notfound',
    element: <NotFoundPage />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
