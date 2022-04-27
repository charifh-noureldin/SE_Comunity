const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    studentid: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
    },
    studentname: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
    },
    studentsurname: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
    },
    studentemail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // confirmpassword: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
