import express from "express";
const router = express.Router();
import {
  getBearerToken,
  chargeCreditCard,
  bankTransfer,
  transactionEntry,
  ExecutePayment,
  postSecure,
  tokenizeCard,
  handle3dsCallback,
  initiatePayment,
  newPaymentCheck,
  PaymentRedirect,
  bankTransferPayment,
} from "../controllers/payment.js";

// Route to get a bearer token
/**
 * @route POST /get-token
 * @desc Get a bearer token
 * @access Public
 */
router.post("/get-token", getBearerToken);

// Route to charge a credit card
/**
 * @route POST /credit/charge
 * @desc Charge a credit card
 * @access Public
 */
router.post("/credit/charge", chargeCreditCard);

// Route to handle bank transfers
/**
 * @route POST /bankTransfer
 * @desc Process a bank transfer
 * @access Public
 */
router.post("/bankTransfer", bankTransfer);

// Route to register a transaction
/**
 * @route POST /transaction/entry
 * @desc Register a transaction
 * @access Public
 */
router.post("/transaction/entry", transactionEntry);

// Route to execute a payment
/**
 * @route POST /execute/payment
 * @desc Execute a payment transaction
 * @access Public
 */
router.post("/execute/payment", ExecutePayment);

// Route to handle 3D Secure post-authentication
/**
 * @route POST /post/secure
 * @desc Handle 3D Secure post-authentication
 * @access Public
 */
router.post("/post/secure", postSecure);

router.post("/tokenizeCard", tokenizeCard);
router.post("/handle3dsCallback/:accessPass/:transactionId", handle3dsCallback);
router.post("/initiatePayment", initiatePayment);
router.post("/newpaymentcheck", newPaymentCheck);
router.post("/bank-transfer", bankTransferPayment);
router.get("/redirect", PaymentRedirect);

export default router;
