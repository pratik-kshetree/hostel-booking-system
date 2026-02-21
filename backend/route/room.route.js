import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRoom, getRoomById, addRoom, updateRoom, deleteRoom } from '../controller/room.controller.js'
import { adminAuth } from '../middleware/adminAuth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'room-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

const router = express.Router();

// public
router.get('/', getRoom);
router.get('/:id', getRoomById);

// admin protected CRUD
router.post('/', adminAuth, upload.single('image'), addRoom);
router.put('/:id', adminAuth, upload.single('image'), updateRoom);
router.delete('/:id', adminAuth, deleteRoom);

export default router;