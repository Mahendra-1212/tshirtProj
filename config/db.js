const mongoose=require("mongoose");

let doDbConnection=function(){
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("DB Connected successfully");
    }).catch((err)=>{
        console.log("DB connection failed");
        console.log(err);
    })
}

module.exports=doDbConnection;