import mongoose, { Schema } from "mongoose";

const cityPivotSchema = new Schema(
  {
    pref_id: Number,
    state: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "city_pivot",
  }
);

export default mongoose.model("City_Pivot", cityPivotSchema);
