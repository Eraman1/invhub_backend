import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema(
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
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    button_link: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    order: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model('Slider', sliderSchema);

export default Slider;
