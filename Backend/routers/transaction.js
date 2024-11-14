import express from "express";
import { authMiddleware } from "../auth.js";
import {
  buyerOrderList,
  createTransaction,
  fetchTransactionById,
  sellerOrderList,
  downloadPDF,
  buyerOrderListForLimitedResult,
  sellerOrderListForLimitedResult,
  updateTransactionReadStatus,
  OrdererAgreement,
  ContractSigned,
  createPayment,
  cancelOrder,
  acceptCancellation,
  getorderHistory,
  requestRefund,
  agreeRefundTerms,
  getTransactionStatusCounts,
  setDeliveryStatus,
  setRefundStatus,
} from "../controllers/transaction.js";

const router = express.Router();

router.post("/create-transaction", authMiddleware, createTransaction);
router.get(
  "/get-transaction/:transaction_id",
  authMiddleware,
  fetchTransactionById
);
router.get("/buying-list", authMiddleware, buyerOrderList);
router.get("/seller-list", authMiddleware, sellerOrderList);
router.get("/download-pdf", downloadPDF);
router.get("/buyerlistlimited", authMiddleware, buyerOrderListForLimitedResult);
router.get(
  "/sellerlistlimited",
  authMiddleware,
  sellerOrderListForLimitedResult
);
router.put(
  "/read-status/:transactionId",
  authMiddleware,
  updateTransactionReadStatus
);
router.post("/agree-buyer/:transactionId", OrdererAgreement);
router.post("/contract-signed/:transactionId", ContractSigned);
router.post("/create-payment/:transactionId", createPayment);
router.post("/set-delivery-status", authMiddleware, setDeliveryStatus);
router.post("/cancel-order", authMiddleware, cancelOrder);
router.post("/cancel-accept", authMiddleware, acceptCancellation);
router.get("/getorderhistory/:transactionId", authMiddleware, getorderHistory);
router.post("/request-refund", authMiddleware, requestRefund);
router.post("/agree-refundTerms", authMiddleware, agreeRefundTerms);
router.post("/set-refund", authMiddleware, setRefundStatus);
router.post("/status/counts", authMiddleware, getTransactionStatusCounts);

export default router;
