const express = require("express");
const LoginRouter = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./../../DataBase/DataModels/UserModel");
const jwt = require("jsonwebtoken");

LoginRouter.post("/login", async (req, res) => {
  try {
    //finding user data...
    console.log("finding user data...");
    const UserData = await UserModel.findOne({
      email: req.body.email,
    }); //checking for correct Email
    if (UserData != null) {
      //checking for correct password
      if (await bcrypt.compare(req.body.password, UserData.password)) {
        //checking for verification of user
        if (UserData.verified) {
          console.log("generating token...");
          const token = jwt.sign(
            {
              id: UserData._id,
              email: UserData.email,
              username: UserData.username,
            },
            process.env.SECRET,
            {
              expiresIn: "720hr",
            }
          );

          console.log("logged in");
          res.json({
            message: "logged in successfully",
            token: token,
          });
        } else {
          console.log("User not verified");
          res.send("User not verified");
        }
      } else {
        console.log("Wrong password");
        res.send("Wrong Password");
      }
    } else {
      console.log("Email ID not Found");
      res.send("Email ID not Found");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = LoginRouter;
