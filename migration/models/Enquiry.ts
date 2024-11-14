import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: Number },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    file_path:{type:String,required:false}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enquiry", EnquirySchema);
