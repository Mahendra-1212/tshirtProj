
exports.cookieSend= async function(user1,res){

    let token= await user1.getJwt();
    console.log(token); 
    let options={
        expires:new Date(Date.now()+process.env.COOKIE_TIME),
        httpOnly:true,
    };
    user1.password=undefined;
    res.status(200).cookie("token",token,options).json({success:true,token,user1});

    
}