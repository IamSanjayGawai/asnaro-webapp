import mongoose from "mongoose";

const authorityMemberSchema = new mongoose.Schema({
  security_authority_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecurityAuthority",
    required: true,
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
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

const AuthorityMember = mongoose.model(
  "AuthorityMember",
  authorityMemberSchema
);

module.exports = AuthorityMember;
LimitAmount;
