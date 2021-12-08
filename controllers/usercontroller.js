const User=require("../models/userModel");
const Bigpromise=require("../middlewares/bigPromise");
//const User=require("../models/userModel");
const cloudinary=require("cloudinary").v2;
const {cookieSend}=require("../utils/jwtHelper");
const {sendWelcomeMail,sendResetPasswordMail}=require("../utils/mailHalper");
const crypto=require("crypto");
const jwt=require("jsonwebtoken");
console.log(Bigpromise);
exports.signUp=Bigpromise(async (req,res)=>{debugger;
    let result;
    let {email,user,password} =req.body;
    if(!email && !user && !password){
        return new Error("email, name and Password required");
    }
    if(req.files){
        let file=req.files.photo.tempFilePath;
        result=await cloudinary.uploader.upload(file,{folder:'user',crop:"scale",width:150});
    }
 let user1= await User.create({email,user,password
     ,photos:{
         id:result.public_id,
         url:result.secure_url
     }
});
   await sendWelcomeMail(user1.email);
         cookieSend(user1,res);
  /* let token= await user1.getJwt();
  console.log(token); 
  let options={
      expires:new Date(Date.now()+process.env.COOKIE_TIME),
      httpOnly:true,
  };
  user1.password=undefined;
  res.status(200).cookie("token",token,options).json({success:true,token,user1});

  //  res.status(200).send("signup data called");)*/

});


exports.login=Bigpromise(async function(req,res,next){debugger;
  
       const {email,password}=req.body;
       if(!email && !password){
           return new Error("email and password is required");
       }
   const user=await User.findOne({email}).select("+password");
   const verify=await user.isValidatePassword(password);
   if(!user || !verify){
       return res.send({
           "status":"failed",
           "msg":"invalid username and password"
       })
   }
   
   cookieSend(user,res);

})



exports.logout=Bigpromise(async function(req,res,next){
  res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
  });
  res.status(200).json({
      success:true,
      message:"logout successfully"
  })

});

exports.forgetPassword=Bigpromise(async function(req,res,next){
   const {email}=req.body;
   let user=await User.findOne({email}).select("+password");
   if(!user){
       return res.send("401").json({
           "status":"failed",
           "msg":"user is not registred,plz register yourself"
       });
   }
  const token=await user.forgotPasswoadExpire();
  
  const myurl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`;
   console.log("url is :"+myurl);
   try{
   // user.validate().then(function(res){console.log(res);console.log("validate password")});
    console.log("before save function called");
    await user.save();
    
    sendResetPasswordMail(email,myurl);
    res.status(200).json({
        "status":"success",
    });
  }catch(e){
      console.log(e);
      user.forgotPasswoadToken=undefined;
      user.forgotPasswoadExpireDate=undefined;
      await user.save({validateBeforeSave:false});
      return res.status("401").json({
        "status":"failed",
        "msg":"failed!"
    });
  }


});

exports.resetPassword=Bigpromise(async function(req,res){debugger;
const token=req.params.token;
const hashtoken=await crypto.createHash("sha256").update(token).digest("hex");
 const user=await User.findOne({hashtoken,
    forgotPasswoadExpireDate:{$gt:Date.now()}
});
/*const user=await User.findOne({hashtoken,
});*/
if(!user){
    res.status(401).json({
        "status":"failed",
        "msg":"token expired"
    })
}
const token1=await user.getJwt("10m");
res.cookie("token",token1).render('resetPassword',{cookie:token1});
});




exports.passwordReset=Bigpromise(async function(req,res){debugger;
    const {pass,cpass,token}=req.body;
    const id=jwt.verify(token,process.env.JWT_SECRET);
    if(!pass && !cpass && pass!=cpass && !token){
        return   res.status(401).json({
               "status":"failed",
               "msg":"password is incorrect"
           })
       }
 const user=await User.findById({_id:id.id});
 if(!user){
     res.json({
         "status":"failed",
         "msg":"Invalid User"
     })
 }
user.password=pass;
user.forgotPasswoadToken=undefined;
user.forgotPasswoadExpireDate=undefined;
await user.save();
cookieSend(user,res);
});

// user deshboard controller

exports.userDashBoard=Bigpromise((req,res)=>{
    res.status(200).send(req.user);
});


// password update controller

exports.updatePassword=Bigpromise(async (req,res,next)=>{
    const {oldpass,newpass}=req.body;
    const user=await User.findOne({email:req.user.email}).select("+password");
    const verify=await user.isValidatePassword(oldpass);
    if(!oldpass || !newpass || (newpass===oldpass) || !user || (!verify)){
           return res.status(401).send({
               "status":"fail",
               "msg":"invalid user"
           })
    }
    user.password=newpass;
    await user.save();
    res.status(200).send({
      "status":"success",
      "msg":"successfully updated "
    });
});

exports.updateData=Bigpromise(async (req,res)=>{debugger;

    const {email,user}=req.body;
    const user1=await User.findOne({email:req.user.email}).select("+password");
    if(!req.user|| !user1){
        res.status(401).json({
            "status":"failed"
        });
    }
    user1.email=email || user1.email;
    user1.user=user || user1.user;
    await user1.save();
    res.status(200).json({
        "status":"success",
        "mgs":"Data updated"
    })

     
});

exports.adminGetAlluser=Bigpromise(async (req,res,next)=>{debugger;
    
    const users=await User.find({role:"user"});
    if(!users){
        res.status(400).json({
          status:"failed"
        });
       
    }
    res.status(200).json({
        status:"true",
        users:users
    })

});

exports.adminUpdateUser=Bigpromise(async (req,res,next)=>{debugger;
     
    const id=req.query.id;
    const {email,name}=req.body;
    const user=await User.findOne({_id:id,role:"user"});
    if(!user){
        res.status(401).json({
            "status":"failed"
        })
    }
    user.email=email||user.email;
    //user.password=password||user.password;
    user.user=name||user.user;
    await user.save();
   res.status(200).json({
       status:"success"
   })

});

exports.adminDeleteUser=Bigpromise(async (req,res,next)=>{debugger;
    const id=req.query.id;
    const user=await User.findOne({_id:id});
    const imgres=await cloudinary.uploader.destroy(user.photos.id);
    if(!user && !imgres){
        res.status(401).json({
            status:"failed",
            msg:"Invalid user"
        })
    }
    await User.deleteOne({_id:id,role:"user"}).then(function(result){
           res.status(200).json({
               status:"success",
               result:result
           })
           }).catch(function(e){
            res.status(401).json({
                status:"failed",
                msg:"Invalid user"
            })
           })
    
})