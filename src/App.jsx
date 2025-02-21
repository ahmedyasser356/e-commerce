import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
const Brands = lazy(()=>import('./components/Brands'))
import Products from './components/Products'
import NotFound from './components/NotFound'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from './components/ProductDetails'
import CheckOut from './components/CheckOut'
import Allorders from './components/Allorders'
import CategoriesPage from './components/CategoriesPage'
import Loader2 from './components/Loader2'
import WishList from './components/WishList'
 
import VerfiyCode from './components/VerfiyCode'
import ResetPassword from './components/ResetPassword'
const ForgetPassword = lazy(()=>import('./components/ForgetPassword'))

function App() {
 
  const router = createBrowserRouter(
    [{path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/check-out/:cartId',element:<CheckOut/>},
      {path:'/login',element:<Login/>},
      {path:'/reset-password',element:<ResetPassword/>},
      {path:'/productdetails/:id/:catId',element:<ProductDetails/>},
      {path:'/register',element:<Register/>},
      {path:'/allorders',element:<Allorders/>},
      {path:'/forgetpassword',element:<Suspense fallback={<Loader2></Loader2>}><ForgetPassword/></Suspense>},
      {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'/brands',element:<Suspense fallback={<Loader2></Loader2>}><Brands/></Suspense>},
      {path:'/categories',element:<CategoriesPage/>}, 
      {path:'/products',element:<Products/>},
      {path:'/verify-code/:em',element:<VerfiyCode/>},
      {path:'/wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'*',element:<NotFound/>}
    ]}]
  )

 



  return (
    <>
     
      
   
    
      <RouterProvider router={router}/>
     
        
    </>
  )
}

export default App
