import mongoose from "mongoose";

const warrantyCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfInstallation: {
      type: Date,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        subProducts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const WarrantyCard = mongoose.model("WarrantyCard", warrantyCardSchema);

export default WarrantyCard;
