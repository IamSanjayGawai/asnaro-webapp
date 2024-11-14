import mongoose from "mongoose";

const ReviewToBuyerSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratingToBuyer: { type: Number, required: true },
    commentToBuyer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ReviewForBuyer", ReviewToBuyerSchema);
