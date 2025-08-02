import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout1 from './layout/layout1.jsx';
import Layout2 from './layout/Layout2.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Login from './admin/Login.jsx';
import Layout3 from './layout/Layout3.jsx';
import Upload from './admin/Upload.jsx';
import Dashboard from './admin/Dashboard.jsx';
import ShowProduct from './admin/ShowProduct.jsx';
import StockProductList from './admin/StockProductList.jsx';
import TrendingList from './admin/TrendingList.jsx';
import EditProductPage from './admin/EditProductPage.jsx';
import Gallery from './pages/Gallery.jsx';
import GalleryUpload from './admin/GalleryUpload.jsx';
import { ProtectRoute, AuthenticatedUserRoute } from "./utils/userAuthenticated.jsx"
import FixImgUpload from './admin/FixImgUpload.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout1 />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <ContactUs /> },
      { path: "gallery", element: <Gallery /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: '/product',
    element: <Layout2 />,
    children: [
      { path: ':category', element: <ProductList /> },
      { path: ':category/:id', element: <ProductDetails /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AuthenticatedUserRoute>
        <Login />
      </AuthenticatedUserRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <Layout3 />
      </ProtectRoute>
    ),
    children: [
      {
        index: true, element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        )
      },
      {
        path: "upload", element: (
          <ProtectRoute>
            <Upload />
          </ProtectRoute>
        )
      },
      {
        path: "all-products", element: (
          <ProtectRoute>
            <ShowProduct />
          </ProtectRoute>
        )
      },
      {
        path: "trending", element: (
          <ProtectRoute>
            <TrendingList />
          </ProtectRoute>
        )
      },
      {
        path: "stock-products", element: (
          <ProtectRoute>
            <StockProductList />
          </ProtectRoute>
        )
      },
      {
        path: "edit-product/:id", element: (
          <ProtectRoute>
            <EditProductPage />
          </ProtectRoute>
        )
      },
      {
        path: "upload-gallery", element: (
          <ProtectRoute>
            <GalleryUpload />
          </ProtectRoute>
        )
      },
      {
        path: "image-upload", element: (
          <ProtectRoute>
            <FixImgUpload />
          </ProtectRoute>
        )
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);