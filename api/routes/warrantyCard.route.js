import express from "express";
import {
  createWarrantyCard,
  getAllWarrantyCards,
  getWarrantyCardById,
  updateWarrantyCard,
  deleteWarrantyCard,
  searchWarrantyCard,
} from "../controllers/warrantyCard.controller.js";
const router = express.Router();

router.post("/", createWarrantyCard);
router.get("/", getAllWarrantyCards);
router.get("/search", searchWarrantyCard);
router.get("/:id", getWarrantyCardById);

router.put("/:id", updateWarrantyCard);
router.delete("/:id", deleteWarrantyCard);

export default router;
