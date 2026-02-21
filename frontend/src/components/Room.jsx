import React from 'react'
//import list from '../../public/list.json'
import Cards from './Cards'
import { Link, useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

function Room() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [room,setRoom] = useState([])
  const [filteredRoom, setFilteredRoom] = useState([])
  
  useEffect(()=>{
    const getRoom = async()=>{
      try{
         const res =  await axios.get("http://localhost:4001/room");
         console.log(res.data);
         setRoom(res.data)
      }catch(error){
               console.log(error);
               
      }
    }
    getRoom();

    // connect to socket.io to receive live updates
    const socket = io('http://localhost:4001');
    socket.on('roomsUpdated', (rooms) => {
      if (Array.isArray(rooms)) setRoom(rooms);
      else getRoom();
    });

    return () => {
      socket.disconnect();
    }
  },[])
  
  useEffect(()=>{
    if (searchQuery) {
      const filtered = room.filter(r => 
        (r.name && r.name.toLowerCase().includes(searchQuery)) ||
        (r.title && r.title.toLowerCase().includes(searchQuery)) ||
        (r.category && r.category.toLowerCase().includes(searchQuery))
      );
      setFilteredRoom(filtered);
    } else {
      setFilteredRoom(room);
    }
  }, [room, searchQuery])
  return (
    <>
  <div className=' max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white' >
    <div className='  items-center justify-center text-center ' >
      <div className='h-28'></div>
      <h1 className='text-xl  md:text-4xl' >We are delighted to have you{" "} 
        <span className='text-pink-500'>Here !!!</span></h1>
        <p className='mt-12'>
          Please select a room you want!
        </p>
       <Link to="/">
        <button className=' mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700'>
          Back</button>
          </Link>
    </div>
    {searchQuery && <p className='mt-6 text-lg text-gray-600 dark:text-gray-400'>Search results for: <span className='font-bold text-pink-500'>'{searchQuery}'</span> ({filteredRoom.length} found)</p>}
    
    <div className='mt-12 grid grid-cols-1 md:grid-cols-3'>
      {
        filteredRoom.length > 0 ? (
          filteredRoom.map((item)=>(
           <Cards key={item._id} item={item} allowBooking={true}/>
          ))
        ) : (
          <div className='col-span-3 text-center text-gray-500 py-8'>
            {searchQuery ? 'No rooms found matching your search.' : ''}
          </div>
        )
      }
    </div>
  </div>
    </>
  )
}

export default Room
