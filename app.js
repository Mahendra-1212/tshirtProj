const express=require("express");
const app=express();
const morgan = require('morgan');
const cookieparser=require("cookie-parser");
const fileupload=require("express-fileupload");
require("dotenv").config();
const homeroute=require("./routes/homeroute");
const userroute=require("./routes/userroute");
const productroute=require("./routes/productroute");
//above all is for imported files
app.use(morgan("tiny")); 
//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//middleware for fileupload
app.use(fileupload({useTempFiles:true,tempFileDir:"/temp/"}));
//middleware for cookie-parser
app.use(cookieparser());
app.set("view engine","ejs");

//swagger documentation depedancy
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
//const { application } = require("express");
const swaggerDocument = YAML.load('./swagger.yaml');
//middleware for api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 



//below code is for home route
app.use("/api/v1",homeroute);
app.use("/api/v1",userroute);
app.use("/api/v1",productroute);
app.get("/dummy",function(req,res){
    res.render("signup");
});

//exporting app
module.exports=app;

