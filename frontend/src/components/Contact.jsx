import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

function Contact() {
 
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
        } = useForm()
      
        const onSubmit = (data) => {
          console.log(data);
          toast.success("Message submitted!!!")
          reset();
        };

    const inputClass = 'w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-500 outline-none rounded-lg dark:bg-slate-700 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-900 transition-all duration-300';
    
    const labelClass = 'block font-semibold text-gray-700 dark:text-gray-300 mb-2';

    return (
        <div>
        <Navbar/>

        <div className='min-h-screen flex justify-center items-center py-20 px-4 dark:bg-slate-900'>
            <div className='w-full max-w-md rounded-xl p-8 bg-white shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-3xl transition-all duration-300'>
            
              {/* Header */}
              <div className='text-center mb-8'>
                <h2 className='text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2'>
                   Contact Us
                </h2>
                <p className='text-gray-600 dark:text-gray-400'>We'd love to hear from you!</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                
                {/* Name */}
                <div> 
                    <label htmlFor="name" className={labelClass}>
                      👤 Name
                    </label>
                    <input 
                      type="text" 
                      placeholder='Enter your full name' 
                      className={inputClass}
                      {...register("name", { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <span className='text-sm text-red-500 mt-1 block'>
                        ⚠️ {errors.name.message}
                      </span>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className={labelClass}>
                       Email
                    </label>
                    <input 
                      type="email" 
                      placeholder='Enter your email' 
                      className={inputClass}
                      {...register("email", { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <span className='text-sm text-red-500 mt-1 block'>
                        ⚠️ {errors.email.message}
                      </span>
                    )}
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className={labelClass}>
                      💬 Message
                    </label>
                    <textarea 
                      placeholder='Type your message here...' 
                      rows="5"
                      className={`${inputClass} resize-none`}
                      {...register("message", { 
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters'
                        }
                      })}  
                    /> 
                    {errors.message && (
                      <span className='text-sm text-red-500 mt-1 block'>
                        ⚠️ {errors.message.message}
                      </span>
                    )}
                </div>

                {/* Submit Button */}
                <button 
                  type='submit'
                  className='w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg'
                >
                   Send Message
                </button>
              </form>

              {/* Footer Info */}
              <div className='mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 text-center text-sm text-gray-600 dark:text-gray-400'>
                <p>We typically respond within 24 hours</p>
              </div>
            </div>
        </div>
        </div>
    )
}

export default Contact
