import React from 'react'
//import hostel from '../../public/hostel.jpg';
function Banner() {
  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex-row md:flex my-10 '>
       {/* left section */}
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
        <div className='space-y-12 '>
        <h1 className='text-3xl font-bold '>Welcome,Your room is just a click away {" "}
            <span className='text-pink-500'>Simple. Fast. Reliable</span> 
            </h1><br/><br/>
            <span className='text-xl'>
             <h2 className='text-gray-600'>
              Our Hostel Booking System is a simple and user-friendly platform designed
        to help users easily browse, view, and book available hostel rooms. The
        system provides clear room details, pricing, and categories to make the
        booking process fast and hassle-free.
             </h2>
                </span>
                {/* email input */}
                   {/* <label
                    className="flex items-center gap-2  border border-gray-400 rounded-md px-3 py-2"
                    style={{width:"550px"}}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-500">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow outline-none bg-transparent text-gray-700" placeholder="Email" />
                    </label> */}
                    
        </div>
        {/* button */}
        {/* <button className="bg-pink-500 text-white py-3 px-5 rounded-md hover:bg-pink-600 mt-6">Book now</button> */}
        </div>
{/* right section */}
        <div className=" order-1 w-full md:w-1/2">
        <img src="/images/hostel.jpg" style={{marginTop:"60px"}}  alt="hostelImage"/>
        </div>
      </div>
    </>
  )
}

export default Banner
