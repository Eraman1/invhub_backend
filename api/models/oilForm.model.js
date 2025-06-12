import mongoose from "mongoose";
const oilForm = new mongoose.Schema({
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
});
const OilForm = mongoose.model("OilForm", oilForm);

export default OilForm;
