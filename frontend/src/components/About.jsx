import React from 'react'

function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Our Hostel Booking System</h1>
      <p className="mb-4">
        Our Hostel Booking System is a simple and user-friendly platform designed
        to help users easily browse, view, and book available hostel rooms. The
        system provides clear room details, pricing, and categories to make the
        booking process fast and hassle-free.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Our Goal</h2>
      <p className="mb-4">
        We aim to offer a smooth and transparent experience with easy navigation,
        real-time room availability, and a clean responsive interface that works 
        on all devices.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Who Can Use It?</h2>
      <p className="mb-4">
        This system is suitable for everyone searching for hostel rooms, hostel
        owners managing bookings, and anyone looking for simple accommodation.
      </p>

      <h2 className="text-2xl font-semibold mb-2">What Makes It Better?</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Simple and clean design</li>
        <li>Fast and responsive interface</li>
        <li>Real-time room information</li>
        <li>User-friendly booking process</li>
      </ul>
    </div>
  )
}

export default About
