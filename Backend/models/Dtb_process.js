import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const dtbProcessSchema = new mongoose.Schema(
  {
    img1: String,
    img2: String,
    img3: String,
    process_counter: Number,
    name: String,
    maker_name: String,
    years_type: String,
    pref: String,
    mun: String,
    capacity: String,
    equipment_size: String,
    process_explanation: String,
    delivery_date: String,
    cost_price: String,
    hourly_price: mongoose.Types.Decimal128,
    unit_price: String,
    parent_category: String,
    child_category: String,
    remarks_column: String,
    status: String,
    tags: [String],
    search_word: String,
    name_halfWidth: String,
    name_fullWidth: String,
    customer_id: Number,
    image_path: String,
    review: Number,
    create_date: Date,
    update_date: Date,
    maker_name_scripts: [
      {
        script: String,
        text: String,
      },
    ],
    name_scripts: [
      {
        script: String,
        text: String,
      },
    ],
    scripts_convert: [
      {
        script: String,
        text: String,
      },
    ],
    hiragana: String,
    katakana: String,
    halfwidth_katakana: String,
    fullwidth_kat: String,
    case_sens: String,
    case_sens_maker_name: String,
    case_sens_process_explanation: String,
    normalized_name: String,
    normalized_maker_name: String,
    reviews: [{ rating: Number, reviewId: mongoose.Schema.Types.ObjectId }],
    totalRatingSum: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    del_flg: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

dtbProcessSchema.plugin(aggregatePaginate);

export default mongoose.model("Dtb_process", dtbProcessSchema);
