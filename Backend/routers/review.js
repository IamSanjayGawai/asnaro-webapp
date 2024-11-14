import express from "express";
import { authMiddleware } from "../auth.js";

import {
  createReview,
  createReviewToBuyer,
  getBuyerReviewsForSeller,
  getSellerReviewsForBuyer,
} from "../controllers/Review.js";

const router = express.Router();

// Route to create  create-review
router.post("/create-review", authMiddleware, createReview);
router.post("/create-reviewbuyer", authMiddleware, createReviewToBuyer);
router.get("/average-rating/seller/:sellerId", getBuyerReviewsForSeller);
router.get("/average-rating/process/:buyerId", getSellerReviewsForBuyer);

export default router;
