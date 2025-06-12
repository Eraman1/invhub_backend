import OilForm from "../models/oilForm.model.js";
import sendEmail from "../utils/sendMail.js";
export const createOilForm = async (req, res, next) => {
  try {
    const newForm = new OilForm(req.body);
    await newForm.save();
    res.status(200).json(newForm);
    await sendEmail(req.body);
  } catch (error) {
    next(error);
  }
};

export const getOilFormData = async (req, res, next) => {
  try {
    const data = await OilForm.find({}).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteOilForm = async (req, res, next) => {
  try {
    const data = await OilForm.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Oil form deleted successfully",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
