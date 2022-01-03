const mongoose=require("mongoose");
const logger=require("../controllers/logController");
let doDbConnection=function(){
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("DB Connected successfully");
        logger.info("DB Connected successfully");
    }).catch((err)=>{
        console.log("DB connection failed");
        logger.error("error while db connection"+err);
        console.log(err);
    })
}

module.exports=doDbConnection;