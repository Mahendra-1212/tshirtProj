const express=require("express");
const router=express.Router();
const  {signUp,
    login,
    logout,
    forgetPassword,
    resetPassword,
    passwordReset,
    userDashBoard,
    updatePassword,
    updateData,adminGetAlluser,adminUpdateUser,
    adminDeleteUser}=require("../controllers/usercontroller");
const {IsLoggiedIn,roleCheck} =require("../middlewares/auth");
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgetPassword").post(forgetPassword);
router.route("/password/reset/:token").get(resetPassword);
router.route("/password/PasswordReset").post(passwordReset);
router.route("/userDashBoard").get(IsLoggiedIn,userDashBoard);
router.route("/updatePassword").post(IsLoggiedIn,updatePassword);
router.route("/updateData").post(IsLoggiedIn,updateData);
router.route("/admin").get(IsLoggiedIn,roleCheck('admin'),adminGetAlluser).put(adminUpdateUser).delete(adminDeleteUser);
module.exports=router;

