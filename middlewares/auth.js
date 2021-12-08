const User=require("../models/userModel");
const Bigpromise=require("../middlewares/bigPromise");
const jwt=require("jsonwebtoken");
exports.IsLoggiedIn=Bigpromise(async (req,res,next)=>{debugger;
      const token=(req.header("Authorization")==undefined?undefined:req.header("Authorization").replace("Bearer ",""))||req.cookies.token;
     const decoder=await jwt.verify(token,process.env.JWT_SECRET);
     if(!decoder){
       return  res.status(401).send({
             "status":"failed",
             "msg":"Not a valid user"
             });
     }
     const user=await User.findById({_id:decoder.id});
     if(!user){
       res.status(401).json({
         status:"failed",
         msg:"user is not exist,plz register ur self"
       })
          }

     req.user=user;
   next();
});


exports.roleCheck=function(role){

  return function(req,res,next){
     const role1=req.user.role;
     if(role1!=role){
      return res.status(401).json({
        status:"failed",
        msg:"invalid user "
      })
     }
     next();
  }
}
