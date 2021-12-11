require("dotenv").config();
const app=require("./app");
const PORT=process.env.PORT;
const dbConnection=require("./config/db");
const cloudinary=require("cloudinary").v2;
dbConnection();
<<<<<<< HEAD
console.log("db connected successfully");
=======
console.log("changes done");
>>>>>>> refs/remotes/origin/master
cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME,

});
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
