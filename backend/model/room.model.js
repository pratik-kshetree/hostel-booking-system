import mongoose from "mongoose";

const roomSchema  = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    image:String,
    title:String,
    features:Array

},{collection:"rooms"});

const Room = mongoose.model("Room",roomSchema);

export default Room;