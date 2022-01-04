const express=require("express");
const router=express.Router();
const {addProduct,getAllCartData,deleteCartProd}=require("../controllers/cartcontroller");
const {IsLoggiedIn} =require("../middlewares/auth");
router.route("/addCart").post(IsLoggiedIn,addProduct);
router.route("/getAllCart").get(IsLoggiedIn,getAllCartData);
router.route("/deleteCart").delete(IsLoggiedIn,deleteCartProd);

module.exports=router;