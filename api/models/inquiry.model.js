import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
    },
    email: {
      type: String,
      require: false,
    },

    phone: {
      type: String,
      require: false,
    },
    message: {
      type: String,
      require: false,
    },
    service: {
      type: String,
      require: false,
    },
    sourcePage: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
