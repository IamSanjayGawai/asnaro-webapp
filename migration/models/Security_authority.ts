import mongoose from "mongoose";

const securityAuthoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const SecurityAuthority = mongoose.model(
  "SecurityAuthority",
  securityAuthoritySchema
);

module.exports = SecurityAuthority;
