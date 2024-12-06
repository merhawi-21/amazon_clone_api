import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
//import Header from './components/Header/Header'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51QOgr6G6Pel9BNSriwkFfa5LoMSlXr5TRmpwUCh8ajj2lBd5esjAT3UiaeL9lIyaOW8flRfzeoE57TdhiF1MQ0QE00HVEhpEah');


function Routering() {
  return (
    <>
     
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/payment' 
        element={
          <ProtectedRoute msg={"Create account and log in to pay"} redirect={"/payment"}>
          <Elements stripe={stripePromise}>
            <Payment/>
          </Elements>
          </ProtectedRoute>
          }
          />
        <Route path='/orders' element={
          <ProtectedRoute 
        msg={"Create account and log in to complite this    order"} redirect={"/orders"}>
            <Elements stripe={stripePromise}> <Orders/> </Elements>
        </ProtectedRoute>
          }
          />
        <Route path='/category/:categoryName' element={<Results/>}/>
        <Route path='/products/:productId' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default Routering