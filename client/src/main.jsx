import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout1 from './layout/Layout1.jsx';
import Layout2 from "./layout/Layout2.jsx"
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductList from './pages/ProductList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout1 />,
    children: [
      { index: true, element: <Home /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: '/product',
    element: <Layout2 />,
    children: [
      { path: ':category', element: <ProductList /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);