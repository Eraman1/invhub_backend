import express from "express";
import {
  createOilForm,
  getOilFormData,
  deleteOilForm,
} from "../controllers/oilForm.controller.js";
const router = express.Router();

router.post("/create/oil-form", createOilForm);
router.get("/responses", getOilFormData);
router.delete("/delete/:id", deleteOilForm);

export default router;
