import React from 'react'
import Home from './home/Home';
import {Route, Routes,Navigate } from "react-router-dom"
import Rooms from './rooms/Rooms';
import Signup from './components/Signup';
import Contact from './components/Contact';
import {Toaster} from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import About from './components/About';
import MyBookings from './components/MyBookings';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
// import PaymentSuccess from './components/PaymentSuccess';
// import PaymentFailed from './components/PaymentFailed';

const App = () => {
        const [authUser,setauthUser] = useAuth()
        console.log(authUser);

  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/room" element={authUser? <Rooms/> :  <Navigate to="/signup"/> }/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/mybookings" element={<MyBookings/>}/>
    {/* <Route path="/payment-success" element={<PaymentSuccess/>}/>
    <Route path="/payment-failed" element={<PaymentFailed/>}/> */}

    {/* ADMIN */}
   <Route path="/admin/login" element={<AdminLogin />} />
   <Route path="/admin/dashboard" element={<AdminProtectedRoute> <AdminDashboard /></AdminProtectedRoute>} />


  </Routes>
  
  <Toaster />
 </div>
 {/* git add .
git commit -m "updated something"
git push */}

    </>
  )
}

export default App
