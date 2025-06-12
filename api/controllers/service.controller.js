import Service from "../models/service.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  console.log("hree");
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a service"));
  }
  if (!req.body.title) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newService = new Service({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    next(error);
  }
};

export const getservices = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const services = await Service.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.serviceId && { _id: req.query.serviceId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalServices = await Service.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthServices = await Service.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      services,
      totalServices,
      lastMonthServices,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteservice = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this service")
    );
  }
  try {
    await Service.findByIdAndDelete(req.params.serviceId);
    res.status(200).json("The service has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateservice = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to update this service")
    );
  }
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.serviceId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          short_description: req.body.short_description,
          category: req.body.category,
          image: req.body.image,
          metaTitle: req.body.metaTitle,
          metaDescription: req.body.metaDescription,
          metaKeywords: req.body.metaKeywords,
          otherMeta: req.body.otherMeta,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};
