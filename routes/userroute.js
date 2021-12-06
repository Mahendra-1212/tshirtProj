const express=require("express");
const router=express.Router();
const  {signUp,login,logout,forgetPassword,resetPassword,passwordReset}=require("../controllers/usercontroller");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgetPassword").post(forgetPassword);
router.route("/password/reset/:token").get(resetPassword);
router.route("/password/PasswordReset").post(passwordReset);
module.exports=router;

