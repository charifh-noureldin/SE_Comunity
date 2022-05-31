const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student Name is required"],
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Student Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    confirmpassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        // this only for CREATE and SAVE operations (not for UPDATE)
        validator: function (el) {
          return el === this.password;
        },
        message: "Password and Confirm Password must be same",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
