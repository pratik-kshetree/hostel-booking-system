import React from 'react'
import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

function Contact() {
     const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm()
      
        const onSubmit = (data) => console.log(data);

        //alerting while sbmitting
        const handleclick = ()=>{
            toast.success("Message submitted!!!")
        }

    return (
        <div>
        <Navbar/>

        <div className=' flex justify-center items-center h-screen '>
            <div className='w-[400px] border-[2px] rounded-md p-6 bg-white shadow-2xl'>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center text-2xl text-pink-500 font-bold'>Contact Us</h2>
                {/* Name */}
                <div className='mt-6 space-y-2'> 
                    <label htmlFor="name" className='block'>Name</label>
                    <input type="text" placeholder='Enter your name' 
                    className='w-full px-3 py-2 border outline-none rounded-md'
                    {...register("name", { required: true })}
                    />
                    <br/>
          {errors.name && <span className='text-sm text-red-500'>This field is required</span>}

                </div>
                {/* email */}
                <div className='mt-4 space-y-2'>
                    <label htmlFor="email" className='block'>Email</label>
                    <input type="email" placeholder='Enter your email' 
                     className='w-full px-3 py-2 border outline-none rounded-md'
                      {...register("email", { required: true })}
                    />
                     <br/>
          {errors.email && <span className='text-sm text-red-500'>This field is required</span>}

                </div>
                {/* message */}
                <div className='mt-4 space-y-2'>
                    <label htmlFor="message" className='block'>Message</label>
                    <input type="textarea" placeholder='Enter your message' 
                     className='w-full px-3 py-2 border outline-none rounded-md'
                    {...register("message", { required: true })}  
                    /> 
                     <br/>
          {errors.message && <span className='text-sm text-red-500'>This field is required</span>}
   
                </div> 
                <button className='bg-pink-500 text-white px-4 py-2 rounded-md mt-6 w-full mb-4'
                onClick={handleclick}>
                    Submit</button>
            </form>
            </div>
            </div>
        </div>
    )
}

export default Contact
