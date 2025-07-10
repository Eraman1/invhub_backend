import mongoose from "mongoose";

const warrantyDetailSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    durationYears: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const subProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    warrantyDetails: {
      type: [warrantyDetailSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },

    warrantyDetails: {
      type: [warrantyDetailSchema],
      default: [],
    },

    subProducts: {
      type: [subProductSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);
export default Products;
