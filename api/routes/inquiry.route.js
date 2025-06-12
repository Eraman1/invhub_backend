import express from "express";
import { create, getInquiries, deleteInquiry } from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/create/inquiry", create);
router.get("/getinquiries", getInquiries);
router.delete("/deleteinquiry/:inquiryId", deleteInquiry);

export default router;
