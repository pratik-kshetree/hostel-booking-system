import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/" ;
      const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async (data) => {
      const userInfo = {
        fullname:data.fullname,
        email:data.email,
        password:data.password
      }
      await axios.post("http://localhost:4001/user/signup",userInfo)
      .then((res)=>{
        console.log(res.data);
        if(res.data){
          toast.success('Signup Successfully !');
        navigate(from,{replace : true});
        window.location.reload();
        }
        localStorage.setItem("Users",JSON.stringify(res.data.user))
      }).catch((err)=>{
        if(err.response){
          console.log(err);
        toast.error("Error: "+err.response.data.message);
        }
      })
      
    }
  return (
    
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
            {...register("fullname", { required: true })}
        />
        <br/>
          {errors.fullname && <span className='text-sm text-red-500'>This field is required</span>}

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
