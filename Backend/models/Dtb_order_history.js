import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus.js";

const orderHistorySchema = new mongoose.Schema({
  order_number: { type: String, required: true },
  contractor_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  orderer_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Change the type to ObjectId
  order_date: { type: Date, default: null },
  accept_cancel_flag: { type: Boolean, required: true, default: false },
  order_cancel_flag: { type: Boolean, required: true, default: false },
  refund_total: { type: Number, default: 0 },
  create_date: { type: Date, required: true },
  update_date: { type: Date, default: null },
  order_status: orderStatus,
  del_flg: { type: Number, required: true, default: 0 },
  request_refund_flag: { type: Boolean, required: true, default: false },
  refund_agree_flag: { type: Boolean, required: true, default: false },
  refund_completed_flag: { type: Boolean, required: true, default: false },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

export default OrderHistory;
