import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notificationImage: {
      type: String,
      default: null,
    },
    notificationTitle: { type: String, required: true },
    labels: {
      type: [
        {
          type: String,
          enum: ["重要", "注文", "misc"],
        },
      ],
      default: [],
    },
    description: { type: String },
    del_flag: { type: Number, default: 0 },
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
    readBy: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        read: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
