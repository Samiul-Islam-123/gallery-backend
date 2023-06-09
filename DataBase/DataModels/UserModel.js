const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  tempID:{String},
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  otp: {
    type: Number,
  },
  
});

const UserModel = new mongoose.model("Users", UserSchema);
module.exports = UserModel;
