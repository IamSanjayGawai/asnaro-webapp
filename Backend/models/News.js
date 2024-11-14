import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    news_date: { type: Date, default: null },
    rank: { type: Number, default: null },
    news_title: { type: String, required: true },
    news_comment: { type: String },
    news_select: { type: String, required: false },
    labels: {
      type: [
        {
          type: String,
          enum: ["重要", "注文", "misc"],
        },
      ],
      default: [],
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
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    image: { type: String, required: false },
    create_date: { type: Date, required: false },
    del_flg: { type: Number, required: true, default: 0 },
    shop_id: { type: Number, default: 0 },
    delivery_flag: { type: Boolean, required: false, default: false },
    stream_date: { type: Date, default: null },
    delivery_date: { type: Date, default: null },
    news_url: { type: String },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

export default News;
