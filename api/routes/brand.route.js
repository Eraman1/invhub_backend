import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletebrand, getbrands, updatebrand } from '../controllers/brand.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getbrands', getbrands)
router.delete('/deletebrand/:brandId/:userId', verifyToken, deletebrand)
router.put('/updatebrand/:brandId/:userId', verifyToken, updatebrand)


export default router;