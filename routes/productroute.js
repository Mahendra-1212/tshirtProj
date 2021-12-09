const express=require("express");
const router=express();
const {IsLoggiedIn,roleCheck}=require("../middlewares/auth");
const {addProduct,getAllProducts} =require("../controllers/productcontroller");

router.route("/addProduct").post(IsLoggiedIn,roleCheck("admin"),addProduct);
router.route("/getAllProd").get(IsLoggiedIn,getAllProducts);
module.exports=router;