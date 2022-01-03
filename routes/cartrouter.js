const express=require("express");
const router=express.Router();
const {addProduct}=require("../controllers/cartcontroller");
const {IsLoggiedIn} =require("../middlewares/auth");
router.route("/addCart").post(IsLoggiedIn,addProduct);
module.exports=router;