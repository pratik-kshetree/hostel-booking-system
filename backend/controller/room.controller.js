// import Room from "../model/room.model.js";
//  export const getRoom = async (req, res) => { 
//     try { console.log("fetching....");
//          const room = await Room.find() res.status(200).json(room) 
//         }
//           catch (error) {
//              console.log("ERROR:", error); res.status(500).json(error);
//              } }

import Room from "../model/room.model.js";

// GET /room          -> public
export const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error("ERROR fetching rooms:", error);
        res.status(500).json({ message: error.message });
    }
};

// GET /room/:id      -> public
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// POST /room         -> admin
export const addRoom = async (req, res) => {
    try {
        const { name, price, category, title, features } = req.body;

        if (!name || price == null) {
            return res.status(400).json({ message: "'name' and 'price' are required" });
        }

        // Get image from file upload or from body (if URL provided)
        const image = req.file ? `/uploads/${req.file.filename}` : (req.body.image || "");

        const featuresArray = Array.isArray(features)
            ? features
            : typeof features === "string"
                ? features.split(",").map((f) => f.trim()).filter(Boolean)
                : [];

        const newRoom = new Room({ name, price, category, image, title, features: featuresArray });
        await newRoom.save();
        // Emit rooms update to connected clients
        try {
            const io = req.app && req.app.get('io');
            if (io) {
                const rooms = await Room.find();
                io.emit('roomsUpdated', rooms);
            }
        } catch (e) {
            console.error('Error emitting roomsUpdated', e);
        }

        res.status(201).json(newRoom);
    } catch (error) {
        console.error("ERROR adding room:", error);
        res.status(500).json({ message: error.message });
    }
};

// PUT /room/:id      -> admin
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // If new file uploaded, use it; otherwise keep existing image
        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;
        } else if (updates.image === undefined || updates.image === "") {
            // Keep existing image if no new file and no URL provided
            delete updates.image;
        }

        if (updates.features && typeof updates.features === "string") {
            updates.features = updates.features.split(",").map((f) => f.trim()).filter(Boolean);
        }

        const updated = await Room.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) return res.status(404).json({ message: "Room not found" });
        // Emit rooms update
        try {
            const io = req.app && req.app.get('io');
            if (io) {
                const rooms = await Room.find();
                io.emit('roomsUpdated', rooms);
            }
        } catch (e) {
            console.error('Error emitting roomsUpdated', e);
        }

        res.json(updated);
    } catch (error) {
        console.error("ERROR updating room:", error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE /room/:id   -> admin
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Room.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Room not found" });
        // Emit rooms update
        try {
            const io = req.app && req.app.get('io');
            if (io) {
                const rooms = await Room.find();
                io.emit('roomsUpdated', rooms);
            }
        } catch (e) {
            console.error('Error emitting roomsUpdated', e);
        }

        res.json({ message: "Room deleted" });
    } catch (error) {
        console.error("ERROR deleting room:", error);
        res.status(500).json({ message: error.message });
    }
};
