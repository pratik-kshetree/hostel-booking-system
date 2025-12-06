// const express = require('express')
// const dotenv = require('dotenv')
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
const app = express()

dotenv.config();
// const port = 3000
const PORT =process.env.PORT || 4000;
const URL= process.env.DB_URL

// app.get('/', (req, res) => {
//   res.send('Hello !')
// })

// connectiong mngodb
try{

  mongoose.connect(URL,{

  });
  console.log("connected");
  
}catch(error){
 console.log("errorrr:",error);
 
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  
})