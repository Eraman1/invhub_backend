import {
  HomepageForm,
  ServiceForm,
  ProductForm,
} from "../models/forms.model.js";
import sendEmail from "../utils/sendMail.js";

// POST APIs
export const createHomepageForm = async (req, res, next) => {
  try {
    const newForm = new HomepageForm(req.body);
    await newForm.save();
    res.status(200).json(newForm);
    console.log(req.body);
    sendEmail(req.body);
  } catch (error) {
    next(error);
  }
};

export const createServiceForm = async (req, res, next) => {
  try {
    const newForm = new ServiceForm(req.body);
    await newForm.save();
    res.status(200).json(newForm);
    sendEmail(req.body);
  } catch (error) {
    next(error);
  }
};

export const createProductForm = async (req, res, next) => {
  try {
    const newForm = new ProductForm(req.body);
    await newForm.save();
    res.status(200).json(newForm);
    sendEmail(req.body);
  } catch (error) {
    next(error);
  }
};

// GET APIs

export const getHomepageForms = async (req, res, next) => {
  try {
    const forms = await HomepageForm.find();
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

export const getServiceForms = async (req, res, next) => {
  try {
    const forms = await ServiceForm.find();
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

export const getProductForms = async (req, res, next) => {
  try {
    const forms = await ProductForm.find();
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

// DELETE APIs
export const deleteHomepageForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedForm = await HomepageForm.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Homepage form not found" });
    }
    res.status(200).json({
      message: "Homepage form deleted successfully",
      data: deletedForm,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteServiceForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedForm = await ServiceForm.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Service form not found" });
    }
    res
      .status(200)
      .json({
        message: "Service form deleted successfully",
        data: deletedForm,
      });
  } catch (error) {
    next(error);
  }
};

export const deleteProductForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedForm = await ProductForm.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Product form not found" });
    }
    res.status(200).json({
      message: "Product form deleted successfully",
      data: deletedForm,
    });
  } catch (error) {
    next(error);
  }
};
