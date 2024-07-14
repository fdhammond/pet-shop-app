import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import PricesWithDifferencesOneWeek from './components/PricesWithDifferencesOneWeek.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/prices-with-differences-one-week",
        element: <PricesWithDifferencesOneWeek />,
      }
    ]
  },]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
