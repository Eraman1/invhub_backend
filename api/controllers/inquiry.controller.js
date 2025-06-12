import Inquiry from "../models/inquiry.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.body.name) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const newInquiry = new Inquiry({
    ...req.body,
  });
  try {
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const inquiries = await Inquiry.find({
      ...(req.query.name && { name: req.query.name }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { subject: { $regex: req.query.searchTerm, $options: "i" } },
          { message: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalInquiries = await Inquiry.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      inquiries,
      totalInquiries,
      lastMonthInquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiryId = req.params.inquiryId;

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return next(errorHandler(404, "Inquiry not found"));
    }

    await Inquiry.findByIdAndDelete(inquiryId);

    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};
