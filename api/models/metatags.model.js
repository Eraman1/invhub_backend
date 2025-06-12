import mongoose from "mongoose";

const homeMetaTagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  { timestamps: true }
);

const HomeMetaTags = mongoose.model("HomeMetaTags", homeMetaTagSchema);

const AboutMetaTagsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  { timestamps: true }
);

const AboutMetaTags = mongoose.model("AboutMetaTags", AboutMetaTagsSchema);

const ContactMetaTagsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  { timestamps: true }
);

const ContactMetaTags = mongoose.model(
  "ContactMetaTags",
  ContactMetaTagsSchema
);

const BlogMetaTagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  { timestamps: true }
);
const BlogMetaTags = mongoose.model("BlogMetatags", BlogMetaTagSchema);

const OtherMetaTagSchema = new mongoose.Schema(
  {
    header: {
      type: String,
    },
    footer: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);
const OtherMetaTags = mongoose.model("OtherMetatags", OtherMetaTagSchema);

export {
  HomeMetaTags,
  AboutMetaTags,
  ContactMetaTags,
  BlogMetaTags,
  OtherMetaTags,
};
