import mongoose from "mongoose";
import orderStatus from "../utils/db/orderStatus.js";

const QuotationSchema = new mongoose.Schema(
  {
    quotation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
      },
    ],
    quotationStatus: orderStatus,
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", QuotationSchema);
