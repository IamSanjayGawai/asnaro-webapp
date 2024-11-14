import mongoose from "mongoose";

const orderReturnSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true
  },
 /* shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },*/
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true
  },
  return_amount: { type: Number, default: 0 },
  adjust_price: { type: Number, required: true },
  tax: { type: Number, required: true },
  receipt_price_card: { type: Number, required: true, default: 0 },
  order_status: { type: Number, required: true, default: 0 },
  receipt_price_cash: { type: Number, required: true, default: 0 },
  del_flg: { type: Number, required: true, default: 0 },
  create_date: { type: Date, default: Date.now, required: true },
  update_date: { type: Date, default: Date.now, required: true }
});

const OrderReturn = mongoose.model('OrderReturn', orderReturnSchema);

export default OrderReturn;

