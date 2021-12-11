const express=require("express");
const router=express();
const {IsLoggiedIn,roleCheck}=require("../middlewares/auth");
const {addProduct,
       getAllProducts,
       getOneProduct,
       updateProduct,
       deleteProduct,
       updateReviews} =require("../controllers/productcontroller");

router.route("/addProduct").post(IsLoggiedIn,roleCheck("admin"),addProduct);
router.route("/getAllProd").get(IsLoggiedIn,getAllProducts);
router.route("/getOneProduct/:id").get(IsLoggiedIn,roleCheck("admin"),getOneProduct);
router.route("/updateProduct/:id").put(IsLoggiedIn,roleCheck("admin"),updateProduct);
router.route("/deleteProduct/:id").delete(IsLoggiedIn,roleCheck("admin"),deleteProduct);
router.route("/updateReview").put(IsLoggiedIn,updateReviews);

module.exports=router;