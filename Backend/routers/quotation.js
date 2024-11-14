import express from "express";
import { authMiddleware } from "../auth.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  createEstimateProcess,
  getMostRecentQuotation,
  getPrivateConversation,
  getQuotationsBySellerAndTransactionId,
  createAdvancePayment,
  createRefund,
} from "../controllers/quotation.js";

const router = express.Router();

// Route to create an estimate process
router.post(
  "/estimate-process/:transId",
  authMiddleware,
  createEstimateProcess
);
router.post("/adnavce-payment/:transId", createAdvancePayment);
// router.post("/estimate-process", authMiddleware, createEstimateProcess);
router.get("/get-quotation-process", authMiddleware, getMostRecentQuotation);
router.get(
  "/get-messages/:senderId/:buyerId",
  authMiddleware,
  getPrivateConversation
);
router.get("/:sellerId/:transactionId", getQuotationsBySellerAndTransactionId);
router.post("/create-refund/:transId", authMiddleware, createRefund);

export default router;
