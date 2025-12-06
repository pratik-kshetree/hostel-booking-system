import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"

function Signup() {
      const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = (data) => console.log(data);
  return (
     // <>
//   <div className="flex h-screen items-center justify-center">
//     <div id="my_modal_3" className=" border-[2px] shadow-2xl rounded-md p-4">
//     <div className='modal-box'>
//     <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
//      >✕</Link>
//       {/* style={{position:"relative",left:"340px",top:"-15px"}} */}
//     </form>
//     <h3 className="font-bold text-lg">SignUp</h3>
//     {/* Name */}
//     <div className='mt-4 space-y-2'>
//     <span>Name</span><br/>
//     <input type="text"  placeholder="Enter your full name"
//     className='w-80 px-3 py-1 border rounded-md outline-none'
//     />
//     </div>
//     {/* Email */}
// <div className='mt-4 space-y-2'>
//     <span>Email</span><br/>
//     <input type="email"  placeholder="Enter your email"
//     className='w-80 px-3 py-1 border rounded-md outline-none'
//     />
//     </div>
//     {/* Password */}
//     <div className='mt-4 space-y-2'>
//     <span>Password</span><br/>
//     <input type="password"  placeholder="Enter your password"
//     className='w-80 px-3 py-1 border rounded-md outline-none'
//     />
//     </div>
//     {/* Button */}
//     <div className='flex justify-around mt-6'>
//         <button className='bg-pink-500 text-white px-3 py-1 rounded-md'>Signup</button>
//         <p>Have account?{" "}
//           <button  className=' cursor-pointer underline text-blue-500'
//            onClick={()=>document.getElementById("my_modal_3").showModal()}>Login
//           </button>
//           <Login/>
//           </p>
//     </div>
//     </div>
//     </div>
//       </div>
//     </>
 <>
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="w-[400px] border-2 shadow-2xl rounded-lg p-6 relative bg-white dark:bg-slate-800">
          
         <form onSubmit={handleSubmit(onSubmit)}  >

          {/* ✕ Close button */}
          <Link
            to="/"
            className="absolute right-4 top-4 text-gray-500 btn btn-circle dark:hover:text-gray-300 text-xl"> ✕
          </Link>

          {/* Heading */}
          <h3 className="font-bold text-2xl text-center text-pink-500">Sign Up</h3>

          {/* Name */}
          <div className="mt-6 space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
            {...register("name", { required: true })}
        />
        <br/>
          {errors.name && <span className='text-sm text-red-500'>This field is required</span>}

          </div>

          {/* Email */}
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
             {...register("email", { required: true })}
          />
          <br/>
          {errors.email && <span className='text-sm text-red-500'>This field is required</span>}

          </div>

          {/* Password */}
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
             {...register("password", { required: true })}
          />
          <br/>
          {errors.password && <span className='text-sm text-red-500'>This field is required</span>}

          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 w-full">
              Sign Up
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Have an account?{" "}
              <button
                className="underline text-blue-500 hover:text-blue-600"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>
            </p>
            <Login />
          </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
