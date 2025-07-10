import Project from '../models/projects.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {

    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, "You are not allow to create the Project"));
    // }
    console.log(req.body);
    console.log(res.body);
    if (!req.body.serviceName || !req.body.location || !req.body.clientName || !req.body.description) {
        return next(errorHandler(400, "Please provied all required field"))
    }

    const newProject = new Project({
        ...req.body,
    });
    try {
        const savedProject = await newProject.save();
        return res.status(201).json(savedProject);
    } catch (error) {
        next(error);
    }

};

// GET all projects (no token verification required)
export const getProjects = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const projects = await Project.find({
            ...(req.query.serviceName && { serviceName: req.query.serviceName }),
            ...(req.query.location && { location: req.query.location }),
            ...(req.query.clientName && { clientName: req.query.clientName }),
            ...(req.query.searchTerm && {
                $or: [
                    { serviceName: { $regex: req.query.searchTerm, $options: 'i' } },
                    { location: { $regex: req.query.searchTerm, $options: 'i' } },
                    { clientName: { $regex: req.query.searchTerm, $options: 'i' } },
                    { description: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalProjects = await Project.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthProjects = await Project.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            projects,
            totalProjects,
            lastMonthProjects,
        });
    } catch (error) {
        next(error);
    }
};

// GET single project by ID (no token verification required)
export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return next(errorHandler(404, "Project not found"));
        }
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

// UPDATE project (admin only)
export const updateProject = async (req, res, next) => {

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projectId,
            {
                $set: {
                    serviceName: req.body.serviceName,
                    location: req.body.location,
                    clientName: req.body.clientName,
                    description: req.body.description,
                    media: req.body.media,
                    completedDate: req.body.completedDate,
                }
            },
            { new: true }
        );

        if (!updatedProject) {
            return next(errorHandler(404, "Project not found"));
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

// DELETE project (admin only)
export const deleteProject = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to delete this project"));
    }

    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);

        if (!deletedProject) {
            return next(errorHandler(404, "Project not found"));
        }

        res.status(200).json({ message: "Project has been deleted successfully" });
    } catch (error) {
        next(error);
    }
};