import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/projects.controller.js';
import { deleteProject, getProject, getProjects, updateProject } from '../controllers/projects.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
// GET routes (no auth required)
router.get('/getprojects', getProjects);
router.get('/getproject/:projectId', getProject);

// UPDATE and DELETE routes (admin auth required)
router.put('/update/:projectId', verifyToken, updateProject);
router.delete('/delete/:projectId', verifyToken, deleteProject);

export default router;