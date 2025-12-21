const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    password: {
      requrired: true,
      type: String,
      trim: true,
      min: 8,
      max: 100,
      select:false,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      trim: true,
      max: 100,
    },
    role: {
      type: String,
      enum: ["user", "admin", "developer"],
      default: "user",
    },
    age: {
      type: Number,
      min: [12, "Age must be above 12"],
      max: [60, "Age must be below 60"],
    },
    dob:{
        type:Date,
    }
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});
const userModel = mongoose.models.users || mongoose.model("users", userSchema);
module.exports = userModel;
