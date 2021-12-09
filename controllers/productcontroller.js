const Bigpromise=require("../middlewares/bigPromise");
//const User=require("../models/userModel");
const cloudinary=require("cloudinary").v2;
const Product=require("../models/productModel");
const WhereClause=require("../utils/whereClause");

exports.addProduct=Bigpromise(async (req,res,next)=>{
    if(!req.files){
        res.status(401).json({
            status:"failed",
            msg:"files require"
        });
    }
    let imageArray=[];
    for(let i=0;i<req.files.photos.length;i++){
       let result=await cloudinary.uploader.upload(req.files.photos[i].tempFilePath,{
           folder:"products"
       });
       imageArray.push({
           id:result.public_id,
           secure_url:result.secure_url
       });
    }

    req.body.photos=imageArray;
    req.body.user=req.user.id;debugger;
    const product=await Product.create(req.body);
    res.status(200).json({
        status:"success",
        result:product
    });
});

exports.getAllProducts=Bigpromise(async (req,res,next)=>{debugger;

    let resultPerPage=6;
    const productsObj=new WhereClause(Product.find(),req.query).search().filter();
    const filterProductNumber=await productsObj.base.clone();
    productsObj.pager(resultPerPage);
    products=await productsObj.base.clone();
    res.status(200).json({
        status:"success",
        products
    })
})