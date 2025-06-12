import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    status: {
      type: String,
      required: false,
    },
    order: {
      type: String,
      required: false,
    },
    count: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
