import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
    },
    thumbnail: {
        type: String, // Only applicable for videos
    },
});

const projectSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    media: {
        type: [mediaSchema],
        default: [],
    },
    completedDate: {
        type: String, // You can also use Date type if consistent formatting is possible
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Products = mongoose.model('Project', projectSchema);
export default Products
