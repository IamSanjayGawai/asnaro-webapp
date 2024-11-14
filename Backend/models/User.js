import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name01: { type: String },
    kana01: { type: String, required: true },
    zip01: { type: String, required: true, minlength: 3, maxlength: 5 },
    zip02: { type: String, required: true, minlength: 4, maxlength: 4 },
    pref: { type: String, required: true },
    addr01: { type: String, required: true },
    addr02: { type: String, required: true },
    email: { type: String, required: true },
    email_mobile: { type: String },
    business_id: { type: String },
    notification_email_1: { type: String },
    notification_email_2: { type: String },
    notification_email_3: { type: String },
    notification_email_4: { type: String },
    notification_email_5: { type: String },
    tele01: { type: String, required: false },
    tele02: { type: String, required: false },
    tele03: { type: String, required: false },
    fax01: String,
    fax02: String,
    fax03: String,
    profile_img: String,
    img1: String,
    img2: String,
    img3: String,
    transaction_bank: String,
    password: { type: String, required: true },
    delegate_position: String,
    delegate_name01: String,
    delegate_name02: String,
    delegate_kana01: String,
    delegate_kana02: String,
    charge_name01: String,
    charge_name02: String,
    charge_kana01: String,
    charge_kana02: String,
    corporate_url: String,
    classified01: String,
    classified02: String,
    classified03: String,
    classified04: String,
    classified05: String,
    partner_flg: Boolean,
    capital: String,
    business_content: String,
    open_time: String,
    close_time: String,
    regular_holiday: String,
    remarks: String,
    establishment_date: Date,
    employees_number: Number,
    employees_site_area: String,
    main_customer: String,
    corporate_bank_name: String,
    corporate_branch_name: String,
    corporate_deposit_type: String,
    corporate_account_number: String,
    corporate_account_holder: String,
    holiday_flg1: String,
    holiday_flg2: String,
    holiday_flg3: String,
    holiday_flg4: String,
    holiday_flg5: String,
    holiday_flg6: String,
    holiday_flg7: String,
    usage_id: String,
    corporate_name: String,
    partner_status: {
      type: String,
      enum: ["一般会員", "パートナー会員"],
      default: "一般会員",
    },
    partner_request_time: Date,
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

UserSchema.methods.generateResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", UserSchema);
