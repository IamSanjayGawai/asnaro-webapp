import mongoose from "mongoose";

const { Schema } = mongoose;

const keywordSchema = new Schema(
  {
    tagword_id: Number,
    tagword_name: String,
    count: Number,
    rank: Number,
    delivery_flg: Number,
    del_flg: Number
  },
  { timestamps: true }
);

export default mongoose.model("Keyword", keywordSchema);
