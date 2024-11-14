import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    category_id: { type: Number, required: true, unique: true },
    parent_sort_id: Number,
    category_name: { type: String, default: null },
    parent_category_id: { type: Number, required: false, default: 0 },
    mapping_id: { type: String, default: "NULL" },
    level: { type: Number, required: false },
    rank: { type: Number, default: null },
    creator_id: { type: Number, default: null },
    del_flag: { type: Number, required: false, default: 0 },
    shop_id: { type: Number, default: 0 },
    category_code: { type: Number, default: null },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);
export default mongoose.model("Category", categorySchema);
