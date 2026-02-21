import React from 'react'
//import hostel from '../../public/hostel.jpg';
function Banner() {
  return (
    <>
      <div className='max-w-screen-2xl mx-auto px-4 md:px-20 flex flex-col md:flex-row my-10 '>
        {/* left section */}
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32 ">

          <div className='space-y-12 '>
            <h1 className='text-3xl font-bold md:text-4xl'>Welcome,Your room is just a click away {" "}
              <span className='text-pink-500'>Simple. Fast. Reliable</span>
            </h1>
            
              <p className='text-gray-600 text-sm md:text-xl dark:text-white '>
                Our Hostel Booking System helps you find and book rooms easily and quickly.
                <span className='text-blue-400 block mt-3'>Search for your RoomType[Shared / Single / Double...]</span>
              </p>
            
          </div>

        </div>
        {/* right section */}
        <div className=" order-1 w-full md:w-1/2 flex justify-center">
          <img src="/images/hostel-img-nobgsec.png" className='w-full max-w-md md:max-w-full mt-10 md:mt-20 ' alt="hostelImage" />
        </div>

      </div>
    </>
  )
}

export default Banner
