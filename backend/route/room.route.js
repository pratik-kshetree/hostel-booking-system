import express from 'express';
import { getRoom } from '../controller/room.controller.js'

const router = express.Router();

router.get("/",getRoom);
 export default router;