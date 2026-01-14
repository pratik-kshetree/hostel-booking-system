import React from 'react'
import { useState } from 'react';
import {useAuth} from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast'

function Cards({item,allowBooking}) {
  // const handleclick=()=>{
  //    toast.error("Room already booked")
  // }
   const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [authUser] = useAuth();

  const totalAmount = calculateTotalAmount() ;

  function calculateTotalAmount() {
     const startdate= new Date(checkIn);
     const enddate= new Date(checkOut);

     const timeInms= enddate-startdate;
     const totalDays = timeInms/(60*60*24*1000);//*1000 bcz it gves time in millisecond ,to convert we do /1000
    const totalMonth= totalDays/30;
    const finalmth= Math.ceil(totalMonth );
    return finalmth* quantity * item.price;
    }
   
  // open model only if logged in
  const openModal=()=>{
    if(!authUser){
      toast.error("Please login first");
      return;
    }
    setShowModal(true);
  }
// after clicking confirm booking
  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select dates");
      return ;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
       toast.error("Check-out date must be after check-in");
      return ;
    }

    if(totalAmount<=0){
      toast.error("Invalid Booking Duration");
      return;
    }

    try {
   const response = await axios.post(
  "http://localhost:4001/booking/create",
  {
    userId: authUser._id,
    roomId: item._id,
    roomName: item.name,
    price: item.price,
    quantity: Number(quantity),
    checkInDate: checkIn,
    checkOutDate: checkOut,
    totalAmount,
    category: item.category
  }
);

if (response.data.success) {
  toast.success("Room booked successfully!");
  setShowModal(false);
} else {
      toast.error(response.data.message || "Booking failed");
    }
    }catch (error) {
  console.error(error.message);
  toast.error("Booking failed. Please try again.");
}
  }    
//   const redirectToEsewa = (esewaConfig, bookingId) => {
//   const esewaEndpoint = "https://uat.esewa.com.np/epay/main"; // TEST

//   const form = document.createElement("form");
//   form.method = "POST";
//   form.action = esewaEndpoint;

//   const fields = {
//     amt: esewaConfig.amount,          // base amount
//     psc: 0,                            // service charge
//     pdc: 0,                            // delivery charge
//     txAmt: 0,                          // tax amount
//     tAmt: esewaConfig.amount,          // total amount (IMPORTANT)
//     pid: String(bookingId),                    // product ID
//     scd: "EPAYTEST",     // merchant code
//     su: esewaConfig.successUrl,        // success URL
//     fu: esewaConfig.failureUrl         // failure URL
//   };

//   Object.entries(fields).forEach(([key, value]) => {
//     const input = document.createElement("input");
//     input.type = "hidden";
//     input.name = key;
//     input.value = value;
//     form.appendChild(input);
//   });

//   document.body.appendChild(form);
//   form.submit();
// };


  return (
    <>
    <div className='mb-4 p-3'>
      <div className="card bg-base-100 w-full shadow-2xl hover:scale-105 duration-200
       dark:bg-slate-900 dark:text-white border">
  <figure>
    <img
      src={item.image}
      alt="AC ROOM" 
      className='w-full h-56 object-cover'
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-xl ">
     {item.name}
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p >{item.title}</p>
    <div className="card-actions justify-between">
      <div className="cursor-pointer border-[3px]  rounded-full py-1 px-2 hover:bg-black hover:text-white">
        <span className='text-l'>Rs</span> {item.price} monthly</div>
        {allowBooking &&(
      <div 
      className=" cursor-pointer border-[3px]  rounded-full py-1 px-2 hover:bg-pink-500 hover:text-white "
      // onClick={handleclick}
      onClick={openModal}
      >
        Book now
        </div>
        )}
    </div>
  </div>
</div>
    </div>

    {/* BOOKING MODal */}
  {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[9999] ">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-96 z-[10000] border-white border-2">
           <h2 className="text-xl font-bold mb-3 flex justify-center text-pink-600 dark:text-pink-400">Book Room</h2>

            <p className="mb-2">
              <strong className=' px-2 border-[3px] rounded-full'>Room</strong>:{item.name}
            </p>

            <p className="mb-2 ">
              <strong className='px-2 border-[3px] rounded-full'>Price</strong>: Rs {item.price}(monthly)
            </p>
{/* QUANTITY */}
            <label className="inline-block mb-2 px-2 border rounded-md bg-pink-600 text-white">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full mb-3 p-2 border rounded-full dark:text-white dark:bg-slate-600"
            />
{/* CHECK IN */}
            <label className="inline-block mb-2 px-2 border rounded-md bg-pink-600 text-white ">Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full mb-3 p-2 border rounded-full dark:bg-slate-600 dark:text-white"
            />
{/* CHECK OUT */}
            <label className="inline-block mb-2 px-2 border rounded-md bg-pink-600 text-white">Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full mb-3 p-2 border rounded-full dark:bg-slate-600 dark:text-white"
            />
{/* TOTAL AMOUNT */}
            <p className="mb-3 font-semibold">
              Total Amount: Rs {totalAmount}
            </p>
{/* cancel button */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border rounded bg-red-600 text-white"
              >
                Cancel
              </button>
{/* confirn button */}
              <button
                onClick={handleBooking}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
    )}
    </>
  )
}

export default Cards
