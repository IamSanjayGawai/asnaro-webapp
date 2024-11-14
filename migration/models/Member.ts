import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    name: { type: String, required: false, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 255 },
    department: { type: String, maxlength: 50 },
    password: { type: String, required: true },
    authority: { type: Number, required: true },
    rank: { type: Number, default: 0 },
    work: { type: Number, default: 1 },
    del_flg: { type: Number, default: 0 },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
  },
  { timestamps: true }
);

memberSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
    next();
  });
  

const Member = mongoose.model('Member', memberSchema);

export default Member;
