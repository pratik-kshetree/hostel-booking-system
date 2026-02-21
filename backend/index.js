// const express = require('express')
// const dotenv = require('dotenv')
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import roomRoute from "./route/room.route.js"

import userRoute from "./route/user.route.js"

import bookingRoute from "./route/booking.route.js";

import adminRoute from './route/admin.route.js';
// import paymentRoute from './route/payment.route.js';


import http from 'http'
import { Server as IOServer } from 'socket.io'

const app = express()

app.use(cors());
dotenv.config();
app.use(express.json());

// Serve uploaded images
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// const port = 3000
const PORT = process.env.PORT || 4000;
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
app.use("/booking", bookingRoute);
app.use("/admin",adminRoute);
// app.use("/payment", paymentRoute);

// create http server and attach socket.io
const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { origin: '*' }
});

// expose io through app so controllers can emit
app.set('io', io);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// io.on('connection', (socket) => {
//   console.log('client connected', socket.id);
//   socket.on('disconnect', () => console.log('client disconnected', socket.id));
// });