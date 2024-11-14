import mongoose from "mongoose";

// Define the schema
const authorityMemberSchema = new mongoose.Schema({
  security_authority_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecurityAuthority", // Reference to the SecurityAuthority model
    required: true,
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member", // Reference to the Member model
    required: true,
  },
  create_datetime: {
    type: Date,
    default: Date.now,
  },
  update_datetime: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const AuthorityMember = mongoose.model(
  "AuthorityMember",
  authorityMemberSchema
);

module.exports = AuthorityMember;
LimitAmount