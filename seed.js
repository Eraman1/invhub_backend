import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./api/models/product.model.js";

dotenv.config();

const seedProducts = [
  {
    productName: "Invisible Grill",
    warrantyDetails: [
      { label: "Tracks", durationYears: 10 },
      { label: "Rope", durationYears: 5 },
    ],
    subProducts: [],
  },
  {
    productName: "Mesh Door",
    warrantyDetails: [],
    subProducts: [
      {
        name: "Pleated Mesh Door",
        warrantyDetails: [
          { label: "Aluminum Frame", durationYears: 5 },
          { label: "Mesh", durationYears: 1 },
        ],
      },
      {
        name: "Aluminum Sliding Metal Door",
        warrantyDetails: [
          { label: "Frame", durationYears: 5 },
          { label: "Aluminum Mesh & Components", durationYears: 2 },
        ],
      },
    ],
  },
];

async function runSeeder() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); // Clear existing
    const inserted = await Product.insertMany(seedProducts);

    console.log("✅ Products seeded successfully:");
    inserted.forEach((p) => {
      console.log(`- ${p.productName}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

runSeeder();
