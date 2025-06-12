import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletetestimonial, gettestimonials, updatetestimonial } from '../controllers/testimonial.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/gettestimonials', gettestimonials)
router.delete('/deletetestimonial/:testimonialId/:userId', verifyToken, deletetestimonial)
router.put('/updatetestimonial/:testimonialId/:userId', verifyToken, updatetestimonial)


export default router;