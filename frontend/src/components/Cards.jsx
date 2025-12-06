import React from 'react'

function Cards({item}) {
  return (
    <>
    <div className='mb-4 p-3'>
      <div className="card bg-base-100 w-92 shadow-2xl hover:scale-105 duration-200
       dark:bg-slate-900 dark:text-white border">
  <figure>
    <img
      src={item.image}
      alt="AC ROOM" />
  </figure>
  <div className="card-body">
    <h2 className="card-title text-xl ">
     {item.name}
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p >{item.title}</p>
    <div className="card-actions justify-between">
      <div className="cursor-pointer border-[3px]  rounded-full py-1 px-2">
        <span className='text-xl'>Rs</span> {item.price}</div>
      <div className=" cursor-pointer border-[3px]  rounded-full py-1 px-2 hover:bg-pink-500 hover:text-white ">
        Book now</div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Cards
