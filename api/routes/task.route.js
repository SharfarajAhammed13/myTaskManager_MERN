import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, gettasks } from '../controllers/task.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/gettasks', gettasks);

export default router;