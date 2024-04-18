import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, gettasks, deletetask, updatetask} from '../controllers/task.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/gettasks', gettasks);
router.delete('/deletetask/:taskId/:userId', verifyToken, deletetask)
router.put('/updatetask/:taskid/:userId', verifyToken, updatetask);

export default router;