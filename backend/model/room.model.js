import mongoose from "mongoose";

const roomSchema  = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String,
    features:Array,

    // //new to enable room count
    // totalRooms:{
    //     type:Number,
    //     required:true,
    //     default:5
    // }

},{collection:"rooms"});

const Room = mongoose.model("Room",roomSchema);

export default Room;