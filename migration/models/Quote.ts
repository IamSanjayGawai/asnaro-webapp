import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    drawing_number: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    del_flg: {
      type: Number,
      required: true,
      default: 0,
    },
    ng_check: {
      type: Number,
      required: true,
      default: 0,
    },
    note: {
      type: String,
    },
    totalamountExcludingTax: {
      type: String,
      required: true,
      default: 0,
    },
    taxAmount: {
      type: String,
      required: true,
      default: 0,
    },
    totalAmountIncludingTax: {
      type: String,
      required: true,
      default: 0,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quote", QuoteSchema);
