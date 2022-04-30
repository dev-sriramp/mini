const express = require('express');
const {GridFSBucket,ObjectId} = require('mongodb');
const imagePath = process.env.IMAGE_PATH;
const userPath = process.env.USER_PATH;
const PORT = process.env.PORT;
const FEPORT = process.env.FEPORT;
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const nodemailer = require('nodemailer');
const upload = require("./imageUpload");
const {checkemail} = require('./checkUser');
const crypto = require("crypto");
const {getPassword} = require("./getPassword");
const sendEmail = require("./sendEmail");
const {resendEmail} = require("./resendEmail")
const {verifyUser} = require("./verifyUser");
const {verifyPassword } = require("./verifyPassword");
const {getAllImages} = require("./getAllImages");
const {createUser} = require("./createUser")

recordRoutes.get("/getPassword", getPassword);
recordRoutes.post('/checkuser', checkemail);
recordRoutes.get("/resendemail", resendEmail);
recordRoutes.get("/user/:id/verify/:token", verifyUser)
recordRoutes.post("/verifypassword",verifyPassword);
recordRoutes.get("/getallimages",getAllImages);
recordRoutes.post("/createuser",createUser);


module.exports = recordRoutes