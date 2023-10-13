const {userModel} = require("../models");
require("dotenv").config();
const tokenSecret = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { sendOtpMail } = require("./mail");

const tokenHeaderKey = process.env.HEADER_KEY;

function markProfileValidation({otp,token,res}){


  


}

function logOut(req, res) {
  res.clearCookie(tokenHeaderKey);
  res.send("cleared. user logged out");
}

async function checkAndAddUser({ fullName, email, password, phone, res }) {
  // already registered or not
  const existence = await userModel.findOne({ email: email }).exec();

  if (existence) {
    res.status(409).send("Email is already in use");
  } else {
    const user = new userModel({ fullName, email, password, phone });
    const saved = await user.save();
    if (saved) {
      // res.status(201).send({
      //   user: saved,
      //   message: "An OTP has been sent. Please verify your email",
      // });
      // sendMail({ email: saved.email, res, actType: "verification" });
      sendOtpMail({user:saved, res,})
    } else {
      res.status(400).send("Error creating account");
    }
  }
}

async function checkAndLoginUser({ email, password, res }) {
  res.status(400).send("Wrong Credentials");
  // already registered or not
  const existence = await userModel.findOne({ email, password });

  if (existence) {
    // email and associated password matched
    if (existence.isVerified) {
      console.log(tokenHeaderKey, "  <<<<    ", existence.id, tokenSecret);
      res
        .status(200)
        .cookie(tokenHeaderKey, jwt.sign(existence.id, tokenSecret), {
          expires: new Date(Date.now() + 36000),
          overwrite: true,
          httpOnly: true,
        })
        .send({
          email,
          message: "You are logged in",
        });
    }
    // email found but no match for password
    else {
      res.status(401).send("Account Not Verified Yet");
    }
  }
  // no user with that email in system
  else {
    res.status(400).send("Wrong Credentials");
  }
}

async function checkForpassReset({ token, res }) {
  var bytes = CryptoJS.AES.decrypt(token, tokenSecret);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  console.log(decryptedData); // [{id: 1}, {id: 2}]
  console.log(">>  ", token);
  res.send("Hello");
}

async function updateNewPassword({ password, res }) {}

module.exports = {
  checkAndAddUser,
  checkAndLoginUser,
  logOut,
  checkForpassReset,
  updateNewPassword,
};
