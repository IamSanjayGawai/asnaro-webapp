import mongoose from "mongoose";

// Define the schema for dtb_mailtemplate
const MailTemplateSchema = new mongoose.Schema({
  template: {
    type: String,
    enum: ["registration", "resetPassword", "contact", "message"],
    required: true,
  },
  subject: {
    type: String,
    default: null,
  },
  header: {
    type: String,
    default: null,
  },
  footer: {
    type: String,
    default: null,
    comment: "テンプレートフッター",
  },
  creator_id: {
    type: Number,
    default: 2,
  },
  create_date: {
    type: Date,
    comment: "作成日時",
  },
  update_date: {
    type: Date,
    default: null,
    comment: "更新日時",
  },
  shop_id: {
    type: Number,
    default: 0,
  },
  detail: {
    type: String,
    default: null,
    comment: "本文",
  },
});

// Create a model from the schema

export default mongoose.model("MailTemplate", MailTemplateSchema);
