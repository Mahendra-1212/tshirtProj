const express=require("express");
const router=express.Router();
const {createOrder,getOrder}=require("../controllers/orderController");
const {IsLoggiedIn} =require("../middlewares/auth");
router.route("/createOrder").post(IsLoggiedIn,createOrder);
router.route("/getOrder/:id").get(IsLoggiedIn,getOrder);

module.exports=router;