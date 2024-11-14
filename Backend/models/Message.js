import mongoose from "mongoose";

const { Schema } = mongoose;

//matched with dtb_order_bulletin
const messageSchema = new Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
    comment: "受発注ID",
  },
  order_number: {
    type: String,
    required: false,
    comment: "注文番号",
  },
  contractor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
    comment: "受注者ID",
  },
  orderer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
    comment: "発注者ID",
  },
  process_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Process",
    comment: "工程ID",
  },
  process_name: {
    type: String,
    default: null,
    comment: "工程名",
  },
  note: {
    type: String,
    comment: "メッセージ",
  },
  file_path: {
    type: String,
    default: null,
    comment: "ファイルパス",
  },
  file_name: {
    type: String,
    default: null,
    comment: "ファイル名",
  },
  image_flg: {
    type: Boolean,
    default: null,
    comment: "画像フラグ",
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    comment: "送信者ID",
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    comment: "受信者ID",
  },
  is_contractor_read: {
    type: Boolean,
    required: true,
    default: false,
    comment: "受注者既読フラグ",
  },
  is_orderer_read: {
    type: Boolean,
    required: true,
    default: false,
    comment: "発注者既読フラグ",
  },
  create_date: {
    type: Date,
    required: true,
    default: Date.now,
    comment: "作成日時",
  },
  update_date: {
    type: Date,
    default: null,
    comment: "更新日時",
  },
  message_status: {
    type: Number,
    default: null,
    comment: "メッセージステータス",
  },
  del_flg: {
    type: Boolean,
    required: true,
    default: false,
    comment: "削除フラグ",
  },
  first_msg: {
    type: Boolean,
    default: false,
  },
  seller_quote: {
    type: Boolean,
    default: false,
  },
  buyer_reQuote: {
    type: Boolean,
    default: false,
  },
  buyer_Agree: {
    type: Boolean,
    default: false,
  },
  contract_sign: {
    type: Boolean,
    default: false,
  },
  paymentDeposited: {
    type: Boolean,
    default: false,
  },
  deliveryCompleted: {
    type: Boolean,
    default: false,
  },
  receiptGenerated: {
    type: Boolean,
    default: false,
  },
  deliverySentBack: {
    type: Boolean,
    default: false,
  },
  deliveryAccepted: {
    type: Boolean,
    default: false,
  },
  cancelRequest: {
    type: Boolean,
    default: false,
  },
  cancelAgree: {
    type: Boolean,
    default: false,
  },
  requestRefund: {
    type: Boolean,
    default: false,
  },
  refundTermsAgree: {
    type: Boolean,
    default: false,
  },
  cancelRefundRequest: {
    type: Boolean,
    default: false,
  },
  special_msg: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
