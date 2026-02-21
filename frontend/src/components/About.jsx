import React from 'react'
import Navbar from './Navbar'

function About() {
  const features = [
    { icon: '✨', title: 'Simple Design', desc: 'Clean and intuitive interface' },
    { icon: '⚡', title: 'Fast Response', desc: 'Quick and responsive performance' },
    { icon: '📍', title: 'Real-time Info', desc: 'Live room availability updates' },
    { icon: '🎯', title: 'Easy Booking', desc: 'Hassle-free booking process' }
  ]

  return (
    <>
    <Navbar/>
    <div className='min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white py-20'>
      
      {/* Main Title */}
      <div className='text-center mb-16'>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          About Our Platform
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Your trusted hostel booking companion</p>
      </div>

      {/* Main Content Card */}
      <div className="mb-16 p-8 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border border-pink-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">🏠 Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Our Hostel Booking System is a simple and user-friendly platform designed to help users easily browse, view, and book available hostel rooms. We provide clear room details, pricing, and categories to make the booking process fast and hassle-free.
        </p>
      </div>

      {/* Goal Section */}
      <div className="mb-16 p-8 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">🎯 Our Goal</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          We aim to offer a smooth and transparent experience with easy navigation, real-time room availability, and a clean responsive interface that works on all devices.
        </p>
      </div>

      {/* Who Can Use Section */}
      <div className="mb-16 p-8 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">👥 Who Can Use It?</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          This system is suitable for everyone searching for hostel rooms, hostel owners managing bookings, and anyone looking for simple accommodation options.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-600 dark:text-pink-400">✨ What Makes It Better?</h2>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-slate-600 hover:shadow-lg hover:scale-105 transition-all duration-300 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  )
}

export default About
