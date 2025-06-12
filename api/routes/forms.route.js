import express from "express";
import {
  createHomepageForm,
  createServiceForm,
  createProductForm,
  getHomepageForms,
  getServiceForms,
  getProductForms,
  deleteHomepageForm,
  deleteServiceForm,
  deleteProductForm,
} from "../controllers/forms.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create/form", createHomepageForm);
router.post("/create/service", createServiceForm);
router.post("/create/product", createProductForm);

router.get("/get/forms", verifyToken, getHomepageForms);
router.get("/get/service", verifyToken, getServiceForms);
router.get("/get/product", verifyToken, getProductForms);

router.delete("/homepage-form/:id", verifyToken, deleteHomepageForm);
router.delete("/service-form/:id", verifyToken, deleteServiceForm);
router.delete("/product-form/:id", verifyToken, deleteProductForm);

export default router;
