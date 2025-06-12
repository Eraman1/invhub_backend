import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteslider, getsliders, updateslider } from '../controllers/slider.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getsliders', getsliders)
router.delete('/deleteslider/:sliderId/:userId', verifyToken, deleteslider)
router.put('/updateslider/:sliderId/:userId', verifyToken, updateslider)


export default router; 