import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Room from '../components/Room'

function Rooms() {
  return (
    <>
    <div className='dark:bg-slate-900 dark:text-white'>
      <Navbar/>
      <div className='min-h-screen' >
               <Room/>
      </div>
      <Footer/>
</div>
    </>
  )
}

export default Rooms
