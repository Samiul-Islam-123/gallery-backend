const express = require("express");
const router = express.Router();
const UserModel = require("../../DataBase/DataModels/UserModel");
router.post("/verify", async (req, res) => {
  if (req.body.otp == null) {
    res.send("OTP should be provided");
  } else {
    const Data = await UserModel.findOne({
      otp: req.body.otp,
    });
    if (!Data) {
      res.send("OTP not verified");
    } else {
      //console.log("OTP verified");
      await UserModel.findOneAndUpdate(
        { otp: req.body.otp },
        {
          verified: true,
          otp: "",
        }
      );

      res.send("OTP Verified");
    }
  }
});

module.exports = router;
