import React from 'react'
import list from '../../public/list.json'
import Cards from './Cards'
import { Link } from 'react-router-dom'
function Room() {
  return (
    <>
  <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white' >
    <div className='  items-center justify-center text-center ' >
      <div className='h-28'></div>
      <h1 className='text-xl  md:text-4xl' >We are delighted to have you{" "} 
        <span className='text-pink-500'>Here !!!</span></h1>
        <p className='mt-12'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatem quis voluptatibus esse, architecto facere tenetur labore rerum
           vitae temporibus sunt quae. Repellendus nisi accusantium aspernatur inventore sequi! Ipsum, 
           tenetur!
        </p>
       <Link to="/">
        <button className=' mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700'>
          Back</button>
          </Link>
    </div>
    <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
      {
        list.map((item)=>(
         <Cards key={item.id} item={item} />
        ))
      }
    </div>
  </div>
    </>
  )
}

export default Room
