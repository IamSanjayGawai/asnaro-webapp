import mongoose from "mongoose";

const dtbAvailabilitySchema = new mongoose.Schema(
  {
    process_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dtb_process",
    },
    availability: [
      {
        date: Date,
        selectedStatus: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("DtbAvailability", dtbAvailabilitySchema);
