import mongoose from "mongoose";

const { Schema } = mongoose;

const limitAmountSchema = new Schema(
  {
  amount: {
    type: Number,
    default: null,
    comment: '金額'
  },
  create_date: {
    type: Date,
    required: false,
    comment: '作成日時'
  }
},

);




export default mongoose.model("LimitAmount", limitAmountSchema);