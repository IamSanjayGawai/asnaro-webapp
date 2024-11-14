import mongoose from "mongoose";


// Define the schema
const taxSchema = new mongoose.Schema({
  rate: {
    type: Number,
    default: null,
    comment: '税率'
  },
  create_date: {
    type: Date,
    required: true,
    comment: '作成日時'
  }
}, {
 
});


const Tax = mongoose.model("Tax", taxSchema);

export default Tax;