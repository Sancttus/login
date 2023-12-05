import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignIn from './components/pages/SignUp/Signup.jsx'

import Login from './components/pages/login/login.jsx'
import Profile from './components/pages/Profile/Profile.jsx'
import { RequireToken } from './components/Auth/Auth.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
   
    children: [         
      {
        path: "/login",
        element: <Login/>,    
      },
      {
        path: "/register",
        element: <SignIn/>,    
      },
      {
        path: "/profile",
        element: <RequireToken> <Profile/> </RequireToken> ,    
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>
)
