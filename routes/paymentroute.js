const express=require("express");
const router=express.Router();
const {captureRazPayment,getRazpayPublickey}=require("../controllers/paymentController");
const {IsLoggiedIn}=require("../middlewares/auth");
router.route("/getRazpayPublickey").get(IsLoggiedIn,getRazpayPublickey);
router.route("/captureRazPaymenty").get(IsLoggiedIn,captureRazPayment);


module.exports=router;