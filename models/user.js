//USER.JS in MODELS/USER.JS
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required:false,
    },
    city: {
      type: String,
      required:false,
    },
    state: {
      type: String,
      required:false,
    },
    pin: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    dateEnrolled: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    
  }
);
const user = mongoose.model("appening", userSchema);

module.exports = user;
