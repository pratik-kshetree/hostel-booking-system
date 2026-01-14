// import React, { useEffect, useState } from 'react'
// import { useSearchParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// function PaymentSuccess() {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const refId = searchParams.get('refId')
//         const bookingId = searchParams.get('oid')

//         if (!refId || !bookingId) {
//           toast.error("Missing payment details")
//           navigate('/room')
//           return
//         }

//         const response = await axios.post(
//           'http://localhost:4001/payment/verify',
//           {
//             bookingId,
//             esewaRefId: refId,
//             status: 'success'
//           }
//         )

//         if (response.data.success) {
//           toast.success('Payment successful! Booking confirmed.')
//           setTimeout(() => navigate('/mybookings'), 2000)
//         } else {
//           toast.error('Payment verification failed')
//           navigate('/room')
//         }
//       } catch (error) {
//         console.log(error)
//         toast.error('Payment verification error')
//         navigate('/room')
//       } finally {
//         setLoading(false)
//       }
//     }

//     verifyPayment()
//   }, [searchParams, navigate])

//   return (
//     <div className='min-h-screen flex items-center justify-center dark:bg-slate-900'>
//       <div className='text-center'>
//         {loading ? (
//           <>
//             <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4'></div>
//             <p className='text-xl dark:text-white'>Verifying payment...</p>
//           </>
//         ) : (
//           <div>
//             <h1 className='text-3xl font-bold text-green-500 mb-4'>Payment Successful!</h1>
//             <p className='text-gray-600 dark:text-gray-300'>Redirecting to your bookings...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default PaymentSuccess
