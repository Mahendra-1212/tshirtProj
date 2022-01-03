const logger=require("../controllers/logController");
exports.cookieSend= async function(user1,res){
  logger.info("cookieSend method called");
    let token= await user1.getJwt();
  logger.info(`jwt token generated : ${token}`);
    console.log(token); 
    let options={
        expires:new Date(Date.now()+process.env.COOKIE_TIME),
        httpOnly:true,
    };
    user1.password=undefined;
    logger.info(`data sending to user :${user1}`);
    res.status(200).cookie("token",token,options).json({success:true,token,user1});

    
}