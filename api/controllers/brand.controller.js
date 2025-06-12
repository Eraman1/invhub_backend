import Brand from '../models/brand.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a brand'));
  }
  if (!req.body.title) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newBrand = new Brand({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    next(error);
  }
};

export const getbrands = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const brands = await Brand.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.brandId && { _id: req.query.brandId }),
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

    const totalBrands = await Brand.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthBrands = await Brand.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
        brands,
      totalBrands,
      lastMonthBrands,
    });
  } catch (error) {
    next(error);
  }
};

export const deletebrand = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this brand'));
  }
  try {
    await Brand.findByIdAndDelete(req.params.brandId);
    res.status(200).json('The brand has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatebrand = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this brand'));
  }
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.brandId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedBrand);
  } catch (error) {
    next(error);
  }
};
