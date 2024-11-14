import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  parent_id: { type: Number, default: null },
  order_temp_id: { type: String, default: null },
  customer_id: { type: Number, required: true },
  message: { type: String, default: null },
  order_name01: { type: String, default: null },
  order_name02: { type: String, default: null },
  order_kana01: { type: String, default: null },
  order_kana02: { type: String, default: null },
  order_email: { type: String, default: null },
  order_tel01: { type: String, default: null },
  order_tel02: { type: String, default: null },
  order_tel03: { type: String, default: null },
  order_fax01: { type: String, default: null },
  order_fax02: { type: String, default: null },
  order_fax03: { type: String, default: null },
  order_zip01: { type: String, default: null },
  order_zip02: { type: String, default: null },
  order_pref: { type: String, default: null },
  order_addr01: { type: String, default: null },
  order_addr02: { type: String, default: null },
  order_sex: { type: Number, default: null },
  order_birth: { type: Date, default: null },
  order_job: { type: Number, default: null },
  deliv_name01: { type: String, default: null },
  deliv_name02: { type: String, default: null },
  deliv_kana01: { type: String, default: null },
  deliv_kana02: { type: String, default: null },
  deliv_tel01: { type: String, default: null },
  deliv_tel02: { type: String, default: null },
  deliv_tel03: { type: String, default: null },
  deliv_fax01: { type: String, default: null },
  deliv_fax02: { type: String, default: null },
  deliv_fax03: { type: String, default: null },
  deliv_zip01: { type: String, default: null },
  deliv_zip02: { type: String, default: null },
  deliv_pref: { type: String, default: null },
  deliv_addr01: { type: String, default: null },
  deliv_addr02: { type: String, default: null },
  subtotal: { type: Number, default: null },
  discount: { type: Number, default: null },
  deliv_fee: { type: Number, default: null },
  charge: { type: Number, default: null },
  use_point: { type: Number, default: null },
  add_point: { type: Number, default: null },
  birth_point: { type: Number, default: 0 },
  coupon_id: { type: Number, default: null },
  coupon_label: { type: String, default: null },
  coupon_price: { type: Number, default: null },
  tax: { type: Number, default: null },
  total: { type: Number, default: null },
  payment_total: { type: Number, default: null },
  is_tax_free: { type: Number, default: null },
  payment_id: { type: Number, default: null },
  payment_method: { type: String, default: null },
  deliv_id: { type: Number, default: null },
  deliv_time_id: { type: Number, default: null },
  deliv_time: { type: String, default: null },
  deliv_no: { type: String, default: null },
  note: { type: String, default: null },
  status: { type: Number, default: null },
  create_date: { type: Date, required: true },
  loan_result: { type: String, default: null },
  credit_result: { type: String, default: null },
  credit_msg: { type: String, default: null },
  update_date: { type: Date, default: null },
  commit_date: { type: Date, default: null },
  del_flg: { type: Number, required: true, default: 0 },
  deliv_date: { type: String, default: null },
  conveni_data: { type: String, default: null },
  cell01: { type: String, default: null },
  cell02: { type: String, default: null },
  cell03: { type: String, default: null },
  memo01: { type: String, default: null },
  memo02: { type: String, default: null },
  memo03: { type: String, default: null },
  memo04: { type: String, default: null },
  memo05: { type: String, default: null },
  memo06: { type: String, default: null },
  memo07: { type: String, default: null },
  memo08: { type: String, default: null },
  memo09: { type: String, default: null },
  memo10: { type: String, default: null },
  campaign_id: { type: Number, default: null },
  credit_rate: { type: Number, required: true },
  shop_id: { type: Number, required: true },
  shipping_no: { type: String, default: null },
  store_receipt: { type: Number, required: true },
  store_id: { type: Number, required: true },
  pickup_date: { type: Date, default: null },
  udid: { type: String, default: null },
  staff_id: { type: Number, default: null },
  staff_name: { type: String, default: null },
  pos_flg: { type: Number, default: 0 },
  receipt_price_card: { type: Number, default: 0 },
  receipt_price_cash: { type: Number, default: 0 },
  receipt_price_emoney: { type: Number, default: 0 },
  receipt_price_debit: { type: Number, default: 0 },
  receipt_price_gift1: { type: Number, default: 0 },
  receipt_price_gift2: { type: Number, default: 0 },
  clientele: { type: Number, default: null },
  pos_order_id: { type: String, default: null },
  balance: { type: Number, default: null },
  deposit: { type: Number, default: null },
  discount_percent: { type: Number, default: null },
  tax_rule: { type: Number, default: 2 },
  tax_percent: { type: Number, default: 0 },
  have_point: { type: Number, default: null },
  prememory_id: { type: Number, default: null },
  prememory_string: { type: String, default: null },
  order_customer_property1: { type: String, default: null },
  order_customer_property2: { type: String, default: null },
  order_customer_property3: { type: String, default: null },
  order_customer_property4: { type: String, default: null },
  customer_delivfree_flg: { type: Number, default: 0 },
  receipt_existence_flg: { type: Number, default: 0 },
  device_info: { type: String, default: null },
  http_header: { type: String, default: null }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;