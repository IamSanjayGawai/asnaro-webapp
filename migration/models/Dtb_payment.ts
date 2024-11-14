import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentType: {
      type: String,
      enum: ["Credit", "Bank Transfer"],
      required: true,
    },
    cardNumber: { type: String },
    securityCode: { type: String },
    cardholderName: { type: String },
    amount: { type: Number, required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
