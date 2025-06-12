import Slider from '../models/slider.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a slider'));
  }
  if (!req.body.title || !req.body.subtitle || !req.body.button_link) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newSlider = new Slider({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedSlider = await newSlider.save();
    res.status(201).json(savedSlider);
  } catch (error) {
    next(error);
  }
};

export const getsliders = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const sliders = await Slider.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.sliderId && { _id: req.query.sliderId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalSliders = await Slider.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthSliders = await Slider.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
        sliders,
      totalSliders,
      lastMonthSliders,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteslider = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this slider'));
  }
  try {
    await Slider.findByIdAndDelete(req.params.sliderId);
    res.status(200).json('The slider has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updateslider = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this slider'));
  }
  try {
    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.sliderId,
      {
        $set: {
          title: req.body.title,
          button_link: req.body.button_link,
          subtitle: req.body.subtitle,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedSlider);
  } catch (error) {
    next(error);
  }
};
