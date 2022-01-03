require("dotenv").config();
const app=require("./app");
const PORT=process.env.PORT;
const dbConnection=require("./config/db");
const cloudinary=require("cloudinary").v2;
const logger=require("./controllers/logController");
dbConnection();
console.log("changes done");console.log("db connected successfully");
logger.info("server started");



cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME,

});
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
