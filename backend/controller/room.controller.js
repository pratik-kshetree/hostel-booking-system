import Room from "../model/room.model.js";

export const getRoom =async(req,res)=>{
    try{
        console.log("fetching....");
        
const room = await Room.find()
res.status(200).json(room)
    }catch(error){
console.log("ERROR:",error);
res.status(500).json(error);

    }
}


// import Room from "../model/room.model.js";

// export const addRoom = async (req, res) => {
//   try {
//     const newRoom = new Room({
//       name: "Test Room",
//       price: 500,
//       category: "Deluxe",
//       image: "room.jpg",
//       title: "Awesome Room"
//     });
//     await newRoom.save();
//     console.log("Room saved:", newRoom);
//     res.status(201).json(newRoom);
//   } catch (err) {
//     console.log("Error saving room:", err);
//     res.status(500).json(err);
//   }
// };
