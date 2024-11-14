import mongoose from "mongoose";

// Define the schema
const authorityRoleSchema = new mongoose.Schema({
  security_authority_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecurityAuthority", // Reference to the SecurityAuthority model
    required: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role", // Reference to the Role model
    required: true,
  },
  create_datetime: {
    type: Date,
    required: true,
  },
  update_datetime: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const AuthorityRole = mongoose.model("AuthorityRole", authorityRoleSchema);

module.exports = AuthorityRole;
