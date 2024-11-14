import mongoose from "mongoose";

const defaultUsageSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      default: null,
      comment: "使用率",
    },
    usage_name: {
      type: String,
      comment: "システム使用料名",
    },
    default: {
      type: Boolean,
      default: false,
    },
    create_date: {
      type: Date,
      comment: "作成日時",
    },
    del_flg: {
      type: Number,
      default: 0,
      comment: "削除フラグ",
    },
  },
  {
    timestamps: true,
    collection: "dtb_default_usage",
  }
);

const DefaultUsage = mongoose.model("DefaultUsage", defaultUsageSchema);

export default DefaultUsage;
