import mongoose from "mongoose";
const homeForm = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  service: {
    type: String,
  },
  message: {
    type: String,
  },
  sourcePage: {
    type: String,
  },
});

const HomepageForm = mongoose.model("HomepageForm", homeForm);

const serviceForm = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  service: {
    type: String,
  },
  message: {
    type: String,
  },
  sourcePage: {
    type: String,
  },
});
const ServiceForm = mongoose.model("ServiceForm", serviceForm);

const productsForm = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
  sourcePage: {
    type: String,
  },
});

const ProductForm = mongoose.model("ProductForm", productsForm);

export { HomepageForm, ServiceForm, ProductForm };
