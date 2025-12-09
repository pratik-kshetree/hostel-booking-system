// const express = require('express')
// const dotenv = require('dotenv')
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import roomRoute from "./route/room.route.js"

import userRoute from "./route/user.route.js"

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());

// const port = 3000
const PORT =process.env.PORT || 4000;
const URL= process.env.DB_URL

app.get('/', (req, res) => {
  res.send('Hello !')
})

// connecting mngodb
async function connectDB(){
try{

  await mongoose.connect(URL);
  console.log("connected mongodb");
  
} catch(error){
 console.log("errorrr:",error);
 process.exit(1);
}
}
connectDB(); //call the async function

//defining routes
app.use("/room",roomRoute)
app.use("/user",userRoute)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  
})