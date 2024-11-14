import deliveryStatus from "../utils/db/deliveryStatus";
import orderStatus from "../utils/db/orderStatus";

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer_read: { type: Boolean, default: false },
    seller_read: { type: Boolean, default: false },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quotation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
        default: null,
      },
    ],
    adminTax: {
      type: Number,
      default: 0,
    },
    adminSystemFee: {
      type: Number,
      default: 0,
    },
    refund: {
      tableData: [
        {
          content: {
            type: String,
            default: null,
          },
          amount: {
            type: Number,
            default: 0,
          },
        },
      ],
      taxDetails: {
        totalAmountExcludingTax: {
          type: Number,
          default: 0,
        },
        taxAmount: {
          type: Number,
          default: 0,
        },
        totalAmountIncludingTax: {
          type: Number,
          default: 0,
        },
        textareaValue: {
          type: String,
          default: null,
        },
        adminRefundTax: {
          type: Number,
          default: 0,
        },
        adminRefundSystemFee: {
          type: Number,
          default: 0,
        },
      },
    },
    conversation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    quotationRequested: {
      type: Boolean,
      default: false,
    },
    quotationSent: {
      type: Boolean,
      default: false,
    },
    quotationReceived: {
      type: Boolean,
      default: false,
    },
    reQuoteRequested: {
      type: Boolean,
      default: false,
    },
    reQuoteReceived: {
      type: Boolean,
      default: false,
    },
    reQuoteSent: {
      type: Boolean,
      default: false,
    },
    contractSigned: {
      type: Boolean,
      default: false,
    },
    paymentDeposit: {
      type: Boolean,
      default: false,
    },
    process_name: {
      type: String,
      default: null,
    },
    prev_transaction_status: orderStatus,
    transaction_status: orderStatus,
    delivery_status: deliveryStatus,
    ratingByBuyer: {
      type: Boolean,
      default: false,
    },
    ratingBySeller: {
      type: Boolean,
      default: false,
    },
    initiateRefund: {
      generatedBy: {
        type: String,
        enum: ["buyer", "seller", "none"],
        default: "none",
      },
      IsTrue: {
        type: Boolean,
        default: false,
      },
    },
    agreedToCancel: {
      type: Boolean,
      default: false,
    },
    refundRequested: {
      type: Boolean,
      default: false,
    },
    refundTransferred: {
      type: Boolean,
      default: false,
    },
    estimate_name: { type: String, default: null },
    dept_name: { type: String, default: null },
    subtotal: { type: Number, default: null },
    discount: { type: Number, default: null },
    charge: { type: Number, default: null },
    tax: { type: Number, default: null },
    total: { type: Number, default: null },
    payment_total: { type: Number, default: null },
    payment_id: { type: Number, default: null },
    payment_method: { type: String, default: null },
    credit_rate: { type: Number },
    deliv_id: { type: Number, default: null },
    status: { type: Number, default: null },
    issue_date: { type: Date, default: null },
    expiration_date: { type: Date, default: null },
    title: { type: String, default: null },
    estimate_number: { type: String, default: null },
    note: { type: String },
    shop_id: { type: Number },
    del_flg: { type: Number, default: 0 },
    estimate_date: { type: Date },
    order_id: { type: Number, default: null },
    costomer_name: { type: String },
    corporate_name: { type: String },
    zip01: { type: String, default: null },
    zip02: { type: String, default: null },
    pref: { type: Number, default: null },
    addr01: { type: String, default: null },
    addr02: { type: String, default: null },
    deadline: { type: Date },
    transport_costs: { type: Number, default: null },
    contract_agree: { type: Boolean, default: null },
    orderer_agree: { type: Boolean, default: null },
    estimation_pdf: { type: String, default: null },
    advance_payment_invoice: { type: String, default: null },
    order_form: { type: String, default: null },
    delivery_slip: { type: String, default: null },
    Receipt: { type: String, default: null },
    acceptance_letter: { type: String, default: null },
    process_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dtb_process",
    },
    transaction_invoice: { type: String, default: null },
    refund_transaction_invoice: { type: String, default: null },
    system_fee_invoice: { type: String, default: null },
    refund_system_fee_invoice: { type: String, default: null },
    refund_invoice: { type: String, default: null },
    contractSignedDate: {
      type: Date,
      default: null,
    },
    promisedPaymentDate: {
      type: Date,
      default: null,
    },
    tradingStartDate: {
      type: Date,
      default: null,
    },
    tradingEndDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
