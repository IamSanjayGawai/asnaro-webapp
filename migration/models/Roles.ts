import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
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
  del_flg: {
    type: Number,
    default: 0,
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
