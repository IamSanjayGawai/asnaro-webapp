import mongoose from "mongoose";

const ReviewToSellerSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    process_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dtb_process",
      required: true,
    },
    ratingToProcess: { type: Number, required: true },
    ratingToSeller: { type: Number, required: true },
    commentToSeller: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ReviewForSeller", ReviewToSellerSchema);
