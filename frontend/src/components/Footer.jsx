import React from 'react'

function Footer() {
  const testimonials = [
    {
      name: "Sailesh Rawal",
      text: "Amazing hostel! Great rooms, helpful staff, and perfect location. Highly recommended for students.",
      rating: 5
    },
    {
      name: "Himani Karki",
      text: "Comfortable stay with clean facilities. The admin is very responsive to any issues. Will definitely stay again!",
      rating: 5
    },
    {
      name: "Jasmine Shrestha",
      text: "Best value for money. Friendly environment and good community. 5-star experience!",
      rating: 5
    }
  ]

  return (
    <div className='p-6'>
        
        <hr/>
        
        {/* Testimonials Section */}
        <div className='bg-base-100 dark:bg-slate-800 rounded-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-center mb-8 dark:text-white'>What Our Guests Say</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {testimonials.map((review, index) => (
              <div key={index} className='bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md'>
                <div className='flex items-center mb-4'>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className='text-yellow-400'>★</span>
                  ))}
                </div>
                <p className='text-gray-700 dark:text-gray-300 mb-4'>"{review.text}"</p>
                <p className='font-semibold dark:text-white'>- {review.name}</p>
              </div>
            ))}
          </div>
        </div>

      <footer className="footer footer-center  text-base-content rounded p-10 mb-5 dark:bg-slate-900 dark:text-white">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <nav className="flex justify-center md:justify-start space-x-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Privacy Policy</a>
          </nav>

          <nav className="flex justify-center">
            <div className="flex space-x-4">
              <a aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>

          <aside className="text-center md:text-right">
            <p>Copyright © {new Date().getFullYear()} - All right reserved by Hostel Booking</p>
          </aside>
        </div>
      </footer>
    </div>
  )
}

export default Footer
