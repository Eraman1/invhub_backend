const mongoose = require('mongoose');

const warrantyDetailsSchema = new mongoose.Schema({
    label: { type: String, required: true }, // e.g., 'Tracks', 'Rope', 'Frame', 'Mesh', 'Components'
    durationYears: { type: Number, required: true } // e.g., 5
}, { _id: false });

const productSchema = new mongoose.Schema({
    productType: { type: String, required: true },  // e.g., 'Invisible Grills', 'Mesh Door'
    subType: { type: String },                      // e.g., 'Pleated Mesh Door', 'Aluminum Sliding Metal Door'
    warrantyDetails: [warrantyDetailsSchema]        // Array of warranties like Tracks: 10 years, etc.
}, { _id: false });

const warrantyCardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNo: { type: String, required: true },
    email: { type: String },
    invoiceNo: { type: String, required: true },
    dateOfInstallation: { type: Date, required: true },

    // Simplified address structure
    fullAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },

    // Multiple products with flexible warranty info
    products: [productSchema]
}, { timestamps: true });

module.exports = mongoose.model('WarrantyCard', warrantyCardSchema);
