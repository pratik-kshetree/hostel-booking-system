import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Roomtypes from '../components/Roomtypes'

function home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Roomtypes/>
      <Footer/>
    </div>
  )
}

export default home
