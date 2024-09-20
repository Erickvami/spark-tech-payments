import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/not-found';
// import { movieLoader } from './pages/movie/loader';
import PaymentsPage from './pages/payments';
import { paymentsLoader } from './pages/payments/index.loader';
import AddPaymentPage from './pages/payments/add';

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

//   {
//     path: 'payments/:id',
//     element: <MoviePage />,
//     loader: movieLoader,
//   },
  {
    path: '/notfound',
    element: <NotFoundPage />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
