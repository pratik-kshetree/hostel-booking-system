import React, { useEffect, useState } from 'react'
//import list from "../../public/list.json"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios'

function Roomtypes() {

  // const [list,setlist]=useState([]);

  // useEffect(()=>{
  //      fetch("/list.json")
  //      .then((response)=>response.json())
  //      .then((data)=>{
  //       const filterdata=data.filter((item)=>item.category==='AC');
  //       setlist(filterdata);
  //      })
  //      .catch((error)=>console.error("error loading:json",error));
  // },[])

   const [room,setRoom] = useState([])
  useEffect(()=>{
    const getRoom = async()=>{
      try{
         const res =  await axios.get("http://localhost:4001/room");
         console.log(res.data);
         setRoom(res.data.filter((item)=>item.category==='AC'))
      }catch(error){
               console.log(error);
               
      }
    }
    getRoom();
  },[])
   var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 p-4 ">
      <h1 className='font-bold text-xl pb-1'>Premium Rooms</h1>
       <p>Get your comfort!! 
      </p>
    <div >
       <Slider {...settings}>
       {room.map((item)=>(
        <Cards item={item} key={item.id}/>
       ))}
      </Slider>
    </div>
    </div>
    </>
  )
}

export default Roomtypes
