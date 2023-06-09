const express = require("express");
const SignupRoute = express.Router();
const UserModel = require("./../../DataBase/DataModels/UserModel");
const bcrypt = require("bcrypt");
const sendEmail = require("./../../Utils/EmailVerification");

SignupRoute.post("/signup", async (req, res) => {
  //processing Signup Request
  try {
    const data = await UserModel.findOne({
      email: req.body.email,
    });

    if (!data) {
      console.log("Securing Password...");
      const securedPassword = await SecurePassword(req.body.password);
      //creating user details

      const OTP = generateOTP();
      const CurrentUser = new UserModel({
        tempId : "",
        username: req.body.username,
        email: req.body.email,
        password: securedPassword,
        verified: false,
        otp: OTP,
      });
      //saving user data
      console.log("Saving user Data...");
      await CurrentUser.save();

      //res.send("User Details Saved");
      console.log("User Details Saved");
      console.log("Sending Email ...");

      await sendEmail(
        req.body.email,
        "Verification Email",
        "Hellow " +
          req.body.username +
          " Your one time password for signing up with our app is :  " +
          OTP
      );

      res.send("please check your email");
    } else {
      res.send("Email already exists");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const generateOTP = () => {
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const SecurePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(password, salt);
  return securedPassword;
};

module.exports = SignupRoute;
