import React from 'react'
import Home from './home/Home';
import {Route, Routes } from "react-router-dom"
import Rooms from './rooms/Rooms';
import Signup from './components/Signup';
import Contact from './components/Contact';
const App = () => {
       
  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/room" element={<Rooms/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/contact" element={<Contact/>}/>
  </Routes>
 </div>
 {/* git add .
git commit -m "updated something"
git push */}

    </>
  )
}

export default App
