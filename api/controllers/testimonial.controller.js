import Tesimonial from "../models/testimonial.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to create a testimonial")
    );
  }
  if (!req.body.content || !req.body.title) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newTesimonial = new Tesimonial({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedTesimonial = await newTesimonial.save();
    res.status(201).json(savedTesimonial);
  } catch (error) {
    next(error);
  }
};

export const gettestimonials = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const testimonials = await Tesimonial.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.testimonialId && { _id: req.query.testimonialId }),
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

    const totalTesimonials = await Tesimonial.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthTesimonials = await Tesimonial.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      testimonials,
      totalTesimonials,
      lastMonthTesimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const deletetestimonial = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this testimonial")
    );
  }
  try {
    await Tesimonial.findByIdAndDelete(req.params.testimonialId);
    res.status(200).json("The testimonial has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatetestimonial = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to update this testimonial")
    );
  }
  try {
    const updatedTesimonial = await Tesimonial.findByIdAndUpdate(
      req.params.testimonialId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          destination: req.body.destination,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedTesimonial);
  } catch (error) {
    next(error);
  }
};
