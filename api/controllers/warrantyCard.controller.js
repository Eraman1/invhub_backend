import Products from "../models/product.model.js";
import WarrantyCard from "../models/warrantyCard.model.js";

// CREATE
export const createWarrantyCard = async (req, res) => {
  try {
    const { products, ...otherFields } = req.body;

    const cleanedProducts = [];

    for (const product of products) {
      const dbProduct = await Products.findById(product._id);
      if (!dbProduct) continue;

      const validSubProductIds = (product.subProducts || []).filter((subId) =>
        dbProduct.subProducts.some((sub) => sub._id.toString() === subId)
      );

      cleanedProducts.push({
        _id: product._id,
        subProducts: validSubProductIds,
      });
    }

    const newCard = await WarrantyCard.create({
      ...otherFields,
      products: cleanedProducts,
    });

    res.status(201).json(newCard);
  } catch (err) {
    console.error("WarrantyCard creation error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getAllWarrantyCards = async (req, res) => {
  try {
    const { startIndex = 0, search = "" } = req.query;
    const limit = 10;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { invoiceNo: { $regex: search, $options: "i" } },
      ],
    };

    const cards = await WarrantyCard.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(startIndex))
      .limit(limit);

    const enrichedCards = await Promise.all(
      cards.map(async (card) => {
        const fullProducts = await Promise.all(
          card.products.map(async (p) => {
            const product = await Products.findById(p._id).lean();
            if (!product) return null;

            const selectedSubProducts =
              product.subProducts?.filter((sub) =>
                p.subProducts?.includes(String(sub._id))
              ) || [];

            return {
              _id: product._id,
              productName: product.productName,
              image: product.image,
              warrantyDetails: product.warrantyDetails,
              subProducts: selectedSubProducts,
            };
          })
        );

        return {
          ...card.toObject(),
          products: fullProducts.filter(Boolean),
        };
      })
    );

    const total = await WarrantyCard.countDocuments(query);

    res.status(200).json({ cards: enrichedCards, total });
  } catch (err) {
    console.error("Error fetching warranty cards:", err);
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getWarrantyCardById = async (req, res) => {
  try {
    const record = await WarrantyCard.findById(req.params.id).populate(
      "products"
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
export const updateWarrantyCard = async (req, res) => {
  try {
    const updated = await WarrantyCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteWarrantyCard = async (req, res) => {
  try {
    await WarrantyCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Warranty card deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET WARRANTY CARD BY INVOICE NO OR MOBILE NO
export const searchWarrantyCard = async (req, res) => {
  try {
    const { invoiceNo, contactNo } = req.query;

    if (!invoiceNo && !contactNo) {
      return res
        .status(400)
        .json({ message: "Please provide invoiceNo or contactNo" });
    }

    // const query = invoiceNo
    //   ? { invoiceNo: { $regex: invoiceNo, $options: "i" } }
    //   : { contactNo: { $regex: contactNo, $options: "i" } };
    // Strict match: no partial, no case-insensitive regex
    const query = invoiceNo ? { invoiceNo } : { contactNo };

    const card = await WarrantyCard.findOne(query);

    if (!card)
      return res.status(404).json({ message: "Warranty card not found" });

    // Fetch full product/subProduct details
    const enrichedProducts = await Promise.all(
      card.products.map(async (p) => {
        const product = await Products.findById(p._id).lean();
        if (!product) return null;

        const selectedSubProducts =
          product.subProducts?.filter((sub) =>
            p.subProducts?.includes(String(sub._id))
          ) || [];

        return {
          _id: product._id,
          productName: product.productName,
          image: product.image,
          warrantyDetails: product.warrantyDetails,
          subProducts: selectedSubProducts,
        };
      })
    );

    const finalCard = {
      ...card.toObject(),
      products: enrichedProducts.filter(Boolean),
    };

    res.status(200).json(finalCard);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
