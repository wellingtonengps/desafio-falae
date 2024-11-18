import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Clients from "@/screens/Clients";
import Orders from "@/screens/Orders";
import Menu from "@/screens/Menu";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "clients",
        element: <Clients/>
    },
    {
        path: "menu",
        element: <Menu/>
    },
    {
        path: "orders",
        element: <Orders/>
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
